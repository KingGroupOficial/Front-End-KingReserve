import { ref } from 'vue';

export const colorStore = {
    color: ref('black'),
    setColor(newColor) {
        this.color.value = newColor;
        document.documentElement.style.setProperty('--main-bg-color', newColor);
    }
};