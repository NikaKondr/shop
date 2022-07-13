
# Магазин

### [**DEMO**](https://nikakondr.github.io/shop/)

Интерфейс под разные магазины!

Дизайн взят с [ragemp.pro](https://ragemp.pro/)

Автор дизайна: (напиши добавлю)

Разработка: discord: **peach#5569**
  

### `npm i` 

Перед запуском проекта вам нужно установить модули. 

### `npm start`  

После установки модулей запустите проект.

### `npm run build`  

Для того чтобы сбилдить проект.

# Ивенты

## Сервер -> Клиент

### Отобразить интерфейс
``('shop' {type: 'setShow', data: true})``

### Указать имя магазина
``('shop', {type: 'setName', data: 'Магазин 24/7' })``

### Отправить список категорий с товарами
``('shop', {type: 'setShop', data: array })``

```js
array = [{
    id: 0, // index
    name: 'Пистолеты',
    list: [{
            hash: '178787c',
            name: 'AP Pistol',
            price: 800,
            img: 'https://raw.githubusercontent.com/R3DIANCE/GTA-V-Weapons-images/master/Pistols/AP%20Pistol.png'
        },
        {
            hash: '278787c',
            name: 'Combat Pistol',
            price: 1200,
            img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Combat%20Pistol.png?raw=true'
        },
    ]
}]

```

## Клиент-> Сервер 

### Закрыть интерфейс
``('shop', 'close')``

### Покупка товаров
``('shop', 'buyItems', obj)``

```js
obj = {
    payment: "card",
    items: [{
            uuid: "5314ac99-da6e-4499-af6b-a8c18806be8f",
            hash: "178787c",
            name: "AP Pistol",
            price: 800
        },
        {
            uuid: "308f8b66-cc24-4cb6-a938-57dfae77bb58",
            hash: "178787c",
            name: "AP Pistol",
            price: 800
        }
    ]
}
```

## Для теста

Для вызова ивента в браузере, откройте DevTools (нажмите F12) и выберите вкладку "Консоль".
В консоле вызовите ``window.EventManager.callHandler('shop', 'setName', 'Привет' )``
После вызова ивента изменится название магазина.
Вы можете протестировать и с другими ивентами, которые описаны выше в разделе 
Ивенты/Сервер -> Клиент



![Главное меню](https://cdn.discordapp.com/attachments/639420321677443073/996803148570177576/unknown.png)

![Корзина](https://cdn.discordapp.com/attachments/639420321677443073/996803216375291954/unknown.png)

![Выбор оплаты](https://cdn.discordapp.com/attachments/639420321677443073/996803247383781466/unknown.png)
