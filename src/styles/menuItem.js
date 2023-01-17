class MenuItem {
    constructor(id, imagePath) {
        this.id = id;
        this.imagePath = imagePath;
    }

    render() {
        let img = document.createElement('img');
        img.src = this.imagePath;
        img.alt = `${this.id}-image`;
        img.setAttribute('data-id', this.id);
        return img;
    }
}

export default MenuItem;