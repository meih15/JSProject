const DRINK_SIZES = {
    //list of drink sizes
    "small": "",
    "medium": "",
    "large": ""
};

const MILK_TEA_CHOICES = {
    //list of teas
    "oolong": "",
    "earl-gray": "",
    "matcha": "",
    "taro": "",
    "tiramisu": "",
    "jasmine": ""
};

const TOPPING_CHOICES = {
    //list of toppings
    "tapioca": "",
    "aloe": "",
    "rainbow-jelly": "",
    "pudding": "",
    "herbal-jelly": "",
    "red-bean": "",
};


class Order {
    constructor() {
        this.order = [];
        this.numToppings = Math.floor(Math.random() * 5);
        this.boba = [];

        this.generateOrder();
        this.generateBoba();
    }

    generateOrder() {
        //drink size be order[0]
        //drink tea be order[1]
        //array length changes based on how many toppings for the order

        let sizePicked = Object.keys(DRINK_SIZES);
        let teaPicked = Object.keys(MILK_TEA_CHOICES);
        let toppingsPicked = Object.keys(TOPPING_CHOICES);

        function getRandomIdx(max) {
            return Math.floor(Math.random() * max);
        };

        let chosenSize = getRandomIdx(sizePicked.length);
        this.order.push(sizePicked[chosenSize]);

        let chosenTea = getRandomIdx(teaPicked.length);
        this.order.push(teaPicked[chosenTea]);

        //let numToppings = getRandomIdx(5)
        for (let i = 0; i < this.numToppings; i++) {
            let chosenToppings = getRandomIdx(toppingsPicked.length);
            this.order.push(toppingsPicked[chosenToppings]);
        }

        this.renderOrder();
    }

    renderOrder() {
        
    }

    deleteOrder() {
        document.getElementById("customer-container").innerHTML = '';
        document.getElementById("text-container").innerHTML = '';
    }

    generateBoba() {

    }

    deleteBoba(){}

    addItem(item) {
        this.boba.push(item);
        this.renderBoba();
    }

    removeItem() {
        this.boba.pop();
        this.renderBoba();
    }

    renderBoba() {

    }
}