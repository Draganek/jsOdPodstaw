const dateContainer = document.querySelector('#date');
const priceContainer = document.querySelector('#total-price');
const buyButton = document.querySelector('#buy');

const onSubmit = (e) => {
    e.preventDefault();

    const elements = document.querySelector("form").elements;
    const values = {
        name: elements['name'].value,
        email: elements['email'].value,
        'email-confirm': elements['email-confirm'].value,
        tel: elements['tel'].value,
        payment: elements['payment'].value,
    }
    console.log(values);
}

const showOrderDate = (element) => {
    const d = new Date();
    element.innerHTML = d.toLocaleString();
}
showOrderDate(dateContainer);

//Wyświetl podsumowanie (produkty)
const itemsContainer = document.querySelector('#items-list');
const items = JSON.parse(localStorage.getItem('items')) || [];

const showProducts = (products, element) => {
    const html = products
    .map(p => `<li>${p.quantity} x "${p.title}"</li>`)
    .join('');
    element.innerHTML = html;
}
showProducts(items, itemsContainer);

priceContainer.innerHTML = localStorage.getItem('totalPrice') || 0;

document.querySelector('form').addEventListener('submit', onSubmit);
