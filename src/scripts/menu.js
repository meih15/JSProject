import MenuItem from "../styles/menuItem";
import { DRINK_SIZES, MILK_TEA_CHOICES, TOPPING_CHOICES} from "../styles/constants";

class Menu {
    constructor() {
        this.menu = [];
        this.generateMenu();
    }

    generateMenu() {
        let cupSizes = document.querySelectorAll('.cup-size');
            cupSizes.forEach(size => {
                let sizeId = size.id;
                let menuItem = new MenuItem(sizeId, DRINK_SIZES[sizeId]);
                this.menu.push(menuItem); 
                size.appendChild(menuItem.render());
            });

        let teaChoices = document.querySelectorAll('.tea-choice');
            teaChoices.forEach(tea => {
                let teaId = tea.id;
                let menuItem = new MenuItem(teaId, MILK_TEA_CHOICES[teaId]);
                this.menu.push(menuItem);
                tea.appendChild(menuItem.render());
            });

        let toppingChoices = document.querySelectorAll('.topping-choice');
            toppingChoices.forEach(topping => {
                let toppingId = topping.id;
                let menuItem = new MenuItem(toppingId, TOPPING_CHOICES[toppingId]);
                this.menu.push(menuItem);
                topping.appendChild(menuItem.render());
            });
    }

    deleteMenu() {
        let menu = document.getElementById("menu");
        let images = menu.querySelectorAll('img');
        images.forEach(img => img.remove());

        let modal = document.getElementById("modal");
        modal.classList.add('hidden');
    }

}

export default Menu;