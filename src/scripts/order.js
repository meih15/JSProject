const DRINK_SIZES = {
    //list of drink sizes
}

const TEA_CHOICES = {
    //list of teas
}

const TOPPING_CHOICES = {
    //list of toppings
}

class Order {
    constructor(drinkSize, tea, numToppings, numSeconds){
        this.drinkSize = drinkSize;
        this.tea = tea;
        this.numToppings = this.numToppings;
        this.order = [];
        this.numSeconds = this.numSeconds;

        this.generateOrder();
    }

    generateOrder() {
        //drink size be order[0]
        //drink tea be order[1]
        //array length changes based on how many toppings for the order
    }
}