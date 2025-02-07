import { Product } from "./Product.js";
import { renderProducts } from "./ProductList.js";

// it will handle the sorting of product
export function handleSorting() {
  const sortFilter = document.querySelector("#sortFilter");
  const sortRestoreFilter = document.querySelector("#sortRestoreFilter");
  const sortFilterOptions = sortFilter || sortRestoreFilter;
  const allProducts = document.querySelector(".all-product");
  const deletedProducts = document.querySelector(".deleted-product");

  if (sortFilterOptions) {

    // onchange event of select option sort will apply
    sortFilterOptions.addEventListener("change", function () {
      const product = new Product();
      let sortedData = product.sortProduct(
        this.value,
        sortFilterOptions == sortFilter ? true : false
      );


      if (allProducts) allProducts.innerHTML = "";
      if (deletedProducts) deletedProducts.innerHTML = "";

      renderProducts(sortedData, allProducts || deletedProducts);
    });
  }
}
