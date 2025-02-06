import { showToast } from "./Modules/Toast.js";
import { Product } from "./Modules/Product.js";
import { Validate } from "./Modules/Validate.js";

// let val = new Validate();
// console.log(val);
// console.log(val.email('testest'));


let data = {
    "name": "test 3",
    "image": "../assets/uploads/img2.jpg",
    "originalPrice": 600,
    "discountPrice": 400,
    "shortDescription": "Product1 short description",
    "description": "Product1 description",
    "isDeleted": false,
    "updatedAt": new Date().toLocaleString(),
    "createdAt": new Date().toLocaleString()
}

console.log(data);
let product = new Product()

// console.log(product.setProduct(data));
console.log('psdadsad');
console.log(product);
console.log("product.deleteProduct()");
// console.log(product.deleteProduct());
console.log(product.getProduct());


const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
const isEdit = urlParams.get('edit');

if(myParam){
    let proData = product.getProduct(myParam);

    if(proData){
        let proImage = document.querySelector('img')
        let proName = document.querySelector('.product-name')
        let proDetails = document.querySelector('.details-grid')
        let encodedID = btoa(proData.id);
        let proHTML = '';

        proHTML+=`
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

        proImage.src = proData.image
        proImage.alt = proData.name
        proName.append(proData.name)
        proDetails.insertAdjacentHTML("beforeend", proHTML)
    }else{
        showToast("danger" ,"Product not found");
        setTimeout(()=>{
            window.history.back()
        },2000)
    }
}

let addBtn = document.querySelector('#addBtn')
let editBtn = document.querySelector('#editBtn')
let deleteBtn = document.querySelector('#deleteBtn')

const form = document.querySelector("#add-product")
console.log('form')
console.log(form)

if(isEdit){
    let title = document.querySelector('p')
    title.innerHTML="Edit Product"

    let oldData = product.getProduct(isEdit)
    console.log("oldData");
    console.log(oldData);
    
    let name = form.querySelector('#name');
    let description = form.querySelector('#description');
    let shortDescription = form.querySelector('#shortDescription');
    let originalPrice = form.querySelector('#originalPrice');
    let discountPrice = form.querySelector('#discountPrice');
    let note = form.querySelector('.note');
    let imageGroup = form.querySelector('.image-group');
    let imageEdit = form.querySelector('.edit-image');

    imageGroup.style.display = 'block'
    imageEdit.src = oldData.image
    note.style.display = 'inline'
    name.value = oldData.name
    description.value = oldData.description
    shortDescription.value = oldData.shortDescription
    originalPrice.value = oldData.originalPrice
    discountPrice.value = oldData.discountPrice
}

if(addBtn){
    addBtn.addEventListener('click', function (e) {
        e.preventDefault();

    // console.log("product.setProduct(data)");
    // console.log(isEdit != '');
        
const formData = new FormData(form)
        let data = Object.fromEntries(formData);
        let productResponse = isEdit != '' ? product.setProduct(data, isEdit) : product.setProduct(data);

        console.log("productResponse");
        console.log(productResponse);
        if (productResponse === true) {
            showToast('success', "Product Added Successfully");
            setTimeout(() => {
                window.location.href="/product/index.html";
            }, 1000);
        } else {
            showToast('danger', "Some error has occurred");

            Object.entries(productResponse).forEach(([key, value]) => {
                let field = form.querySelector('.error_' + key);

                console.log(field);
                if (value !== true) {
                    field.classList.add('error-message'); 
                    field.style.color = 'var(--danger)';
                    field.innerText = value;
                } else {
                    field.innerText = '';
                }
            });
        }
    });
}
if(editBtn || deleteBtn){        
    let productID = document.querySelector('#productId').value;
    editBtn.addEventListener('click', function (e) {
        e.preventDefault();
        console.log();
        console.log('edit');
        window.location.href=`/product/form.html?edit=${productID}`
    });

    deleteBtn.addEventListener('click', function (e) {
        e.preventDefault();
        console.log(document.querySelector('#productId').value);
        console.log('delete');
    });
}

// console.log('url '+window.location.href);
// console.log(window.location.href.split('/').at(-1).split('.html'));
console.log(urlParams);
console.log(myParam);
let productList = product.getProduct();
let allProducts = document.querySelector(".all-product");
let deletedProducts = document.querySelector(".deleted-product");

const renderProducts = (products, container) => {
    if (!container) return;

    products.forEach(data => {
        let encodedID = btoa(data.id); // encode the product id
        let actionsHTML = `
            <a href="/product/view.html?id=${encodedID}" class="btn btn-success"><i class="fa-regular fa-eye"></i></a>
            <a href="/product/form.html?edit=${encodedID}" class="btn btn-warning"><i class="fa-regular fa-pen-to-square"></i></a>
            <button class="btn btn-danger" data-id="${data.id}"><i class="fa-regular fa-trash-can"></i></button>
        `;

        if (container == deletedProducts) {
            actionsHTML = `
            <button class="btn btn-primary" data-id="${data.id}"><i class="fa-solid fa-reply"></i></button>
            <a href="/product/view.html?id=${encodedID}" class="btn btn-success"><i class="fa-regular fa-eye"></i></a>
            <button class="btn btn-danger" data-id="${data.id}"><i class="fa-regular fa-trash-can"></i></button>`;
        }

        let setHTML = `
            <tr>
                <td>
                    <a href="${data.image ?? "../uploads/placeholder.jpg"}" target="_blank">
                        <img src="${data.image ?? "../uploads/placeholder.jpg"}" alt="${data.name}" />
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

    showToast('success', 'Data Fetched Successfully');
};

const bindDeleteButtons = () => {
    // Find all delete buttons and add event listeners
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const encodedID = this.getAttribute('data-id');
            if (allProducts){
                if(confirm("Are you sure you want to delete this product?") == true){
                    if(product.deleteProduct(encodedID)){
                        window.location.reload();
                    }
                }
            }else{
                if(confirm("Are you sure you want to delete this product permanent?") == true){
                    if(product.deleteProduct(encodedID, true)){
                        window.location.reload();
                    } 
                }
            }
        });
    });
   
    const restoreButtons = document.querySelectorAll('.btn-primary');
    restoreButtons.forEach(button => {
        button.addEventListener('click', function () {
            const encodedID = this.getAttribute('data-id');
            if(confirm("Are you sure you want to restore this product?") == true){
                if(product.deleteProduct(encodedID, false, true)){
                    window.location.reload();
                }
            }
        });
    });
};



if (allProducts) renderProducts(productList.filter(x => !x.isDeleted), allProducts);
if (deletedProducts) renderProducts(productList.filter(x => x.isDeleted), deletedProducts);

let sortFilter = document.querySelector('#sortFilter')
let sortRestoreFilter = document.querySelector('#sortRestoreFilter')
let sortFilterOptions = sortFilter || sortRestoreFilter 
if(sortFilterOptions){
    sortFilterOptions.addEventListener('change', function(){
        let sortedData = product.sortProduct(this.value, sortFilterOptions == sortFilter ? true : false);
        
        if (allProducts) allProducts.innerHTML=""
        if (deletedProducts) deletedProducts.innerHTML=""
        
        renderProducts(sortedData, allProducts || deletedProducts)
    })
}

