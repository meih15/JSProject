# JSProject

## Background
<!-- **bobabreak** is a tea-themed matching game where the player serves as a barista in a bubble-tea shop newly opened in the bustling city of Los Angeles. Hone your barista skills as you serve customers the drink of their dreams and collect revenue to keep your shop open!  -->

**bobabreak** is a tea-themed matching game where the player serves as a barista in a bubble-tea shop newly opened in the bustling city of Los Angeles. Hone your barista skills as you take orders and serve customers the drink of their dreams!

## Instructions

**bobabreak** is a tea-themed matching game. The player will take on the role of the barista that makes the bubble tea orders to serve the correct drink to the customer. Players can use the keyboard or mouse to select components of the drink. Players will have to choose the right cup-size, tea, and the toppings in order to pass the round. The time allotted for each drink order will decrease after a certain amount of customers to increase difficulty over the course of gameplay. The player will be given three lives. A wrong order or order not completed in time will result in a customer lost, aka life lost. Losing all three lives will result in a game over. 

## Live
Play **bobabreak** live [here](https://meih15.github.io/bobabreak/)

## Wireframes

![wireframe](./assets/introduction/wireframe.png)

## Technologies, Libraries, APIs
- Javascript
- NPM and Webpack
- HTML/CSS

## Functionality & MVPS

In **bobabreak**, players will be able to:
- Start a new game and restart the game
- Use the keyboard or mouse to select each drink's ingredients

```js
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

        this.order.addItem(elementId);
        this.roundStatus();
    }

    handleRemoveKeyPress(event) {
        let elementId = KEY_MAP[event.code];
        if (!elementId) return;

        let element = document.getElementById(elementId);
        if (!element) return;
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
 ```


- Collect a point for serving the correct drink to customers
- Lose a customer for each missed bubble tea order
- Lose the game when you lose 3 customers

In addition, this project includes:
- Instructions on how to play

![2023-04-05 (4)](https://user-images.githubusercontent.com/117603258/230256482-e71a500a-983c-4b31-a695-14cdb70f82a5.png)


## Implementation Timeline
- Friday: Project setup and outlining the game logic
- Weekend: Complete the game logic functionality
- Monday: Complete the game interface
- Tuesday: Include HTML buttons functionality and music options
- Wednesday: Finish styling, and clean up code
- Thursday Morning: Deploy to Github pages

## Future Implementations
- Add sound to the game
- Mute any sounds from the game

## Credits
Images
https://dribble.com/shots/8089955-Bubble-Tea (toppings)

Cup size images by Gerren Rabideau from Pixaby
https://pixabay.com/service/terms/

https://unblast.com/100-free-cartoon-characters-sketch-figma/ (customers)

https://www.mydraw.com/templates-infographics-tea-types-infographic (tea-flavors)

- Font License: SIL Open Font License, 1.1 (http://scripts.sil.org/OFL))


