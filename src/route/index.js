// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  static #count = 0

  constructor( img, title, description, category, price) {
    this.id = ++Product.#count // Генерирует уникальный айди
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
  }

  static add = (
    img,
    title,
    description,
    category,
    price,
  ) => {
    const newProduct = new Product ( 
      img,
      title,
      description,
      category,
      price,
    )

    this.#list.push(newProduct)
  }
  static getList = () => {
    return this.#list
  }
  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }
  static getRandomList = (id) => {
    const filteredList = this.#list.filter (
      (product) => product.id !== id,
    )
    const shuffledList = filteredList.sort(
      () => Math.random() - 0.5,
    )
    return shuffledList.slice(0 , 3)
  }
}




// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку


  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',

    data: {
      message: 'Опреция успешна',
      info: 'Товар Создан',
      link: '/purchase-index',
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/purchase-index', function (req, res) {
  // res.render генерує нам HTML сторінку
  

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',


    data: {
      list: Product.getList(),
    },
    // data: {
    //   img: 'https://picsum.phothos/200/300',
    //   title: 'Компьютер Artline Gaming (X43v31) AMD Ryzen 5 3600/',
    //   description: 'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 гб / HHD 1ТБ + SSD 480 Гб',
    //   category: [
    //     { id: 1, text: 'Готовый к Отправке'},
    //     { id: 2, text: 'Топ продаж'},
    //   ],
    //   price: 27000
    // },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/purchase-product', function (req, res) {
  const id = Number(req.query.id)  

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',


    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),
    },
    // data: {
    //   img: 'https://picsum.phothos/200/300',
    //   title: 'Компьютер Artline Gaming (X43v31) AMD Ryzen 5 3600/',
    //   description: 'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 гб / HHD 1ТБ + SSD 480 Гб',
    //   category: [
    //     { id: 1, text: 'Готовый к Отправке'},
    //     { id: 2, text: 'Топ продаж'},
    //   ],
    //   price: 27000
    // },
  })
  // ↑↑ сюди вводимо JSON дані
})


module.exports = router
