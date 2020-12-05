let userBasket = {
    basket: {},
    addToBasket: function (item) {
        this.basket[item.name] = { price: item.price, amount: item.amount }
    },
    addItemAmount: function (itemName) {
        this.basket[itemName]['amount'] += 1; // увеличиваем число едениц товара
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

let item1 = new Product('first item', 'MP002XM0RGXF', 41, 'black', 1200, 1, 'cat1')
let item2 = new Product('second item', 'LP002XD0RGXF', 48, 'green', 1500, 1, 'cat2')
let item3 = new Product('third item', 'VP002FM0RGF', 50, 'white', 3000, 1, 'cat3')

// userBasket.addItemAmount('first item') // увеличиваем число едениц первого товара
// userBasket.addItemAmount('second item') // увеличиваем число едениц второго товара

function createBasketView() {
    let basketView = document.getElementsByClassName('basket');
    let basketImg = document.createElement('img');
    basketImg.src = "img/basket.png";
    basketImg.style.maxWidth = '150px';
    basketView[0].appendChild(basketImg);
    let basketText = document.createElement('p');
    basketText.className = 'basket-text';
    basketView[0].appendChild(basketText);
}

function viewBasketPrice() {

    let res = userBasket.countBasketPrice();
    let basketText = document.querySelector('.basket-text');
    basketText.textContent = ` В корзине: ${res[1]} товаров на сумму ${res[0]} рублей`
    let basketBackground = document.querySelector('.card');
    if (Object.keys(userBasket.basket).length == 0) {
        basketBackground.style.background = '#ea80fc';
    }
    else {
        basketBackground.style.background = '#64ffda';
    }
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
        productImg.src = `img/${product.img}.jpg`;
        productImg.style.maxWidth = '150px';
        productImg.style.maxHeight = '250px';
        productImg.classList.add("card-img-top");

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
        btnAddtoBasket.addEventListener("click", (event) => userBasket.addToBasket(event.target.productId)); //добавление в корзину
        btnAddtoAmount.addEventListener("click", (event) => userBasket.addItemAmount(event.target.productId.name)); //увеличение количества в корзине

    }

}
showCatalog(productsCatalog);
