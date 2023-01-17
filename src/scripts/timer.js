class Timer {
    constructor(numSeconds, roundEndCheck) {
        this.interval = undefined;
        this.roundTime = numSeconds;
        this.timeLeft = this.roundTime;
        this.roundEndCheck = roundEndCheck;
    }

    start() {
        if (this.interval) {
            clearInterval(this.interval)
        }
        this.timeLeft = this.roundTime;
        this.interval = setInterval(() => this.countDown(), 1000);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    countDown() {
        if (this.timeLeft === 0) {
            this.stop();
            this.roundEndCheck();
        } else {
            this.timeLeft -= 1;
            let timer = document.getElementById("timer");
            timer.innerHTML = this.timeLeft;
        }
    }

    //might not show 0 seconds on timer when round stops. might need adjustment

    removeTimer() {
        document.getElementById("timer").remove();
    }
}