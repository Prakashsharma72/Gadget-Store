import { getCartProductFromLS } from "./getCartProducts";
import { updateCartProductTotal } from "./updateCartProductTotal";

export const incrementDecrement = (event, id, stock, price) => {
  const currentCardElement = document.querySelector(`#card${id}`);
  const productQuantity = currentCardElement.querySelector(".productQuantity");
  const productPrice = currentCardElement.querySelector(".productPrice");

 //let quantity = 1;
  //let localStoragePrice = 0;


  // ✅ Always convert quantity to number
  let quantity = Number(productQuantity.innerText);
  let totalPrice = Number(price);

  let localCartProducts = getCartProductFromLS();
  let existingProd = localCartProducts.find((curProd) => curProd.id === id);

  if (existingProd) {
    quantity = existingProd.quantity;
    totalPrice = existingProd.price;
  } else {
    totalPrice = price;
    price = price;
  }

  // ✅ Handle increment
  if (event.target.classList.contains("cartIncrement")) {
    if (quantity < stock) {
      quantity += 1;

    }else if (quantity === stock) {
      quantity = stock;
      totalPrice = price * stock;
    }
  }

  // ✅ Handle decrement
  if (event.target.classList.contains("cartDecrement")) {
    if (quantity > 1) {
      quantity -= 1;
    }
  }

  // ✅ Update total price
   totalPrice = price * quantity;
  totalPrice = Number(totalPrice.toFixed(2));

  // ✅ Update product in localStorage
  let updatedCart = localCartProducts.map((curProd) => {
    return curProd.id === id ? { ...curProd, quantity, price: totalPrice } : curProd;
  });

  localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));

  // ✅ Reflect on UI
  productQuantity.innerText = quantity;
  productPrice.innerText = totalPrice ;

  // ✅ Update total cart value
  updateCartProductTotal();
};
