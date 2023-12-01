// Підключаємо технологію express для back-end сервера
const express = require('express')
const { Value } = require('sass')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  static #count = 0

  constructor( img, title, description, category, price, amount = 0) {
    this.id = ++Product.#count // Генерирует уникальный айди
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.amount = amount 
  }

  static add = (...data) => {
    const newProduct = new Product (...data)

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
Product.add(
  '../img/purchare/image-616.jpg',
  `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
  `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС`,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  27000,
  10,
)

Product.add(
  '/../img/purchare/image-617.jpg',
  `Комп'ютер COBRA Advanced (I11F.8.H1S2.15T.13356) Intel`,
  `Intel Core i3-10100F (3.6 - 4.3 ГГц) / RAM 8 ГБ / HDD 1 ТБ + SSD 240 ГБ / GeForce GTX 1050 Ti, 4 ГБ / без ОД / LAN / Linux`,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  27000,
  5,
)

Product.add(
  '/../img/purchare/image-618.jpg',
  `Комп'ютер ARTLINE Gaming by ASUS TUF v119 (TUFv119)`,
  `Intel Core i9-13900KF (3.0 - 5.8 ГГц) / RAM 64 ГБ / SSD 2 ТБ (2 x 1 ТБ) / nVidia GeForce RTX 4070 Ti, 12 ГБ / без ОД / LAN / Wi-Fi / Bluetooth / без ОС`,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  27000,
  8,
)

Product.add(
  '/../img/purchare/image-616.jpg',
  `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
  `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС`,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  27000,
  8,
)

Product.add(
  '/../img/purchare/image-617.jpg',
  `Комп'ютер COBRA Advanced (I11F.8.H1S2.15T.13356) Intel`,
  `Intel Core i3-10100F (3.6 - 4.3 ГГц) / RAM 8 ГБ / HDD 1 ТБ + SSD 240 ГБ / GeForce GTX 1050 Ti, 4 ГБ / без ОД / LAN / Linux`,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  27000,
  6,
)

Product.add(
  '/../img/purchare/image-618.jpg',
  `Комп'ютер ARTLINE Gaming by ASUS TUF v119 (TUFv119)`,
  `Intel Core i9-13900KF (3.0 - 5.8 ГГц) / RAM 64 ГБ / SSD 2 ТБ (2 x 1 ТБ) / nVidia GeForce RTX 4070 Ti, 12 ГБ / без ОД / LAN / Wi-Fi / Bluetooth / без ОС`,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  27000,
  4,
)

class Purchase {
  static DELIVERY_PRICE = 150
  static #BONUS_FACTOR = 0.1

  static #count = 0
  static #list = []

  static #bonusAccount = new Map()

  static getBonusBalance = (email) => {
    return Purchase.#bonusAccount.get(email) || 0
  }

  static calcBonusAmount = (value) => {
    return value * Purchase.#BONUS_FACTOR
  }

  static updateBonusBalance = (
    email,
    price,
    bonusUse = 0,
  ) => {
    const amount = this.calcBonusAmount(price);

    const currentBalance =Purchase.getBonusBalance(email)

    const updateBonusBalance = 
      currentBalance + amount - bonusUse

      Purchase.#bonusAccount.set(email, updateBonusBalance)

      console.log(email, updateBonusBalance)

      return amount
  }

  constructor(data,product) {
    this.id = ++Purchase.#count

    this.firsname = data.firstname
    this.lastname = data.lastname

    this.phone = data.phone
    this.email = data.email

    this.comment = data.comment || null

    this.bonus = data.bonus || 0 

    this.promocode = data.promocode ||null

    this.totalPrice = data.totalPrice
    this.productPrice = data.productPrice
    this.deliveryPrice = data.deliveryPrice
    this.amount = data.amount

    this.product = product
  }

  static add = (...arg) => {
    const newPurchase = new Purchase(...arg)

    this.#list.push(newPurchase)

    return newPurchase
  }

  static getList = () => {
    return Purchase.#list.reverse().map(({id,title,totalPrice,bonus})=> {
      this.id = id
      this.title = title
      this.totalPrice = totalPrice
      this.bonus = bonus
    })
  }
  static getById = (id) => {
    return Purchase.#list.find((item) => item.id === id)
  }
  static updateById = (id, data) => {
    const purchase = Purchase.#list.find(
      (item) => item.id === id,
    )
    if(purchase) {
      if(data.firsname)
      purchase.firstname = data.firsname
      if(data.lastname) purchase.lastname = data.lastname
      if(data.phone) purchase.phone = data.phone
      if(data.email) purchase.email = data.email

      return true
    }
    else {
      return false
    }
  }
}
class Promocode {
  static #list = []

