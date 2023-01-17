import { DRINK_SIZES, MILK_TEA_CHOICES, TOPPING_CHOICES} from "../styles/constants";

class Order {
    constructor(numSeconds) {
        this.numSeconds = numSeconds;
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

    generateOrderElement(id) {
        let img = document.createElement("img");

        const drinkSizes = Object.keys(DRINK_SIZES);
        const milkTeas = Object.keys(MILK_TEA_CHOICES);
        const toppings = Object.keys(TOPPING_CHOICES);

        if (drinkSizes.includes(id)) {
            img.src = DRINK_SIZES[id];
        } else if (milkTeas.includes(id)) {
            img.src = MILK_TEA_CHOICES[id];
        } else if (toppings.includes(id)) {
            img.src = TOPPING_CHOICES[id];
        };

        img.alt = `${id}-image`;
        return img;
    }

    renderOrder() {
        let orderBox = document.createElement('div');
        orderBox.classList.add('order-box');

        this.order.forEach(ele => {
            let orderElement = document.createElement('div');
            orderElement.classList.add('order-element');
            orderElement.appendChild(this.generateOrderElement(item));
            orderBox.appendChild(orderElement);

            let textContainer = document.getElementById("text-container");
            textContainer.appendChild(orderBox);
        })
    }

    deleteOrder() {
        document.getElementById("customer-container").innerHTML = '';
        document.getElementById("text-container").innerHTML = '';
    }

    generateBoba() {
        let bobaContainer = document.getElementById('boba-container');
        let boba = document.createElement('div');
        boba.id = 'boba';

        for (let i = 0; i < this.order.length; i++ ) {
            let bobaElement = document.createElement("div");
            bobaElement.classList.add('boba-element');
            bobaElement.classList.add(`${i}`);
            boba.appendChild(bobaElement);
        }

        bobaContainer.appendChild(boba);
    }

    deleteBoba(){
        document.getElementById('boba-container').innerHTML = '';
    }

    addItem(item) {
        this.boba.push(item);
        this.renderBoba();
    }

    removeItem() {
        this.boba.pop();
        this.renderBoba();
    }

    renderBoba() {
        for (let i = 0; i < this.boba.length; i++) {
            let bobaEle = document.querySelector(`.boba-element.${i}`);
            bobaEle.innerHTML = '';
            let element = this.boba[i];
            if (!element) break;
            let image = document.createElement('img');
            
            const drinkSizes = Object.keys(DRINK_SIZES);
            const milkTeas = Object.keys(MILK_TEA_CHOICES);
            const toppings = Object.keys(TOPPING_CHOICES);

            if (drinkSizes.includes(element)) {
                image.src = DRINK_SIZES[element];
            } else if (milkTeas.includes(element)) {
                image.src = MILK_TEA_CHOICES[element];
            } else if (toppings.includes(element)) {
                image.src = TOPPING_CHOICES[element];
            };

            image.alt = `${item}-image`;
            bobaEle.appendChild(image);
        }
    }
}

export default Order;
//can DRY code 