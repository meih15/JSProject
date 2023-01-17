class View {
    constructor(){}

    static renderTimer(count) {
        let timer = document.querySelector('#timer');
        if (!timer) {
            timer = document.createElement('div');
            timer.id = 'timer';
            timer.innerHTML = count;
            document.querySelector('#timer-container').appendChild(timer);
        }
    }

    static renderScore() {
        let score = document.querySelector('#score')
        if (score > 1 || score === 0) {
            score.innerHTML = `${score} orders`;
        } else {
            score.innerHTML = `${score} order`;
        }
    }

    static renderLostCustomers(numLostCustomers) {
        let customerLost = document.getElementById('lost-customer');
        customerLost.innerHTML = "";
        for (let i = 1; i <= numLostCustomers; i++) {
            let loss = document.createElement('img');
            loss.src = "";
            customerLost.appendChild(loss);
        }
    }

    static renderGameOverMessage(totalScore) {
        const score = totalScore;
        this.removeListenerOnWindow();
        
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
