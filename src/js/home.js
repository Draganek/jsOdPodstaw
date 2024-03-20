const coursesList = document.querySelector('.coursers-list');
const counter = document.querySelector('.counter');


function createCart() {
    const items = [];

    const refreshProductsCount = () => counter.innerText = items.length;

    const add = (id, title, price, quantity = 1) => {
        items.push({id, title,price,quantity});
        refreshProductsCount();
    }

    const remove = (id) => {
        const index = items.findIndex(item => item.id === id);
        items.splice(index, 1);
        refreshProductsCount();

    }

    return {
        add,
        remove
    };
}

const cart = createCart();

const toggleClass = (className, text, mode) => {
    // mode = add, remove
    return (element) => {
        element.classList[mode](className);
        element.innerText = text;
    }
}
const addClassInCart = toggleClass('in-cart', 'Usuń z koszyka', 'add');
const removeClassInCart = toggleClass('in-cart', 'Dodaj do koszyka', 'remove');

const addToCartHandler = (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const title = e.target.dataset.title;
    const price = Number(e.target.dataset.price);
    const id = Number(e.target.dataset.id)

    if (e.target.classList.contains('in-cart')) {
        cart.remove(id)
        removeClassInCart(e.target);
    } else {
        cart.add(title, price);
        addClassInCart(e.target);
    }
    
}

coursesList.addEventListener('click', addToCartHandler);
