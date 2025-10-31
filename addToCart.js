import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getCartProductFromLS();

export const addToCart = (event, id, stock) => {
  let arrLocalStorageProduct = getCartProductFromLS();

  const currentProdElem = document.querySelector(`#card${id}`);
  let quantity = Number(currentProdElem.querySelector(".productQuantity").innerText);
  let price = currentProdElem.querySelector(".productPrice").innerText;

  // ✅ Remove ₹ and convert to number
  price = Number(price.replace("₹", ""));

  // ✅ Calculate total price for current item
  let totalPrice = price * quantity;

  let existingProd = arrLocalStorageProduct.find((curProd) => curProd.id === id);
showToast("add", id);
  if (existingProd) {
    // ✅ Update existing product quantity and price
    quantity = Number(existingProd.quantity) + quantity;
    totalPrice = price * quantity;

    arrLocalStorageProduct = arrLocalStorageProduct.map((curProd) => {
      return curProd.id === id ? { ...curProd, quantity, price: totalPrice } : curProd;
    });
  } else {
    // ✅ Add new product
    arrLocalStorageProduct.push({ id, quantity, price: totalPrice });
  }

  // ✅ Save updated cart to localStorage
  localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

 

   //update the cart button value
  updateCartValue(arrLocalStorageProduct);

  //show toast when product added to the cart
  showToast("add", id);
};
