import "./style.css";
 //
/*fetch('./api/Products.json')
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error('Error loading JSON:', error));
console.log(" Hello ji kaise ho");
console.log(products);*/

import products from "./api/products.json";
import { showProductContainer } from "./HomeProductCards";

showProductContainer(products)