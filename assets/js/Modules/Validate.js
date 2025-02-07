class Validate {

    // Check if the value is empty or not
    checkEmpty(value) {
        if (value === null || value === "" || value === undefined) {
            const errorMessage = "This field is required";
            return errorMessage;
        }
        return true;
    }

    // Check the proudct lenght
    productLength(value) {
        const MIN_LENGTH = 3;
        const MAX_LENGTH = 20;

        const emptyCheck = this.checkEmpty(value);
        if (emptyCheck !== true) {
            return emptyCheck; 
        }

        if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
            return `Product name must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`;
        }

        return true;
    }

    // Check the price length
    priceLength(value) {
        const MIN_LENGTH = 1;
        const MAX_LENGTH = 7;
        
        const emptyCheck = this.checkEmpty(value);
        if (emptyCheck !== true) {
            return emptyCheck; 
        }
        
        if (value < MIN_LENGTH || value.length > MAX_LENGTH) {
            return `Price must be between ${MIN_LENGTH} and ${MAX_LENGTH}.`;
        }

        return true;
    }

    // checek image validation
    imageValidation(value) {
        const validFormats = ["image/png", "image/jpeg", "image/jpg"];
        const MAX_LENGTHSize = 2 * 1024 * 1024;

        const emptyCheck = this.checkEmpty(value);
        if (emptyCheck !== true) {
            return emptyCheck; 
        }
        
        // chec if image is selected or not
        if (value.name == '') {
            return "Please select an image.";
        }

        // it wil chek the file format
        if (!validFormats.includes(value.type)) {
            return "Invalid file format. Only PNG, JPG and JPEG are allowed.";
        }
        
        // check the file size
        if (value.size > MAX_LENGTHSize) {
            return "File size should not be greater than 2MB.";
        }
        
        return true;
    }

    // cjheck the length of description
    descriptionLength(value) {
        const MIN_LENGTH = 10;
        const MAX_LENGTH = 100;

        const emptyCheck = this.checkEmpty(value);
        if (emptyCheck !== true) {
            return emptyCheck; 
        }

        if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
            return `Description must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`;
        }

        return true;
    }

    // cjheck the length of short description
    shortDescriptionLength(value) {
        const MIN_LENGTH = 10;
        const MAX_LENGTH = 30;

        const emptyCheck = this.checkEmpty(value);
        if (emptyCheck !== true) {
            return emptyCheck; 
        }

        if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
            return `Short description must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`;
        }
        
        return true;
    }
}

export { Validate };
