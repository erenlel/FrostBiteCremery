class cartItem {
    name;
    quantity = 0;
    price;
    // constructors
    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
    // getters
    get name() {
        return this.name;
    }
    get quantity() {
        return this.quantity;
    }
    get price() {
        return this.price
    }
}


const headerBox = document.querySelector('.header');
const cartItemContainer = document.querySelector('.cart');
const cartTotalCount = document.querySelector('.total');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');
const storeItemContainer = document.querySelector('.str-itm-container');
let cartIndex = 0;
let cartTotal = 0;
let cart = [];
let storeItemIndex = 0;

/* Ice Cream Flavors */

const iceCreamFlavors = [
    {
        index: "RP",
        name: "Rocket-Pop!",
        price: 1.99,
        image: "https://detoxinista.com/wp-content/uploads/2017/06/healthy-popsicle-recipe.jpg"
    },
    {
        index: "SS",
        name: "Strawberry-Shortcake",
        price: 2.34,
        image: "https://passthebutter.com/wp-content/uploads/2022/05/Featured-Image-of-Strawberry-Shortcake-Ice-Cream-Bars-1.jpg"
    },
    {
        index: "MCC",
        name: "Mint Chocolate-Chip",
        price: 2.49,
        image: "https://cleanfoodcrush.com/wp-content/uploads/2021/09/clean-eating-simple-Homemade-Mint-Chocolate-Chip-Ice-Cream-recipe.jpg"
    },
    {
        index: "OS",
        name: "Orange-Sherbert",
        price: 1.49,
        image: "https://cookingwithcocktailrings.com/wp-content/uploads/2021/02/img_603952d4242e4.jpg"
    }
];

window.onload = () => {
    storeItemContainer.querySelector('.str-itm').innerHTML = `
    <img src="${iceCreamFlavors[0].image}" class="itm-img"/>
    <h3 class="itm-name">${iceCreamFlavors[0].name}<span class="itm-price">$${iceCreamFlavors[0].price}</span></h3>`;
};
const addToCartBtn = storeItemContainer.querySelector('.add-to-cart');



setTimeout(() => {
    headerBox.classList.remove('hide');
}, 1000);



nextBtn.addEventListener('click', () => {
    storeItemIndex++;
    if (storeItemIndex > iceCreamFlavors.length - 1) {
        storeItemIndex = 0;
    }
    nextStoreItem(storeItemIndex);
});

prevBtn.addEventListener('click', () => {
    storeItemIndex--;
    if (storeItemIndex < 0) {
        storeItemIndex = iceCreamFlavors.length-1;
    }
    nextStoreItem(storeItemIndex);
});

addToCartBtn.addEventListener('click', () => {
    addToCart(storeItemIndex);
});

function nextStoreItem(item) {
    storeItemContainer.querySelector('.str-itm').innerHTML = `
    <img src="${iceCreamFlavors[item].image}" class="itm-img"/>
    <h3 class="itm-name">${iceCreamFlavors[item].name}<span class="itm-price">${iceCreamFlavors[item].price}</span></h3>
    `;
}

const addToCart = (item) => {
    const itemPrice = iceCreamFlavors[item].price;
    cartTotal += itemPrice;
    cartTotalCount.textContent = `${cartTotal.toFixed(2)}`;
    // cart is empty
    if (cart.length <= 0 ) {
        createCartItem(item);
        cart.push(
            new cartItem(iceCreamFlavors[item].name, 
            1, 
            iceCreamFlavors[item].price)
        );
    } else {
        console.log(`${updateQuantity(iceCreamFlavors[item], item)}`)
    }
}

function updateQuantity(order, index) {
    let inCart = false;
    let ind = 0;
    for(let i = 0; i < cart.length; i++) {
        if(cart[i].name === order.name) {
            inCart = true;
            break;
        }
        ind++;
    }

    if(inCart) {
        cart[ind].quantity += 1;
        const val = document.querySelector(`.${iceCreamFlavors[index].index}`);
        val.querySelector('.itm-quantity').textContent = cart[ind].quantity;
        return true;
    } else {
        cart.push(
            new cartItem(iceCreamFlavors[index].name, 
            1, 
            iceCreamFlavors[index].price)
        );
        createCartItem(index);
        return false
    }
}

function createCartItem(item) {
    
    const newCartItem = document.createElement('div');
    newCartItem.innerHTML = `
        <h3 class="cart-itm-name">
            ${iceCreamFlavors[item].name}
        </h3>
        <p>
            x
            <span class="itm-quantity">
                1
            </span>
        </p>
        <p class="cart-itm-price">
            ${iceCreamFlavors[item].price}
        </p>`;
    newCartItem.classList.add('cart-itm', 'box', `${iceCreamFlavors[item].index}`);
    cartItemContainer.appendChild(newCartItem);
    return newCartItem;
}

