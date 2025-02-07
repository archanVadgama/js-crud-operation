import { Product } from "./Product.js";
import { showToast } from "./Toast.js";


let product = new Product();
let allProducts = document.querySelector(".all-product");
let deletedProducts = document.querySelector(".deleted-product");

// render prodcut list ui 
export function renderProducts(products, container) {

    //if container nt found the it will return back 
    if (!container) return;

    // proccedd if product is found
    if (products.length > 0) {
        products.forEach((data) => {
            const encodedID = btoa(data.id); // encode the product id
            
            //setting acction buttons
            let actionsHTML = `
                <a href="/product/view.html?id=${encodedID}" class="btn btn-success"><i class="fa-regular fa-eye"></i></a>
                <a href="/product/form.html?edit=${encodedID}" class="btn btn-warning"><i class="fa-regular fa-pen-to-square"></i></a>
                <button class="btn btn-danger" data-id="${data.id}"><i class="fa-regular fa-trash-can"></i></button>
            `;

            // check if container is deletedProducts the set custom action buttons
            if (container === deletedProducts) {
                actionsHTML = `
                    <button class="btn btn-primary" data-id="${data.id}"><i class="fa-solid fa-reply"></i></button>
                    <a href="/product/view.html?id=${encodedID}" class="btn btn-success"><i class="fa-regular fa-eye"></i></a>
                    <button class="btn btn-danger" data-id="${data.id}"><i class="fa-regular fa-trash-can"></i></button>`;
            }

            // render product row
            let setHTML = `
                <tr>
                <td>
                    <a href="${data.image ?? "../assets/images/placeholder.jpg"}" target="_blank">
                    <img src="${data.image ?? "../assets/images/placeholder.jpg"}" alt="${data.name}" />
                    </a>
                </td>
                <td>${data.name}</td>
                <td class="text-center">${data.originalPrice}</td>
                <td class="text-center">${data.discountPrice}</td>
                <td>${data.updatedAt}</td>
                <td class="actions">
                    ${actionsHTML}
                </td>
                </tr>`;

            container.insertAdjacentHTML("beforeend", setHTML);
        });

        // Bind delete functionality

        bindDeleteButtons();
        showToast("success", "Data Fetched Successfully");
    } else {

        // set if not data found
        const setHTML = `<td colspan="6" style="text-align: center;">NO DATA</td>`;
        container.insertAdjacentHTML("beforeend", setHTML);
    }
}

// it contain event of acrion buttons 
function bindDeleteButtons() {

    const deleteButtons = document.querySelectorAll(".btn-danger");
    
    // this event will fire by click on delete button
    deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const encodedID = this.getAttribute("data-id");
            
            // if product listing page then it will redirect to product listing page
            if (allProducts) {
                // this will delete it temporary
                if (confirm("Are you sure you want to delete this product?") == true) {
                    product.deleteProduct(encodedID);
                    window.location.reload();
                }
            } else {
                // this will delete it permentaly
                if (confirm("Are you sure you want to delete this product permanent?") == true) {
                    product.deleteProduct(encodedID, true);
                    window.location.reload();
                }
            }
        });
    });

    // it will restore the products
    const restoreButtons = document.querySelectorAll(".btn-primary");
    restoreButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const encodedID = this.getAttribute("data-id");
            const product = new Product();

            if (confirm("Are you sure you want to restore this product?") == true) {
                product.deleteProduct(encodedID, false, true);
                window.location.reload();
            }
        });
    });
}
