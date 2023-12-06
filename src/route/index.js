// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

class Track {
  static #list = []

  constructor(name,author,image) {
    this.id = Math.floor(1000+Math.random()*9000)
    this.name = name
    this.author = author
    this.image = image
  }
  static create (name,author,image) {
    const newTrack = new Track(name,author,image)
    this.#list.push(newTrack)
    return newTrack
  }
  static getList() {
    return this.#list.reverse()
  }
}
Track.create(
  'MONATIK (Remix)',
  'Iнь Ян',
  '/svg/Monatik.svg'
)
Track.create(
  'Beila Conmigo (Remix)',
  'Selena Gomez i Rauw Alejando',
  '/svg/bailaConmigo.svg'
)
Track.create(
  'Shameless',
  'Camila Cabello',
  '/svg/Shameless.svg'
)
Track.create(
  'DAKITTI',
  'BAD BUNNY i JHAY',
  '/svg/dakiti.svg'
)
Track.create(
  '11 PM',
  'Maluma',
  '/svg/11 Pm.svg'
)
Track.create(
  'iнша любов',
  'Enleo',
  '/svg/иншалюбоф.svg'
)

console.log(Track.getList())

class Playlist {
  static #list = []

  constructor(name) {
    this.id = Math.floor(1000+Math.random()*9000)
    this.name = name
    this.tracks = []
  }

  static create(name) {
    const newPlaylist = new Playlist(name)
    this.#list.push(newPlaylist)
    return newPlaylist
  }

  static getList() {
    return this.#list.reverse()
  }
  static makeMix(playlist) {
    const allTracks = Track.getList()

    let rendomTracks = allTracks
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

    playlist.tracks.push(...rendomTracks)
  }

  static getById(id) {
    return (
      Playlist.#list.find(
        (playlist) => playlist.id === id,
      ) || null
    )
  }

  deleteTrackById(trackId) {
    this.tracks = this.tracks.filter (
      (track) => track.id !== trackId,
    )
  }

static findListByValue(value) {
  return this.#list.filter((playlist) => 
    playlist.name
      .toLowerCase()
      .includes(value.toLowerCase()),
  )
}

}

Playlist.makeMix(Playlist.create('Test'))
Playlist.makeMix(Playlist.create('Test2'))
Playlist.makeMix(Playlist.create('Test3'))

router.get('/soptify-choose', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('soptify-choose', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'soptify-choose',

    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

router.get('/soptify-create', function(req, res) {
  const isMix = !!req.query.isMix

  console.log(isMix)
  res.render('soptify-create', {
    style: 'soptify-create',

    data: {
      isMix,
    },
  })
})
router.post('/soptify-create', function(req, res) {
  const isMix = !!req.query.isMix
  
  const name = req.body.name

  if(!name) {
    return res.render('spotify-create', {
      style: 'spotify-create',

      data: {
        message: "Помилка",
        info: "Введiть назву плйлиста",
        link: isMix 
        ? '/spotify-create?isMix=true'
        : '/spotify-create'
      },
    })
  }

  const playlist = Playlist.create(name)
  
  if(isMix) {
    Playlist.makeMix(playlist)
  }

  console.log(playlist)


  res.render('soptify-playlist', {
    style: 'soptify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
})
  router.get('/soptify-playlist', function (req, res) {
    const id = Number(req.query.id)

    const playlist = Playlist.getById(id)

    if(!playlist) {
      return res.render('spotify-create', {
        style: "spotify-create",

        data: {
          message: "Помилка",
          info: "Такого плейлиста не знайдено",
          link: isMix 
          ? '/spotify-create?isMix=true'
          : '/spotify-create'
        },
      })
    }

    res.render('spotify-playlist', {
      style: 'spotify-playlist',

      data: {
        playlistId: playlist.id,
        tracks: playlist.tracks,
        name: playlist.name,

      }
    })
  })

  router.get('/spotify-track-delete', function(req, res) {
    const playlistId = Number(req.query.playlistId)
    const trackId = Number(req.query.trackId)

    const playlist = Playlist.getById(playlistId)

    if(!playlist) {
      return res.render ('alert', {
        style: "alert",

        data: {
          message: 'Помилка',
          info: 'Такой плейлист не найдено',
          link: `/soptify-playlist?id=${{playlistId}}`,
        },
      })
    }

    playlist.deleteTrackById(trackId) 

    res.render('soptify-playlist', {
      style: 'soptify-playlist',

      data: {
        playlistId: playlist.id,
        tracks: playlist.tracks,
        name: playlist.name,
      }
    })
  })
// ================================================================

router.get('/spotify-track_add', function (req, res) {
  const playlistId = Number(req.query.playlistId)
  const playlist = Playlist.getById(playlistId)
  const allTracks = Track.getList()

  console.log(playlistId, playlist, allTracks)

  res.render('spotify-track_add', {
    style: 'spotify-track_add',

    data: {
      playlistId: playlist.id,
      tracks: allTracks,
      link: `/spotify-track-add?playlistId={playlistId}}&trackId=={id}}`,
    },
  })
})

// ================================================================
// Шлях POST для додавання треку до плейліста
router.post('/spotify-track_add', function (req, res) {
  const playlistId = Number(req.body.playlistId)
  const trackId = Number(req.body.trackId)

  const playlist = Playlist.getById(playlistId)

  if (!playlist) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Такого плейліста не знайдено',
        link: `/spotify-playlist?id=${playlistId}`,
      },
    })
  }

  const trackToAdd = Track.getList().find(
    (track) => track.id === trackId,
  )

  if (!trackToAdd) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Такого треку не знайдено',
        link: `/spotify-track_add?playlistId=${playlistId}`,
      },
    })
  }

  playlist.tracks.push(trackToAdd)

  res.render('spotify-playlist', {
    style: 'spotify-playlist',
    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
})

router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-main', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-main',

    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

router.get('/spotify-search', function (req, res) {
  const value = ''

  const list = Playlist.findListByValue(value)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-search', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-search',

    data: {
      list: list.map(({tracks, ...rest}) => ({
        ...rest,
        amount: tracks.length,
      }))
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// Підключаємо роутер до бек-енду
module.exports = router
