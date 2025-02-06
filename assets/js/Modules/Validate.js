import { showToast } from "./Toast.js";

class Validate {
    // constructor(value) {
    //     this.name = this.productLength(value.name);
    //     this.image = this.imageValidation(value.image);
    //     this.originalPrice = this.priceLength(value.originalPrice);
    //     this.discountPrice = this.priceLength(value.discountPrice);
    //     this.description = this.descriptionLength(value.description);
    //     this.shortDescription = this.shortDescriptionLength(value.shortDescription);
    // }

    checkEmpty(value) {
        if (value === null || value === "" || value === undefined) {
            const errorMessage = "This field is required";
            // showToast("danger", errorMessage);
            return errorMessage;
        }
        return true;
    }

    productLength(value) {
        const min = 3;
        const max = 20;

        const emptyCheck = this.checkEmpty(value);
        if (emptyCheck !== true) {
            return emptyCheck; 
        }


        if (value.length < min || value.length > max) {
            return `Product name must be between ${min} and ${max} characters.`;
        }

        return true;
    }

    priceLength(value) {
        const min = 1;
        const max = 7;
        
        const emptyCheck = this.checkEmpty(value);
        if (emptyCheck !== true) {
            return emptyCheck; 
        }
        
        if (value < min || value.length > max) {
            return `Price must be between ${min} and ${max}.`;
        }
        return true;
    }
    
    imageValidation(value) {
        const validFormats = ["image/png", "image/jpeg", "image/jpg"];
        const maxSize = 5 * 1024 * 1024;

        const emptyCheck = this.checkEmpty(value);
        if (emptyCheck !== true) {
            return emptyCheck; 
        }
        
        if (value.name == '') {
            // showToast("danger", "File size should not be greater than 5MB.");
            return "Please select an image.";
            throw new Error("Please select an image.");
        }
        if (!validFormats.includes(value.type)) {
            // showToast("danger","Invalid file format. Only PNG, JPG and JPEG are allowed.");
            return "Invalid file format. Only PNG, JPG and JPEG are allowed.";
            throw new Error(
                "Invalid file format. Only PNG, JPG and JPEG are allowed."
            );
        }
        if (value.size > maxSize) {
            // showToast("danger", "File size should not be greater than 5MB.");
            return "File size should not be greater than 5MB.";
            throw new Error("File size should not be greater than 5MB.");
        }
        return true;
    }

    descriptionLength(value) {
        const min = 10;
        const max = 100;

        const emptyCheck = this.checkEmpty(value);
        if (emptyCheck !== true) {
            return emptyCheck; 
        }

        if (value.length < min || value.length > max) {
            return `Description must be between ${min} and ${max} characters.`;
        }
        return true;
    }

    shortDescriptionLength(value) {
        const min = 10;
        const max = 30;

        const emptyCheck = this.checkEmpty(value);
        if (emptyCheck !== true) {
            return emptyCheck; 
        }

        if (value.length < min || value.length > max) {
            return `Short description must be between ${min} and ${max} characters.`;
        }
        return true;
    }
}

export { Validate };
