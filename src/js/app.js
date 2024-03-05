const product1 = { price: 10 };
const product2 = { price: "20" };
const discount = 10;

const itemsContainer = document.querySelector("#items");
itemsContainer.innerHTML = `<tr>
    <td>Js od podstaw</td>
    <td>1</td>
    <td>${product1.price}</td>
    </tr>`;

if (isNaN(+product2.price)) {
  console.log("Podano niepoprawny typ danych");
}

const total = Number(product1.price) + Number(product2.price);
const totalWithDiscount = total - discount;

document.querySelector("#total-price").innerHTML = total;
