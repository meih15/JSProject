import { DRINK_SIZES, MILK_TEA_CHOICES, TOPPING_CHOICES} from "./constants";

class View {

    static renderOrder(obj) {
        let textContainer = document.getElementById("text-container");
        textContainer.innerHTML = ""; 
        
        let group1 = document.createElement('div');
        group1.classList.add('group-1');
        textContainer.appendChild(group1);

        let group2 = document.createElement('div');
        group2.classList.add('group-2');
        textContainer.appendChild(group2);

        let group3 = document.createElement('div');
        group3.classList.add('group-3');
        textContainer.appendChild(group3);

        obj.order.forEach((ele, index) => {
            let orderBox = document.createElement('div');
            orderBox.classList.add('order-box');

            let orderElement = document.createElement('div');
            orderElement.classList.add('order-element');
            orderElement.appendChild(obj.generateOrderElement(ele));
            orderBox.appendChild(orderElement);

            if (index === 0) {
                group1.appendChild(orderBox);
            } else if (index === 1) {
                group2.appendChild(orderBox);
            } else {
                group3.appendChild(orderBox);
            }
        });

        if (obj.order.length === 2) {
            textContainer.classList.add('two-elements');
        } else if (obj.order.length === 3) {
            textContainer.classList.add('three-elements');
        } else if (obj.order.length === 4) {
            textContainer.classList.add('four-elements');
        } else if (obj.order.length === 5) {
            textContainer.classList.add('five-elements');
        } else {
            textContainer.classList.add('six-elements');
        }
    }


    static renderBoba(boba) {
        

        for (let i = 0; i < boba.length; i++) {
            let bobaEle = document.querySelector(`.boba-element-${i}`);
            bobaEle.innerHTML = '';
            let element = boba[i];
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
            
            image.alt = `${element}-image`;
            bobaEle.appendChild(image);
        }
    }

    static renderTimer(count) {
        let timer = document.querySelector('#timer');
        if (!timer) {
            timer = document.createElement('div');
            timer.id = 'timer';
            timer.innerHTML = count;
            document.querySelector('#timer-container').appendChild(timer);
        }
    }

    static renderScore(score) {
        let totalScore = document.querySelector('#score')
        if (score > 1 || score === 0) {
            totalScore.innerHTML = `${score} orders`;
        } else {
            totalScore.innerHTML = `${score} order`;
        }
    }

    static renderLostCustomers(numLostCustomers) {
        const customerLost = document.getElementById('lost-customer');
        customerLost.innerHTML = "";

        const numSolidHearts = 3 - numLostCustomers;
            for (let i = 1; i <= numSolidHearts; i++) {
                const loss = document.createElement('i');
                loss.className = "fa-solid fa-heart";
                customerLost.appendChild(loss);
            }
        

            for (let i = 1; i <= numLostCustomers; i++) {
                const loss = document.createElement('i');
                loss.className = "fa-regular fa-heart";
                customerLost.appendChild(loss);
            }
    }


    static renderGameOverMessage(totalScore) {
        const score = totalScore;
        
        let msg = document.querySelector('.message');
        if (score > 1 || score === 0) {
            msg.innerHTML = `You served ${score} customers!`;
        } else {
            msg.innerHTML = `You served ${score} customer!`;
        }
        document.querySelector('#modal').classList.remove('hidden');
    }


}

export default View;
