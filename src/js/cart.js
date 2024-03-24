(function() {
  // dogięcie
  const cart = {
  price: 0,
  getPrice(cb) {
    this.price = cb(this.items, this.getDiscountIfEnabled());
    if (this.price < 0) this.price = 0;
    return this.price;
  },
  getDiscount() {
    return this.discount.amount;
  },
  getDiscountIfEnabled() {
    if (this.discount.enabled) {
      return this.getDiscount();
    } else {
      return 0;
    }
  },
  removeCourse(id) {
    const index = this.items.findIndex(item => item.id === id);
    this.items.splice(index, 1);

    localStorage.setItem('items', JSON.stringify(this.items))
    
  },
  discount: {
    amount: 10,
    enabled: false,
  },
  items: [],
}

cart.items = JSON.parse(localStorage.getItem('items'));

const discountElement = document.querySelector("#discount");
const discountCheckbox = document.querySelector("#add-discount");
const itemsContainer = document.querySelector("#items");

cart.items.sort((a,b) => a.price - b.price)

cart.items.forEach(item => addItem(item))

function addItem (item) {
  itemsContainer.innerHTML += `<tr data-course-id="${item.id}">
  <td><button class="delete">x</button></td>
  <td>${item.title}</td>
  <td><input type="number" class="quantity" value="1"></td>
  <td>${item.price}</td>
  </tr>`;
}

const removeRow = (e) => {
  if (e.target.tagName === "BUTTON") {
    const row = e.target.closest("tr");
    cart.removeCourse(Number(row.dataset.courseId));
    row.remove();
    calculatePrice();
  }
}

const removeRowFromQuantity = (e) => {
  if (Number(e.target.value) === 0) {
    const row = e.target.closest("tr");
    cart.removeCourse(Number(row.dataset.courseId));
    row.remove();
    calculatePrice();
  }
}

const markBg = (e) => {
  if (e.target.tagName === "TD") {
    e.target.closest("tr").classList.toggle("marked");
  }
}

//dodaj zniżkę
const addDiscount = function(e) {
  this.discount.enabled = e.target.checked;
  if (this.getDiscount() > 0) {
    document
    .querySelector("#discount-amount")
    .innerHTML = -this.getDiscount();
    discountElement.classList.toggle("hidden");
  }
  calculatePrice();
}

const getPriceRegularClient = (items, discount) => {
  return items.reduce((acc, item) => acc + item.price,0) - discount;
}
const getPriceSuperClient = (items, discount) => {
  return items.reduce((acc, item) => acc + item.price -1,0) - discount;
}

// cena całkowita
const calculatePrice = () => {
  const superClient = false;
  let cb = getPriceRegularClient;
  if (superClient) cb = getPriceSuperClient;

  let total = cart.getPrice(cb);
  document.querySelector("#total-price").innerHTML = total;
}
calculatePrice();

discountCheckbox.addEventListener("click", addDiscount.bind(cart));
itemsContainer.addEventListener("click", markBg);
itemsContainer.addEventListener("click", removeRow);
itemsContainer.addEventListener("change", removeRowFromQuantity);

//zaznacz checkbox
const discountShouldBeEnabled =
  +discountElement.dataset.discountShouldBeEnabled;

if (discountShouldBeEnabled) {
  discountCheckbox.click();
}
})()
