const { custom } = require("babel-loader");
//line got automatically added, what is this

const NEW_CUSTOMER = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: ""
}

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
        customerImage.classList.add("visual-effect-for-customer"); //shorten name later
        let customerContainer = document.getElementById("customer-container");
        customerContainer.appendChild(customerImage);
    }

    generateTextBox() {
        let textContainer = document.getElementById("text-container");
        let textBox = document.createElement("div");
        textBox.classList.add("text-box");
        textBox.classList.add("visual-effect");
        textContainer.appendChild(textBox);
    }
}