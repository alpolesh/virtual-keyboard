const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    // Create master elements
    this.elements.main = document.createElement('div');
    this.elements.main.classList.add('keyboard');

    this.elements.keysContainer = document.createElement('div');
    this.elements.keysContainer.classList.add('keyboard__keys');

    // Add to DOM
    document.body.prepend(this.elements.main);
    document.querySelector('.keyboard').append(this.elements.keysContainer);
    document.querySelector('.keyboard__keys').append(this.createKeys());
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
      keyElement.textContent = key.toLowerCase();

      // Add button to fragment
      fragmentKeys.append(keyElement);
      if (breaks) {
        fragmentKeys.append(document.createElement('br'));
      }
    });
    return fragmentKeys;
  },

  toggleCapslock() {

  },

};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
