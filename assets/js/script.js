import { showToast } from "./Modules/Toast.js";
import { Product } from "./Modules/Product.js";
import { Validate } from "./Modules/Validate.js";

let val = new Validate();
console.log(val);
// console.log(val.email('testest'));


let data = {
    "name": "new 32",
    "image": "../assets/uploads/img2.jpg",
    "originalPrice": 100,
    "discountPrice": 90,
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
            <div class="detail-value">${proData.description}
            </div>

            <div class="detail-title">Original Price:</div>
            <div class="detail-value">${proData.originalPrice}</div>

            <div class="detail-title">Discount Price:</div>
            <div class="detail-value">${proData.discountPrice}</div>`;

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
let addProduct = document.querySelector('#add-product')
console.log(addProduct);

const form = document.querySelector("#add-product")
console.log('form')
console.log(form)

if(addBtn || editBtn || deleteBtn){
    addBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const formData = new FormData(form)
        console.log("Object.fromEntries(formData)");
        console.log(Object.fromEntries(formData));

        console.log("formData")
        console.log(formData)
        console.log(formData.get('productName'))
        console.log(formData.entries())
        
        // for (const [key, value] of formData) {
        //     console.log(formData, key, value);
        // }
        

        console.log(product.setProduct(data));
        console.log('addBtn');
    });
    editBtn.addEventListener('click', function (e) {
        e.preventDefault();
        console.log(document.querySelector('#productId').value);
        console.log('edit');
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
            <a class="btn btn-warning"><i class="fa-regular fa-pen-to-square"></i></a>
            <button class="btn btn-danger" data-id="${data.id}"><i class="fa-regular fa-trash-can"></i></button>
        `;

        if (container == deletedProducts) {
            actionsHTML = `
            <a href="/product/view.html?id=${encodedID}" class="btn"><i class="fa-regular fa-eye"></i></a>
            <a class="btn"><i class="fa-solid fa-trash-arrow-up"></i></a>
            <a class="btn"><i class="fa-regular fa-trash-can"></i></a>`;
        }

        let setHTML = `
            <tr>
                <td>
                    <a href="/assets/uploads/img1.jpg" target="_blank">
                        <img src="/assets/uploads/img1.jpg" alt="${data.name}" />
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
            if(confirm("Are you sure you want to delete this product?") == true){
                product.deleteProduct(encodedID); 
                if (allProducts) renderProducts(productList.filter(x => !x.isDeleted), allProducts);
            }
        });
    });
};



if (allProducts) renderProducts(productList.filter(x => !x.isDeleted), allProducts);
if (deletedProducts) renderProducts(productList.filter(x => x.isDeleted), deletedProducts);


