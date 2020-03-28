const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    input_container: null,
    input_area: null,
  },

  properties: {
    value: '',
    capsLock: false,
    isTyped: true,
  },

  init() {
    // Create master elements
    this.elements.main = document.createElement('div');
    this.elements.main.classList.add('keyboard');

    this.elements.keysContainer = document.createElement('div');
    this.elements.keysContainer.classList.add('keyboard__keys');

    this.elements.input_container = document.createElement('div');
    this.elements.input_container.classList.add('input-area-container');
    this.elements.input_area = document.createElement('textarea');
    this.elements.input_area.classList.add('keyboard__input-area');

    // Add to DOM
    document.body.prepend(this.elements.main);
    document.querySelector('.keyboard').prepend(this.elements.input_container);
    document.querySelector('.input-area-container').append(this.elements.input_area);
    document.querySelector('.keyboard').append(this.elements.keysContainer);
    document.querySelector('.keyboard__keys').append(this.createKeys());

    // Connect input area
    document.querySelector('.keyboard__input-area').addEventListener('focus', (event) => {
      this.properties.isTyped = true;
    });
    document.querySelector('.keyboard__input-area').addEventListener('input', (event) => {
      this.properties.value = document.querySelector('.keyboard__input-area').value;
    });
  },

  createKeys() {
    const fragmentKeys = document.createDocumentFragment();
    const keyboardKeys = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
      'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift', '↑',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'];

    keyboardKeys.forEach((key) => {
      const breaks = ['Backspace', 'Del', 'Enter', '↑', '→'].indexOf(key) !== -1;
      const keyElement = document.createElement('button');

      // Add attributes and classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      // Add symbol
      if (key === 'Backspace' || key === 'Tab' || key === 'Caps Lock' || key === 'Enter' || key === 'Shift' || key === 'Ctrl' || key === 'Alt') {
        keyElement.classList.add('keyboard__key_wide');
      } else if (key === 'Space') {
        keyElement.classList.add('keyboard__key_extra-wide');
      }

      keyElement.textContent = key.toLowerCase();
      keyElement.addEventListener('click', (event) => {
        if (this.properties.isTyped) {
          this.properties.value += key.toLowerCase();
          this.triggerEvent();
        }
      });

      // Add button to fragment

      fragmentKeys.append(keyElement);
      if (breaks) {
        fragmentKeys.append(document.createElement('br'));
      }
    });
    return fragmentKeys;
  },

  triggerEvent() {
    document.querySelector('.keyboard__input-area').value = this.properties.value;
    document.addEventListener('keydown', (event) => {

    });
  },

  toggleCapslock() {

  },

};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
