class Image {
    constructor() {
        setTimeout(() => {
            this.onload(new CustomEvent("custom")); // simulate onload
        }, 100);
    }
}

window.Image = Image;
