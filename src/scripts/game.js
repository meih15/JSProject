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
        this.numSeconds = 2;
        this.order = new Order(this.numSeconds);
        this.timer = new Timer(this.order.numSeconds, this.roundStatus.bind(this));

    
        this.totalScore = 0;
        this.customerLost = 0;
        this.numCustomer = 0;
    
        this.gameStart = this.gameStart.bind(this);

        this.removeListenerOnWindow = this.removeListenerOnWindow.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClickonMenuElements = this.handleClickonMenuElements.bind(this);
        this.handleClickonRemoveButton = this.handleClickonRemoveButton.bind(this);
        this.checkTotalCustomers = this.checkTotalCustomers.bind(this);
        this.gameStart = this.gameStart.bind(this);

        this.renderScore();

        addEventListener('keydown', this.handleKeyPress);
        addEventListener('keyup', this.handleRemoveKeyPress);
    }

    gameStart() {
        this.handleClickonMenuElements();
        this.handleClickonRemoveButton();
        this.timerStart();
    }

    checkTotalCustomers() {
        return this.numCustomer
    }

    roundDifficulty () {
        this.order = null;
        if (this.checkTotalCustomers() >= 0) {
            this.numSeconds = 20
        } else if (this.checkTotalCustomers() >= 5) {
            this.numSeconds = 15
        } else if (this.checkTotalCustomers() >= 10) {
            this.numSeconds = 10
        } else if (this.checkTotalCustomers() >= 15) {
            this.numSeconds = 8
        } else if (this.checkTotalCustomers() >= 25) {
            this.numSeconds = 6
        } else if (this.checkTotalCustomers() >= 40) {
            this.numSeconds = 5
        } else if (this.checkTotalCustomers() >= 60) {
            this.numSeconds = 4
        } else if (this.checkTotalCustomers() >= 80) {
            this.numSeconds = 3
        } else if (this.checkTotalCustomers() >= 100) {
            this.numSeconds = 2
        }
        return new Order(this.numSeconds);
    }


    handleKeyPress(event) {
        event.preventDefault();
        if (event.code === "Backspace") {
            this.order.removeItem();
            return;
        }

        let elementId = KEY_MAP[event.code];
        if (!elementId) return;

        let element = document.getElementById(elementId);
        if (!element) return;

        //element.classList.add('hover') add effect
        this.order.addItem(elementId);
        this.roundStatus();

    }

    handleRemoveKeyPress(event) {

        let elementId = KEY_MAP[event.code];
        if (!elementId) return;

        let element = document.getElementById(elementId);
        if (!element) return;

        //element.classList.remove('hover') add effect
    }

    removeListenerOnWindow() {
        window.removeEventListener('keydown', this.handleKeyPress);
        window.removeEventListener('keyup', this.handleRemoveKeyPress);
    }

    handleClickonMenuElements() {
        let menuCupSize = Array.from(document.querySelectorAll('.cup-sizes'));
        menuCupSize.forEach(item => {
            item.addEventListener('click', () => {
                this.order.addItem(item.id);
                this.roundStatus();
            })
        })

        let menuTeas = Array.from(document.querySelectorAll('.tea-choice'));
        menuTeas.forEach(item => {
            item.addEventListener('click', () => {
                this.order.addItem(item.id);
                this.roundStatus();
            })
        })

        let menuToppings = Array.from(document.querySelectorAll('.topping-choice'));
        menuToppings.forEach(item => {
            item.addEventListener('click', () => {
                this.order.addItem(item.id);
                this.roundStatus();
            })
        })
    }

    handleClickonRemoveButton() {
        let button = document.getElementById('remove-button');
        button.addEventListener('click', () => {
            this.order.removeItem();
            //this.roundStatus();
        })
    }

    timerStart() {
        this.timer.start();
        View.renderTimer(this.timer.timeLeft);
    }

    roundStatus() {
        if (this.gameOver()) {
            this.renderGameOverMessage();
            return;
        }
        const correctOrder = this.correctBoba();


        if (this.timer.timeLeft > 0 && correctOrder) {
         
            this.totalScore += 1;
            this.numCustomer += 1;
            this.renderScore();

            this.resetGameRound();
            this.newGameRound();

        } else if (this.timer.timeLeft === 0 && !correctOrder) {
       
            this.customerLost += 1;
            View.renderLostCustomers(this.customerLost);
            this.numCustomer += 1;
            if (this.gameOver()) {
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
        //this.customer = null;
    }

    newGameRound() {
        this.order = this.roundDifficulty();
        this.timer = new Timer(this.numSeconds, this.roundStatus.bind(this));
        this.customer = new Customer();
        this.timerStart();
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
        document.querySelector('#lost-customer').innerHTML = '';
        document.querySelector('#score').innerHTML = '';
        document.querySelector('#timer-container').innerHTML = '';
        this.order.deleteOrder();
        this.order.deleteBoba();
        this.totalScore = 0;
        this.customerLost = 0;
        this.numCustomer = 0;
        this.renderScore();
        View.renderLostCustomers(0);
        addEventListener('keydown', this.handleKeyPress);
        addEventListener('keyup', this.handleRemoveKeyPress);

        document.querySelector('#modal').classList.add('hidden');
        this.newGameRound();
    }

    renderScore() {
        View.renderScore(this.totalScore);
    }

    renderCustomerLost () {
        View.renderLostCustomers(this.customerLost);
    }

    renderGameOverMessage() {
        this.removeListenerOnWindow();
        View.renderGameOverMessage(this.totalScore);
    }
}

export default Game;