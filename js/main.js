let userBasket = {
    basket: {},
    addToBasket: function (item) {
        this.basket[item.name] = { name: item.name, price: item.price, amount: item.amount, img: item.img }
    },
    addItemAmount: function (itemName) {
        console.log(itemName)
        if (itemName in this.basket) {
            this.basket[itemName]['amount'] += 1; // увеличиваем число едениц товара
        }
    },
    countBasketPrice: function () {
        let basketPrice = 0;
        let basketAmount = 0;
        for (item in this.basket) {
            basketPrice += (this.basket[item]['price'] * this.basket[item]['amount']);
            basketAmount += this.basket[item]['amount'];
        }
        return [basketPrice, basketAmount];
    }

}

function Product(name, code, size, color, price, amount, img) {
    this.name = name;
    this.code = code;
    this.size = size;
    this.color = color;
    this.amount = amount;
    this.price = price;
    this.img = img;
    return { name: this.name, code: this.code, size: this.size, color: this.color, price: this.price, amount: this.amount, img: this.img }
}

let item1 = new Product('first item', 'MP002XM0RGXF', 41, 'black', 1200, 1, ['cat1', 'cat1.1', 'cat1.2'])
let item2 = new Product('second item', 'LP002XD0RGXF', 48, 'green', 1500, 1, ['cat2', 'cat2.1', 'cat2.2'])
let item3 = new Product('third item', 'VP002FM0RGF', 50, 'white', 3000, 1, ['cat3', 'cat3.1', 'cat3.2'])


function createBasketView() {
    let basketView = document.getElementsByClassName('basket');
    let basketImg = document.createElement('img');
    basketImg.src = "img/basket.png";
    basketImg.style.maxWidth = '150px';
    basketView[0].appendChild(basketImg);
    let basketText = document.createElement('p');
    basketText.className = 'basket-text';
    basketView[0].appendChild(basketText);
    basketText.textContent = ` Корзина пуста`
}


function hidePopup() {
    let popup = document.querySelector('.popup');
    popup.classList.remove('open');

}

function viewBasketPrice() {

    let res = userBasket.countBasketPrice();
    let basketText = document.querySelector('.basket-text');
    if (res[1] == 0) {
        basketText.textContent = `  Корзина пуста`
    }
    else {
        basketText.textContent = ` В корзине: ${res[1]} товаров на сумму ${res[0]} рублей`
    }

}


// Показывает содержимое корзины
function showBasketContent() {
    let basketContent = document.querySelector('.basket-content');
    while (basketContent.firstChild) {
        basketContent.removeChild(basketContent.firstChild);
    }
    basketItems = Object.values(userBasket.basket)
    for (let i = 0; i < basketItems.length; i++) {
        let basketItem = document.createElement('li');
        basketItem.classList.add('item-list');
        basketItem.classList.add('list-group-item', 'basket-item')
        let itemImg = document.createElement('img');
        itemImg.src = `img/${basketItems[i].img[0]}.jpg`;
        itemImg.style.maxWidth = '10%';

        let itemInfo = document.createElement('p');
        itemInfo.innerHTML = `&nbsp&nbsp&nbspнаименование: ${basketItems[i].name}  |   кол-во: ${basketItems[i].amount}  |  цена за 1 шт.: ${basketItems[i].price}&nbsp`;

        let deleteBtn = document.createElement('a');
        deleteBtn.classList.add('btn', 'btn-primary', 'btn-sm');
        deleteBtn.innerText = 'удалить';
        deleteBtn.productId = basketItems[i].name;
        deleteBtn.addEventListener("click", (event) => deleteItemFromBasket(event.target.productId)); //удаляем товар из корзины

        basketItem.appendChild(itemImg);
        basketItem.appendChild(itemInfo);
        basketItem.appendChild(deleteBtn);

        basketContent.appendChild(basketItem);
    }
}

// Удаляет элемент из корзины
function deleteItemFromBasket(itemName) {
    console.log(itemName);
    delete userBasket.basket[itemName];
    showBasketContent();
}



createBasketView();

let countPrice = document.querySelector(".count-basket")
countPrice.addEventListener('click', viewBasketPrice)



let productsCatalog = [item1, item2, item3];


function showCatalog(products) {
    let catalogView = document.querySelector('#catalog');
    catalogView.style.display = 'flex';

    for (i = 0; i < products.length; i++) {
        product = products[i]
        let productCard = document.createElement('div');
        productCard.classList.add('card')
        productCard.style.width = '18rem';

        let productImg = document.createElement('img');
        productImg.src = `img/${product.img[0]}.jpg`;
        productImg.style.maxWidth = '150px';
        productImg.style.maxHeight = '250px';
        productImg.classList.add(`card-img-top`, `img-${i}`);
        productImg.productId = product;

        let productDescription = document.createElement('div');
        productCard.classList.add("card-body");

        let productName = document.createElement('h5');
        productName.classList.add("card-title");
        productName.innerText = `name: ${product.name}`;

        let productInfo = document.createElement('p');
        productInfo.classList.add('card-text');
        productInfo.innerText = `code: ${product.code} price: ${product.price}`;

        let buyBtn = document.createElement('a');
        buyBtn.classList.add('btn', 'btn-primary', `btn-${i}`);
        buyBtn.innerText = 'Купить';
        buyBtn.productId = product;

        let addBtn = document.createElement('a');
        addBtn.classList.add('btn', 'btn-success', `btn-add-${i}`);
        addBtn.innerText = '+ 1';
        addBtn.productId = product;

        productDescription.appendChild(productName);
        productDescription.appendChild(productInfo);
        productDescription.appendChild(buyBtn);
        productDescription.appendChild(addBtn);

        productCard.appendChild(productImg);
        productCard.appendChild(productDescription);
        catalogView.appendChild(productCard);

        let btnAddtoBasket = document.querySelector(`.btn-${i}`);
        let btnAddtoAmount = document.querySelector(`.btn-add-${i}`);
        let boundPopup = document.querySelector(`.img-${i}`);
        console.log(boundPopup)
        btnAddtoBasket.addEventListener("click", (event) => userBasket.addToBasket(event.target.productId)); //добавление в корзину
        btnAddtoAmount.addEventListener("click", (event) => userBasket.addItemAmount(event.target.productId.name)); //увеличение количества в корзине
        btnAddtoBasket.addEventListener("click", () => showBasketContent()); //демонстрируем содержимое корзины
        btnAddtoAmount.addEventListener("click", () => showBasketContent()); //демонстрируем содержимое корзины
        boundPopup.addEventListener("click", function (event) {
            let popup = document.querySelector('.popup');
            popup.classList.add('open');
            let popupImg1 = document.querySelector('.popup-img1');
            popupImg1.src = `img/${event.target.productId.img[0]}.jpg`;
            let popupImg2 = document.querySelector('.popup-img2');
            popupImg2.src = `img/${event.target.productId.img[1]}.jpg`;
            let popupImg3 = document.querySelector('.popup-img3');
            popupImg3.src = `img/${event.target.productId.img[2]}.jpg`;
        });

    }
    let btnClosePopup = document.querySelector('.popup__close');
    btnClosePopup.addEventListener('click', hidePopup);
}
showCatalog(productsCatalog);

