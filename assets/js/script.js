// script.js
import { toggleNavigation } from "./Modules/Navigation.js";
import { handleProductView } from "./Modules/ProductView.js";
import { renderProducts } from "./Modules/ProductList.js";
import { handleSorting } from "./Modules/Sort.js";
import { updateStatistics } from "./Modules/Statistics.js";
import { Product } from "./Modules/Product.js";

toggleNavigation();
handleProductView();
handleSorting();

let product = new Product();
let productList = product.getProduct();
let allProducts = document.querySelector(".all-product");
let deletedProducts = document.querySelector(".deleted-product");

if (allProducts) {
  renderProducts(
    productList.filter((x) => !x.isDeleted),
    allProducts
  );
}
if (deletedProducts) {
  renderProducts(
    productList.filter((x) => x.isDeleted),
    deletedProducts
  );
}

updateStatistics();
