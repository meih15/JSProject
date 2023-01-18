import Menu from "./menu";
import Customer from "./customer";
import Order from "./order";
import Timer from "./timer";
import View from "./view";
import { KEY_MAP } from "./constants";

class Game {
    constructor() {
        this.menu = new Menu();
        this.customer = new Customer();
        this.order = new Order(numSeconds);
        this.timer = new Timer(this.order.numSeconds, this.roundStatus.bind(this));

        this.totalScore = 0;
        this.customerLost = 0;
        this.numCustomer = 0;
    
        this.gameStart = this.gameStart.bind(this);
        this.addEventListeneronWindow = this.addEventListeneronWindow.bind(this);
        this.removeListenerOnWindow = this.removeListenerOnWindow.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClickonMenuElements = this.handleClickonMenuElements.bind(this);
        this.handleClickonRemoveButton = this.handleClickonRemove(this);
        this.checkTotalCustomers = this.checkTotalCustomers.bind(this);
        this.gameStart = this.gameStart.bind(this);

        this.renderScore();
    }

    gameStart() {
        this.addEventListenerOnWindow();
        this.handleClickonMenuElements();
        this.handleClickonRemoveButton();
        this.startTimer();
    }

    checkTotalCustomers() {
        return this.numCustomer
    }

    roundDifficulty () {
        if (this.checkTotalCustomers() >= 0) {
            return new Order(20);
        } else if (this.checkTotalCustomers() >= 5) {
            return new Order(15);
        } else if (this.checkTotalCustomers() >= 10) {
            return new Order(10);
        } else if (this.checkTotalCustomers() >= 15) {
            return new Order(8);
        } else if (this.checkTotalCustomers() >= 25) {
            return new Order(6);
        } else if (this.checkTotalCustomers() >= 40) {
            return new Order(8);
        } else if (this.checkTotalCustomers() >= 60) {
            return new Order(6);
        } else if (this.checkTotalCustomers() >= 80) {
            return new Order(4);
        } else if (this.checkTotalCustomers() >= 100) {
            return new Order(2);
        }
    }


    handleKeyPress(event) {
        let key = event.key;
        if (key === 'Backspace') {
            this.boba.removeItem();
            return;
        }

        let elementId = KEY_MAP[key];
        if (!elementId) return;

        let element = document.getElementById(elementId);
        if (!element) return;

        //element.classList.add('hover') add effect
        this.boba.addItem(elementId);
        this.roundStatus();
    }

    handleRemoveKeyPress(event) {
        let key = event.key;
        let elementId = KEY_MAP[key];
        if (!elementId) return;

        let element = document.getElementById(elementId);
        if (!element) return;

        //element.classList.remove('hover') add effect
    }

    addEventListeneronWindow() {
        window.addEventListener('keydown', this.handleKeyPress);
        window.addEventListener('keyup', this.handleRemoveKeyPress);
    }

    removeListenerOnWindow() {
        window.removeEventListener('keydown', this.handleKeyPress);
        window.removeEventListener('keyup', this.handleRemoveKeyPress);
    }

    handleClickonMenuElements() {
        let menuCupSize = Array.from(document.querySelectorAll('.cup-size'));
        menuCupSize.forEach(item => {
            item.addEventListener('click', () => {
                this.boba.addItem(item.id);
                this.roundStatus();
            })
        })

        let menuTeas = Array.from(document.querySelectorAll('.tea-choice'));
        menuTeas.forEach(item => {
            item.addEventListener('click', () => {
                this.boba.addItem(item.id);
                this.roundStatus();
            })
        })

        let menuToppings = Array.from(document.querySelectorAll('.topping-choice'));
        menuToppings.forEach(item => {
            item.addEventListener('click', () => {
                this.boba.addItem(item.id);
                this.roundStatus();
            })
        })
    }

    handleClickonRemoveButton() {
        let button = document.querySelector('#remove-button');
        button.addEventListener('click', () => {
            this.boba.removeItem();
            this.roundStatus();
        })
    }

    timerStart() {
        this.timer.start();
        View.renderTimer(this.timer.count);
    }

    roundStatus() {
        if (this.gameOver()) {
            this.renderGameOverMessage();
            return;
        }

        if (this.timer.count > 0 && this.correctBoba()) {
            this.score += 1;
            this.numCustomer += 1;
            this.renderScore();

            this.resetGameRound();
            this.newGameRound();

        } else if (this.timer === 0 && !this.correctBoba()) {
            this.customerLost -= 1;
            if (this.gameOver()){
                this.renderGameOverMessage();
                this.timer.stop();
                return;
            }
            this.resetGameRound();
            this.newGameRound();
        }
    }

    resetGameRound() {
        this.order.deleteBoba();
        //remove customer by takign away classList(visual effect) and adding new one
        this.order.deleteOrder();
        this.timer.stop();
        this.timer.removeTimer();
    }

    newGameRound() {
        this.order = this.roundDifficulty();
        this.timer = new Timer(this.order.numSeconds, this.roundStatus.bind(this));
        this.startTimer();
    }

    correctBoba() {
        let isCorrect = true;
        this.order.order.forEach((item, idx) => {
            if(this.order.boba[idx] !== item) {
                isCorrect = false;
            }
        })
        return isCorrect;
    }


    gameOver() {
        return this.customerLost >= 3;
    }

    restart() {
        document.querySelector('#customer-lost').innerHTML = '';
        document.querySelector('#score').innerHTML = '';
        document.querySelector('#timer-container').innerHTML = '';
        this.order.deleteOrder();
        this.order.deleteBoba();
        this.score = 0;
        this.customerLost = 0;
        this.numCustomer = 0;
        this.renderScore();

        this.querySelector('#modal').classList.add('hidden');
        this.addEventListenerWindow();
        this.newGameRound();
    }

    renderScore() {
        View.renderScore();
    }

    renderCustomerLost () {
        View.renderLostCustomers(this.customerLost);
    }

    renderGameOverMessage() {
        View.renderGameOverMessage(this.score);
    }
}

export default Game;