  constructor(name, factor) {
    this.name = name
    this.factor = factor
  }
  static add = (name, factor) => {
    const newPromoCode = new Promocode(name, factor)
    Promocode.#list.push(newPromoCode)
    return newPromoCode
  }
  static getByName = (name) => {
    return this.#list.find((promo) => promo.name === name)
  }
  static calc = (promo, price) => {
    return price * promo.factor
  }
}

Promocode.add('SUMMER2023', 0.9)
Promocode.add('DISCONT50', 0.5)
Promocode.add('SALE25', 0.75)


// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку


  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
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

res.render('purchase-product', {
  style: 'purchase-product',

  data: {
    list: Product.getRandomList(id),
    product: Product.getById(id),
  }
})
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




router.post('/purchase-create', function(req , res) {
  const id = Number(req.query.id)
  
  let {
    totalPrice,
    productPrice,
    deliveryPrice,
    amount,

    firsname,
    lastname,
    email,
    phone,

    promocode,
    bonus,
  } = req.body 

  const product = Product.getById(id)

  if(!product) {
    return res.render('alert', {
      style: 'alert',
  
      data: {
        message: 'Ошибка',
        info: "Не коректное количество товара",
        link: `/purchase-product?id=${id}`,
      },
    }) 
  }
  if(product.amount < amount) {
    return res.render('alert', {
      style: 'alert',
  
      data: {
        message: 'Ошибка',
        info: "Нет на складе",
        link: `/purchase-product?id=${id}`,
      },
    }) 
  }
  totalPrice = Number(totalPrice)
  productPrice = Number(productPrice)
  deliveryPrice = Number(deliveryPrice)
  amount = Number(amount)
  bonus = Number(bonus)


  if(
    isNaN(totalPrice) ||
    isNaN(productPrice) ||
    isNaN(deliveryPrice) ||
    isNaN(amount) ||
    isNaN(bonus)
  ) {
    return res.render('alert', {
      style: 'alert',
  
      data: {
        message: 'Ошибка',
        info: "Такого количества товара нет на складе",
        link: `/purchase-list`,
      },
    })
  }
  if (!firsname || !lastname || !email || !phone) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Заполните обязательные поля',
        info: "Некоректные данные",
        link: `/purchase-list`,
      },
    })
  }

  if(bonus || bonus > 0 ) {
    const bonusAmount = Purchase.getBonusBalance(email)

    console.log(bonusAmount)

    if(bonus > bonusAmount) {
      bonus = bonusAmount
    }

    Purchase.updateBonusBalance(email,totalPrice,bonus)
    totalPrice -= bonus
  } else {
    Purchase.updateBonusBalance(email, totalPrice, 0 )
  }

  if(promocode) {
    promocode = Promocode.getByName(promocode)
    if(promocode) {
      totalPrice = Promocode.calc(promocode, totalPrice)
    }
  }
  if (totalPrice < 0 ) totalPrice = 0

  const purchase = Purchase.add (
    {
      totalPrice,
      productPrice,
      deliveryPrice,
      amount,
      bonus,

      firsname,
      lastname,
      email,
      phone,
      amount,

      promocode,
    },
    product,
  )
  console.log(purchase)
    
    res.render('alert', {
      style: 'alert',

      data: {
        message: "Успешно!",
        info: "Заказ создан",
        link: "/purchase-list",
      },
    })
})
  if (Product.amount < 1) {
  return res.render ('alert', {
    style: 'alert',
    data: {
      message: "Ошибка",
      info: "Такого количества товара нет в наличие",
      link: `/purchase-product?id=${id}`,
    },
  })
}
// console.log(Product, amount)

// const amount = Number(req.query.id)
const productPrice = Product.price * amount
const totalPrice = productPrice + Purchase.DELIVERY_PRICE;
const bonus = Purchase.tcalcBonusAmount(totalPrice)


res.render('purchase-create', {
  style: 'purchase-create',

  data: {
    id: Product.id,

    cart: [
      {
        text:` ${product.title} (${amount} шт) `,
        price: productPrice,
      
      },
      {
        text:` Доставка `,
        price: Purchase.DELIVERY_PRICE, 
      },
    ],
    totalPrice,
    productPrice,
    deliveryPrice: Purchase.DELIVERY_PRICE,
    amount,
    bonus,
  },
})

router.post('/purchase-submit' , function (req, res) {
  console.log(req.query)
  console.log(req.body)

  res.render('alert', {
    style: 'alert',

    data: {
      message: "Успешно",
      info: "Зaказ создан",
      link: '/purchase-list',
    }
  })
})


module.exports = router
