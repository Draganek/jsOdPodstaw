const coursesList = document.querySelector('.coursers-list');
const counter = document.querySelector('.counter');

function createCart() {
    const items = [];

    const refreshProductsCount = () => {
        counter.innerText = items.length;
    }

    const add = (title, price, quantity = 1) => {
        items.push({title,price,quantity});
        refreshProductsCount();
    }

    return {
        add,
    };
}

const cart = createCart();

const addClass = (className, text, element) => {
    element.classList.add(className);
    element.innerText = text;
}

const addToCartHandler = (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const title = e.target.dataset.title;
    const price = Number(e.target.dataset.price);
    cart.add(title, price);
    addClass('in-cart', 'Dodano', e.target);
}

coursesList.addEventListener('click', addToCartHandler);
