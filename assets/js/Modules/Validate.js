import { showToast } from "./Toast.js";

class Validate {

    checkEmpty(value){
        console.log('asdasdias '+value);
        if (value === null || value === '' || value === undefined) {
            showToast("danger","Value cannot be null or empty.")
            throw new Error("Value cannot be null or empty.");
        }
    }

    email(value) {
        console.log('testtestse');
        console.log(this.checkEmpty(value));
console.log('testtestse');
        const rules = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!rules.test(value)) {
            showToast("danger","Invalid email format.")
            throw new Error("Invalid email format.");
        }
        return true; // If validation passes
    }
}

export { Validate };
