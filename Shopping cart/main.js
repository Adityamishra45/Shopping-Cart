// Cart

let carticon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closecart = document.querySelector('#close-cart');

// Open cart
carticon.onclick = () => {
  cart.classList.add("active");
};

closecart.onclick = () => {
  cart.classList.remove("active");
};

// Cart working js
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  // Remove items from cart
  var removeCartButtons = document.getElementsByClassName('cart-remove');
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity');
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  var addCartButtons = document.getElementsByClassName('add-cart');
  for (var i = 0; i < addCartButtons.length; i++) {
    var button = addCartButtons[i];
    button.addEventListener('click', addCartClicked);
  }

  document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener("click", buyButtonClicked);

  updateTotal();
}

function buyButtonClicked() {
  alert("Your order is placed");
  var cartContent = document.getElementsByClassName('cart-content')[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.parentElement.parentElement;
    var title = shopProduct.getElementsByClassName('product-title')[0].innerText;
    var price = shopProduct.getElementsByClassName('price')[0].innerText;
    var productImage = shopProduct.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImage);
    updateTotal();
  }
  

function addProductToCart(title, price, productImage) {
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartItems = cartContent.getElementsByClassName('cart-box');
  for (var i = 0; i < cartItems.length; i++) {
    var cartItem = cartItems[i];
    var cartItemTitle = cartItem.getElementsByClassName('cart-product-title')[0].innerText;
    if (cartItemTitle === title) {
      alert('You have already added this item to the cart.');
      return;
    }
  }

  var cartShopbox = document.createElement('div');
  cartShopbox.classList.add('cart-box');
  var cartItemHTML = `
    <img src="${productImage}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="bx bxs-trash-alt cart-remove"></i>
  `;
  cartShopbox.innerHTML = cartItemHTML;
  cartContent.appendChild(cartShopbox);

  var removeCartItemButtons = cartShopbox.getElementsByClassName('cart-remove');
  for(var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }
}

function updateTotal() {
  var cartBoxes = document.getElementsByClassName('cart-box');
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace("#", ""));
    var quantity = quantityElement.value;
    total += price * quantity;
    // If price contains cents value.
    total = Math.round(total * 100) / 100;
  }

  document.getElementsByClassName('total-price')[0].innerText = "# " + total;
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}



