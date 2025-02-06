import { showToast } from "./Toast.js";
import { Validate } from "./Validate.js";

class Product {
    constructor() {
        // Retrieve product from localStorage (or initialize an empty array)
        this.product = JSON.parse(localStorage.getItem("product-data")) || [];
    }


    setProduct(data, editID) {
        console.log("data, editID:");
        console.log(data, editID);
    
        const validate = new Validate(); 
        const checkError = {
            "name" : validate.productLength(data.name),
            "image" : editID ? true : validate.imageValidation(data.image),  // Only validate image if no editID
            "originalPrice" : validate.priceLength(data.originalPrice),
            "discountPrice" : validate.priceLength(data.discountPrice),
            "description" : validate.descriptionLength(data.description),
            "shortDescription" : validate.shortDescriptionLength(data.shortDescription),
        };
    
        let errorFlag = 0;
        for (const key in checkError) {
            if (checkError[key] !== true) {
                errorFlag++;
            }
        }
    
        console.log("Number of errors:", errorFlag);
        console.log("after checking error");
        console.log(checkError, errorFlag);
    
        if (errorFlag === 0) {
            const setImage = new FileReader();
            console.log("inside asdddddddddddddddeditID");
            console.log(setImage);
    
            setImage.onloadend = () => {
                console.log("inside editI23423423423ddddddd");
    
                if (editID !== '') {
                    console.log("inside editID", editID);
                    
                    
                    const productIndex = this.getProduct(editID); // Directly find the index
                    console.log("productIndex", productIndex);
                    
                    if (productIndex !== -1) {
                         
                        productIndex.name = data.name;
                        productIndex.image = data.image ? setImage.result  : productIndex.image ?? null; // Keep existing image if no new one
                        productIndex.originalPrice = data.originalPrice;
                        productIndex.discountPrice = data.discountPrice;
                        productIndex.shortDescription = data.shortDescription;
                        productIndex.description = data.description;
                        productIndex.isDeleted = data.isDeleted ?? false;
                        productIndex.updatedAt = new Date().toLocaleString();
                        console.log("product updated");
                        console.log(productIndex);
                    }
                } else {
                    console.log("outside editID");
    
                    
                    const newProductEntry = {
                        id: this.product.length > 0 ? this.product[this.product.length - 1].id + 1 : 1,
                        name: data.name,
                        image: setImage.result ?? null, 
                        originalPrice: data.originalPrice,
                        discountPrice: data.discountPrice,
                        shortDescription: data.shortDescription,
                        description: data.description,
                        isDeleted: data.isDeleted ?? false,
                        updatedAt: new Date().toLocaleString(),
                        createdAt: new Date().toLocaleString(),
                    };
    
                    this.product.push(newProductEntry);
                }
    
                console.log(this.product);

                localStorage.setItem("product-data", JSON.stringify(this.product));
            };
    
            if (!editID && data.image) {
                console.log("inside editIDddddddddddddd");
                setImage.readAsDataURL(data.image);
            } else if (editID && data.image) {

                setImage.readAsDataURL(data.image);
            }
    
            return true;
        } else {
            return checkError;
        }
    }
    
    

    getProduct(id) {
        return id ? this.product.find(x => x.id == atob(id)) || null : this.product;
    }
    
    deleteProduct(productId, hardDelete = false, isRestore = false) {

        let products = this.getProduct();
    
        if (!products) {
            showToast("danger", "No products found in local storage.");
            console.log("No products found in local storage.");
            return false;
        }
    
        let productIndex = products.findIndex(product => product.id == productId);
    
        if (productIndex === -1) {
            showToast("danger", "Product Not Found");
            console.log(`Product with ID ${productId} not found.`);
            return false;
        }

        if(hardDelete){
            products.splice(productIndex ,1)
        }else{
            products[productIndex].isDeleted = true;
        }
        
        if(isRestore){
            products[productIndex].isDeleted = false;
        }
       
        localStorage.setItem('product-data', JSON.stringify(products));
    }

    sortProduct(type, showDeleted) {
        console.log(showDeleted);
        let products = showDeleted ? this.getProduct().filter(x => !x.isDeleted) : this.getProduct().filter(x => x.isDeleted == true);
        
        console.log(products);
        if (!products || !Array.isArray(products)) {
            showToast("danger", "No products found or invalid data format.");
            console.log("No products found or invalid data format.");
            return [];
        }
    
        switch (type) {
            case 'highToLow':
                return products.sort((a, b) => b.originalPrice - a.originalPrice);
    
            case 'lowToHigh':
                return products.sort((a, b) => a.originalPrice - b.originalPrice);
    
            case 'ascending':
                return products.sort((a, b) => a.name.localeCompare(b.name));
    
            case 'descending':
                return products.sort((a, b) => b.name.localeCompare(a.name));
    
            default:
                console.log("Invalid sort type.");
                return false; // Return original list if invalid type
        }
    }    
}

// Export an instance of the class (Singleton pattern)
export {Product};
