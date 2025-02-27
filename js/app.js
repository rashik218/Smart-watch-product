const ringButtonAll = document.getElementsByClassName("ring-button");
for (const ringBtn of ringButtonAll) {
  ringBtn.addEventListener("click", function (event) {
    const color = event.target.id.replace("-color", "");
    for (const btn of ringButtonAll) {
      btn.classList.remove("border-purple-600");
    }
    ringBtn.classList.add("border-purple-600");
    const productImg = document.getElementById("product-image");
    // productImg.src = "./images/" + color + ".png";
    productImg.src = `./images/${color}.png`;
  });
}

function selectWristSize(size) {
  const sizes = ["S", "M", "L", "XL"];
  for (const sz of sizes) {
    const button = document.getElementById(`size-${sz}`);
    if (size === sz) {
      button.classList.add("border-2", "border-purple-600");
    } else {
      button.classList.remove("border-2", "border-purple-600");
    }
  }
}

const quantityElement = document.querySelectorAll(".quantity-button");

for (const btn of quantityElement) {
  btn.addEventListener("click", function (event) {
    const amount = event.target.innerText === "+" ? 1 : -1;
    const quantity = document.getElementById("quantity");
    const convertedQnt = parseInt(quantity.innerText);
    const newQuantity = Math.max(0, convertedQnt + amount);
    quantity.innerText = newQuantity;
  });
}

let cartCount = 0;
let cartItems = [];
document.getElementById("add-to-cart").addEventListener("click", function () {
  const quantity = parseInt(document.getElementById("quantity").innerText);
  if (quantity > 0) {
    document.getElementById("checkout-container").classList.remove("hidden");
    cartCount += quantity;
    document.getElementById("cart-count").innerText = cartCount;

    const selectedBtn = document.querySelector("button.border-purple-600.w-6");
    const seletedColor = selectedBtn.id.split("-")[0];

    const selectedSizeBtn = document.querySelector(
      "button.border-purple-600:not(.w-6)"
    );
    const selectedSize = selectedSizeBtn.innerText.split("$")[0];
    const selectedPrize = selectedSizeBtn.innerText.split("$")[1];

    cartItems.push({
      image: "../images/" + seletedColor + ".png",
      title: "Classy Modern Smart Watch",
      color: seletedColor,
      size: selectedSize,
      quantity: quantity,
      prize: quantity * parseInt(selectedPrize),
    });
  } else {
    alert("Select Quantity");
  }
});

const totalQuantity = document.getElementById("total-quantity");
const totalPrize = document.getElementById("total-prize");

document.getElementById("checkout-btn")
.addEventListener("click", function () {
  const cartModal = document.getElementById("cart-modal");
  const cartContainer = document.getElementById("cart-items");
  let totalCost = 0;
  for (const item of cartItems) {
    totalCost += item.prize;
    const row = document.createElement("tr");
    row.classList.add("border-b");
    row.innerHTML = `
    <td class="py-2 px-4">
      <div class="flex items-center space-x-2">
        <img class="h-12 w-12 object-cover rounded-md" src="${item.image}" alt="">
        <span class="font-semibold">${item.title}</span>
      </div>
    </td>
    <td class="py-2 px-6 font-semibold">${item.color}</td>
    <td class="py-2 px-6 font-semibold">${item.size}</td>
    <td class="py-2 px-6 font-semibold">${item.quantity}</td>
    <td class="py-2 px-6 font-semibold">$${item.prize}</td>
    `;
    totalQuantity.innerText = cartCount;
    totalPrize.innerText = `$${totalCost}`;
    cartContainer.appendChild(row);
  }

  cartModal.classList.remove("hidden");
});

document
  .getElementById("continue-shopping")
  .addEventListener("click", function () {
    document.getElementById("cart-modal").classList.add("hidden");
  });

document.getElementById("checkout").addEventListener("click", function () {
  alert("Procceding to checkout");
});


document.getElementById("like").addEventListener("click", function () {
  document.getElementById("like").classList.add('hidden');
  document.getElementById("dislike").classList.remove('hidden');
});
document.getElementById("dislike").addEventListener("click", function () {
  document.getElementById("dislike").classList.add('hidden');
  document.getElementById("like").classList.remove('hidden');
});
