import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const items = document.querySelector(".items");
const preCheckout = document.querySelector(".pre-checkout");
const main = document.querySelector(".main");
const fullName = document.querySelector(".name");
const cardNumber = document.querySelector(".card-number");
const password = document.querySelector(".password");
let arr = [];
const thanks = document.querySelector(".thanks");

function render() {
  let html = "";
  menuArray.forEach((food) => {
    html += `
        <div class="item">
        <div class="item-data">
      <div class="item-icon">${food.emoji}</div>
      <div class="item-text">
      <span>${food.name}</span>
      <p>${food.ingredients}</p>
      <span class="price">$${food.price}</span>
      </div>
      </div>
      <div  data-${food.name}="${food.id}">
      <button class="add-btn" data-${food.name}="${food.id}">+</button>
      </div>
                                </div>
                                <hr />
                                `;
    items.innerHTML = html;
  });
}

render();

document.addEventListener("click", function (e) {
  if (e.target.dataset.pizza) {
    // addItems(e.target.dataset.pizza);
    if (thanks.style.display === "block") {
      //   location.reload();
      refresh();
      addItems(e.target.dataset.pizza);
    } else {
      addItems(e.target.dataset.pizza);
    }
  } else if (e.target.dataset.hamburger) {
    addItems(e.target.dataset.hamburger);
    if (thanks.style.display === "block") {
      location.reload();
    }
  } else if (e.target.dataset.beer) {
    addItems(e.target.dataset.beer);
    if (thanks.style.display === "block") {
      location.reload();
    }
  }

  if (e.target.classList.contains("remove-btn")) {
    if (arr.length > 1) {
      const itemId =
        e.target.dataset[
          `remove${e.target.parentElement.parentElement.classList[1]}`
        ];
      removeItem(itemId);
    } else {
      preCheckout.style.display = "none";
    }
  }

  if (e.target.classList.contains("complete-btn")) {
    document.querySelector(".popup").style.display = "flex";
  }

  if (e.target.classList.contains("pay-btn")) {
    if (
      fullName.value !== "" &&
      cardNumber.value !== "" &&
      password.value !== ""
    ) {
      document.querySelector(".popup").style.display = "none";
      thanks.innerHTML = `Thanks, ${fullName.value}! Your order is in its own way!`;
      document.querySelectorAll("input").forEach((input) => {
        input.value = "";
      });
      e.preventDefault();
      preCheckout.style.display = "none";
      main.style.flexDirection = "column";
      main.style.gap = "3rem";
      if (window.innerWidth > 800) {
        main.style.width = "70%";
        main.style.flexDirection = "column-reverse";
      }
      thanks.style.display = "block";
    }
  }
});

// HANDLE THE REMOVE BUTTON CLICKS
function removeItem(itemId) {
  const index = arr.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    arr.splice(index, 1);
    showAddedItems(arr);
  }
}

function addItems(id) {
  arr.push({
    name: menuArray[id].name,
    price: menuArray[id].price,
    id: uuidv4(),
  });

  showAddedItems(arr);
}

function showAddedItems(arr) {
  let addedItems = ``;

  arr.forEach((item, i) => {
    addedItems += `
            <div class="added-item ${item.name + i}">
                <div class="food-name-remove">
                    <span>${item.name}</span>
                    <p data-remove-${item.name + i}=${
      item.id
    } class="remove-btn">remove</p>
                </div>
                <span>$${item.price}</span>
                </div>
                `;
  });

  let html = `
  <span class="order-text">Your Order</span>
  <div class="added-items">
  ${addedItems}
      </div>
      <hr />
      <div class="total">
      <span id="total">Total Price:</span>
      <span>$${arr.reduce((acc, cur) => acc + cur.price, 0)}</span>
      </div>
        <button class="btn complete-btn">Complete Order</button>
        `;

  preCheckout.innerHTML = html;
  preCheckout.style.display = "block";
  main.style.width = "100%";
}

function refresh() {
  arr = [];
  if (window.innerWidth > 1000) {
    main.style.flexDirection = "row";
    main.style.gap = "10rem";
  }
  thanks.style.display = "none";
}
