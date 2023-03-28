import { NEW_CUSTOMER } from "./constants";

class Customer {
    constructor () {
        this.generateCustomer();
        this.generateTextBox();
    }

    generateCustomer() {
        let idx = Math.floor(Math.random() * 6);
        let customerImage = document.createElement("img");
        customerImage.src = NEW_CUSTOMER[idx];
        customerImage.alt = "customer-image";
        customerImage.classList.add("customer-in")
        let customerContainer = document.getElementById("customer-container");
        customerContainer.appendChild(customerImage);
    }

    generateTextBox() {
        let textContainer = document.getElementById("text-container");
        let textBox = document.createElement("div");
        textBox.classList.add("text-box");
        textBox.classList.add("text-in")
        textContainer.appendChild(textBox);
    }
}

export default Customer;