import { Product } from "./Product.js";

// it will show statistics of product
export function updateStatistics() {
    const totalProduct = document.querySelector(".total_product");
    const deletedProduct = document.querySelector(".deleted_product");
    const inventoryValue = document.querySelector(".inventory_value");
    const product = new Product();
    let totalOriginalPrice = 0;
  
    if (totalProduct) {
      totalProduct.innerHTML = product.getProduct().length;
      deletedProduct.innerHTML = product.sortProduct("all", false).length;
  
      product.sortProduct("all", false).forEach((product) => {
        totalOriginalPrice += Number(product.originalPrice);
        inventoryValue.innerHTML = totalOriginalPrice;
      });
    }
  }
  