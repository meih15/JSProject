class Game {
    constructor() {
        this.menu = new Menu();
        this.customer = new Customer();
        this.order = new Order(numSeconds);
        this.timer = new Timer(this.order.numSeconds, )

        this.totalScore = 0;
        this.customerLost = 0;
        this.numCustomer = 0;

        
        // this.handleClickonMenuElements = this.handleClickonMenuElements.bind(this);
        // this.handleClickonRemove = this.handleClickonRemove.bind(this);
        // this.checkTotalCustomers = this.checkTotalCustomers.bind(this);
        this.start = this.start.bind(this);

        document.addEventListener('keydown', this.handleClick.bind(this));
        document.addEventListener('keyup', this.handleRemoveClick.bind(this));

        this.removeListenerOnWindow = this.removeListenerOnWindow.bind(this);

        this.renderScore();
    }

    start() {
        this.addListenerOnWindow();
        this.handleClickonMenuElements();
        this.handleClickonRemove();
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

    checkTotalCustomers(){}  //a check for total customers

    //a function to keep track of total customers past

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

        element.classList.add('hover')
        this.boba.addItem(elementId);
        this.roundStatus();
    }

    handleRemoveKeyPress(event) {
        let key = event.key;
        let elementId = KEY_MAP[key];
        if (!elementId) return;

        let element = document.getElementById(elementId);
        if (!element) return;

        element.classList.remove('hover')
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

    handleClickonRemove() {
        let button = document.querySelector('#remove-button');
        button.addEventListener('click', () => {
            this.boba.removeItem();
            this.roundStatus();
        })
    }

    timerStart() {
        let timer = document.querySelector('#timer');
        if (!timer) {
            timer = document.createElement('div');
            timer.id = 'timer';
            timer.innerHTML = this.timer.count;
            document.querySelector('#timer-container').appendChild(timer);
        }
        
        this.timer.start();
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

    }


    gameOver() {
        return this.customerLost >= 3;
    }

    restart() {

    }

    renderScore() {
        
    }

    renderGameOverMessage() {

    }



}