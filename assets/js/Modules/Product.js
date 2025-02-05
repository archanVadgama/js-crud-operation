class Product {
    constructor() {
        // Retrieve product from localStorage (or initialize an empty array)
        this.product = JSON.parse(localStorage.getItem("product-data")) || [];
    }


    setProduct(data) {

        // Create a new product entry
        const newProductEntry = {
            id: (this.product.length > 0 ? this.product[this.product.length - 1].id + 1 : 1), // Get the last id or set to 1 if empty
            name: data.name,
            image: data.image,
            originalPrice: data.originalPrice,
            discountPrice: data.discountPrice,
            shortDescription: data.shortDescription,
            description: data.description,
            isDeleted: data.isDeleted ?? false,
            updatedAt: new Date().toLocaleString(),
            createdAt: new Date().toLocaleString()
        };

        // Append the new product entry to the existing product array
        this.product.push(newProductEntry);

        // Update localStorage with the new product list
        localStorage.setItem("product-data", JSON.stringify(this.product));
    }

    getProduct(id) {
        return id ? this.product.find(x => x.id == atob(id)) || null : this.product;
    }
    
    deleteProduct(productId) {
        console.log('inside delete', productId);
        
        let products = JSON.parse(localStorage.getItem('product-data'));
    
        if (!products) {
            console.log("No products found in local storage.");
            return;
        }
    
        let productIndex = products.findIndex(product => product.id == productId);
    
        if (productIndex === -1) {
            console.log(`Product with ID ${productId} not found.`);
            return;
        }
    
        products[productIndex].isDeleted = true;
        
        console.log(`Product with ID ${productId} has been marked as deleted.`);
    
        localStorage.setItem('product-data', JSON.stringify(products));
    }
    
    
}

// Export an instance of the class (Singleton pattern)
export {Product};
