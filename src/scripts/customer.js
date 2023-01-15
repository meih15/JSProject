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
    }

    generateCustomer() {
        let idx = Math.floor(Math.random() * 6);
        let img = document.createElement("image");
        img.src = NEW_CUSTOMER[idx];
    }
}