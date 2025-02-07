import { showToast } from "./Toast.js";
import { Validate } from "./Validate.js";

class Product {
    constructor() {

        // retrieve product from localStorage (or initialize an empty array)
        this.product = JSON.parse(localStorage.getItem("product-data")) || [];
    }

    /**
     *  sets or updates a product 
     *  if an `editID` is provided, the product will be updated else a new product will be created.
     *
     * @param {object} data - This object should contain necessary all fields
     * @param {string | boolean} [editID=false] - if editID is provide then specific product will be updated 
     *                                             If not editID not provided, a new product will be created.
     * 
     * @returns {void} - This method does not return a value.
     */
    setProduct(data, editID = false){
        
        // this vill to create an instance for product valudation
        const validate = new Validate(); 
        
        // here all filed will be validated 
        // if their is error then it return error else it will return true (no error)
        const checkError = {
            "name" : validate.productLength(data.name),
            "image" : editID ? true : validate.imageValidation(data.image),  // Only validate image if no editID
            "originalPrice" : validate.priceLength(data.originalPrice),
            "discountPrice" : validate.priceLength(data.discountPrice),
            "description" : validate.descriptionLength(data.description),
            "shortDescription" : validate.shortDescriptionLength(data.shortDescription),
        };
    
        // check if their is an error or not if error is their then flag increament by one
        let errorFlag = 0;
        for (const key in checkError) {
            if (checkError[key] !== true) {
                errorFlag++;
            }
        }
    
        // if the data is valid and does not contain any error then it will process else the error will be return
        if (errorFlag === 0) {
            //this will read image from input field
            const setImage = new FileReader();
    
            // this will read image and then it will be converted into base64 format
            setImage.onloadend = () => {
    
                // it will chekc prodyuct is edit or not if edit then it will update else it will create new product
                if (editID) {
                    const productIndex = this.getProduct(editID); 
                    
                    if (productIndex !== -1) {
                         
                        productIndex.name = data.name;

                        /**
                         * Updates the product image if the new image is valid. 
                         * If the image data is null or invalid, the current image is retained or set to `nulls`.
                         */
                        productIndex.image = data.image != null ? (setImage.result == "data:application/octet-stream;base64," ? productIndex.image : setImage.result ): productIndex.image ?? nulls; 
                        
                        productIndex.originalPrice = data.originalPrice;
                        productIndex.discountPrice = data.discountPrice;
                        productIndex.shortDescription = data.shortDescription;
                        productIndex.description = data.description;
                        productIndex.isDeleted = data.isDeleted ?? false;
                        productIndex.updatedAt = new Date().toLocaleString();
                    }
                } else {
                    const newProductEntry = {
                        id: this.product.length > 0 ? this.product[this.product.length - 1].id + 1 : 1, // it will assign id to new product
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
    
                // it will add product to locatl storage
                localStorage.setItem("product-data", JSON.stringify(this.product));
            };
    
            // reads the image as a data URL if an image is provided, regardless of editID.
            if (!editID && data.image) {
                setImage.readAsDataURL(data.image);
            } else if (editID && data.image) {
                setImage.readAsDataURL(data.image);
            }
    
            return true;
        } else {

            // return all error
            return checkError;
        }
    }
    
    // it will get all product if "id" is provided then speicif product will be returned
    getProduct(id) {
        return id ? this.product.find(x => x.id == atob(id)) || null : this.product;
    }
    
    // "productID" => is requeired to delete the specific product by default it will provide SOFTDELETE
    // "hardDelete" => if its true then it will delete the product from local storage else not
    // "isRestore" => true - it will restore the product 
    deleteProduct(productId, hardDelete = false, isRestore = false) {
        
        //get all products
        let products = this.getProduct();
    
        if (!products) {
            showToast("danger", "No products found in local storage.");
            return false;
        }
    
        // get the index fo that product
        let productIndex = products.findIndex(product => product.id == productId);
    
        if (productIndex === -1) {
            showToast("danger", "Product Not Found");
            return false;
        }

        
        if(hardDelete){
            // it will delete product from local storage
            products.splice(productIndex ,1)
        }else{
            // it will cahnge statue of product but dont delete it from local storage
            products[productIndex].isDeleted = true;
        }
        
        //it will restore product by change its status
        if(isRestore){
            products[productIndex].isDeleted = false;
        }
       
        // it will add produc tot locatl storage
        localStorage.setItem('product-data', JSON.stringify(products));
    }

    // it will used to sort the product based on type and deleted status
    sortProduct(type, showDeleted) {

        // it will get all product based on "showDeleted"
        let products = showDeleted ? this.getProduct().filter(x => !x.isDeleted) : this.getProduct().filter(x => x.isDeleted == true);
        
        if (!products || !Array.isArray(products)) {
            showToast("danger", "No products found or invalid data format.");
            return [];
        }
    
        // it will perform case based on sort "type"
        switch (type) {
            case 'all':
                return products;
            case 'highToLow':
                return products.sort((a, b) => b.originalPrice - a.originalPrice);
    
            case 'lowToHigh':
                return products.sort((a, b) => a.originalPrice - b.originalPrice);
    
            case 'ascending':
                return products.sort((a, b) => a.name.localeCompare(b.name));
    
            case 'descending':
                return products.sort((a, b) => b.name.localeCompare(a.name));
    
            default:
                showToast('danger', "Invalid sort type.")
                return false; // it will return original list if invalid type
        }
    }    
}

// Export an instance of the class (Singleton pattern)
export {Product};
