import { showToast } from "./Toast.js";
import { Product } from "./Product.js";

//it will handle product view page
export function handleProductView() {

  const form = document.querySelector("#add-product");
  const urlParams = new URLSearchParams(window.location.search);
  const viewProduct = urlParams.get("id");
  const isEdit = urlParams.get("edit");
  const product = new Product();

  // if product id is theri it will get product details
  if (viewProduct) {
    const proData = product.getProduct(viewProduct);

    // if product fond it will display product details
    if (proData) {
      const proImage = document.querySelector("img");
      const proName = document.querySelector(".product-name");
      const proDetails = document.querySelector(".details-grid");
      const encodedID = btoa(proData.id);
      let proHTML = "";

      // render html
      proHTML += `
        <input type="hidden" value="${encodedID}" id="productId" />
        <div class="detail-title">Short Description:</div>
        <div class="detail-value">${proData.shortDescription}</div>
        <div class="detail-title">Description:</div>
        <div class="detail-value">${proData.description}</div>
        <div class="detail-title">Original Price:</div>
        <div class="detail-value">${proData.originalPrice}</div>
        <div class="detail-title">Discount Price:</div>
        <div class="detail-value">${proData.discountPrice}</div>
        <div class="detail-title">Deleted:</div>
        <div class="detail-value">${proData.isDeleted ? "Yes" : "No"}</div>
        <div class="detail-title">Updated At:</div>
        <div class="detail-value">${proData.updatedAt}</div>
        <div class="detail-title">Created At:</div>
        <div class="detail-value">${proData.createdAt}</div>`;

      proImage.src = proData.image;
      proImage.alt = proData.name;
      proName.append(proData.name);
      proDetails.insertAdjacentHTML("beforeend", proHTML);

    } else {

      showToast("danger", "Product not found");
      setTimeout(() => {
        window.history.back();
      }, 2000);
    }
  }

  let editBtn = document.querySelector("#editBtn");
  let deleteBtn = document.querySelector("#deleteBtn");

  // this button is use to edit or delete produc in view product
  if (editBtn || deleteBtn) {
    
    let productID = document.querySelector("#productId").value;

    // redurect to edit product page
    editBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = `/product/form.html?edit=${productID}`;
    });

    // it will delete the product PERMENEMTALY
    deleteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const encodedID = atob(document.querySelector("#productId").value);

      if (confirm("Are you sure you want to delete this product permanent?") == true) {
        product.deleteProduct(encodedID, true);
        window.location.href = "/product/index.html";
      }
    });
  }

  // cheeck if edit is their or not
  if (isEdit) {
    const title = document.querySelector("p");
    title.innerHTML = "Edit Product";

    //getting old data
    const oldData = product.getProduct(isEdit);

    // get input fields
    const name = form.querySelector("#name");
    const description = form.querySelector("#description");
    const shortDescription = form.querySelector("#shortDescription");
    const originalPrice = form.querySelector("#originalPrice");
    const discountPrice = form.querySelector("#discountPrice");
    const note = form.querySelector(".note");
    const imageGroup = form.querySelector(".image-group");
    const imageEdit = form.querySelector(".edit-image");

    // set details in input
    imageGroup.style.display = "block";
    imageEdit.src = oldData.image;
    note.style.display = "inline";
    name.value = oldData.name;
    description.value = oldData.description;
    shortDescription.value = oldData.shortDescription;
    originalPrice.value = oldData.originalPrice;
    discountPrice.value = oldData.discountPrice;
  }

  
  const addBtn = document.querySelector("#addBtn");

  // check if addBtn is their or not
  if (addBtn) {
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      // it will convert data in an Object from
      let data = Object.fromEntries(formData);

      // is "isEdit" is their it will update product else create new product
      let productResponse =
        isEdit != "" && isEdit != null
          ? product.setProduct(data, isEdit)
          : product.setProduct(data);

      // product added successfully else show error
      if (productResponse === true) {
        showToast("success", "Product Added Successfully");
        setTimeout(() => {
          window.location.href = "/product/index.html";
        }, 1000);
      } else {
        showToast("danger", "Some error has occurred");

        // showing error below input
        Object.entries(productResponse).forEach(([key, value]) => {
          let field = form.querySelector(".error_" + key);

          if (value !== true) {
            field.classList.add("error-message");
            field.style.color = "var(--danger)";
            field.innerText = value;
          } else {
            field.innerText = "";
          }
        });
      }
    });
  }
}
