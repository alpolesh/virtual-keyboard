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

    // Connect pushing buttons
    document.addEventListener('keydown', (event) => {
      document.querySelector('.keyboard__input-area').focus();
      this.pushKey();
    });
  },

  createKeys() {
    const fragmentKeys = document.createDocumentFragment();
    const keyboardKeys = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
      'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift', '↑',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'];

    const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0',
      'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft',
      'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon',
      'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ArrowUp',
      'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

    for (let i = 0; i < keyboardKeys.length; i += 1) {
      const breaks = ['Backspace', 'Del', 'Enter', '↑', '→'].indexOf(keyboardKeys[i]) !== -1;
      const keyElement = document.createElement('button');

      // Add attributes and classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      keyElement.keyCode = keyCodes[i];

      // Add symbol
      if (keyboardKeys[i] === 'Backspace' || keyboardKeys[i] === 'Tab' || keyboardKeys[i] === 'Caps Lock' || keyboardKeys[i] === 'Enter' || keyboardKeys[i] === 'Shift' || keyboardKeys[i] === 'Ctrl' || keyboardKeys[i] === 'Alt') {
        keyElement.classList.add('keyboard__key_wide');
      } else if (keyboardKeys[i] === 'Space') {
        keyElement.classList.add('keyboard__key_extra-wide');
      }

      keyElement.textContent = keyboardKeys[i].toLowerCase();
      keyElement.addEventListener('click', (event) => {
        document.querySelector('.keyboard__input-area').focus();
        switch (event.target.keyCode) {
          case 'Space':
            document.querySelector('.keyboard__input-area').value += ' ';
            break;
          case 'Backspace':
            document.querySelector('.keyboard__input-area').value = document.querySelector('.keyboard__input-area').value.slice(0, -1);
            break;
          case 'Enter':
            document.querySelector('.keyboard__input-area').value += '\n';
            break;
          default:
            document.querySelector('.keyboard__input-area').value += keyboardKeys[i].toLowerCase();
        }

        function removeClass() {
          keyElement.classList.remove('keyboard__key_active');
        }
        keyElement.classList.add('keyboard__key_active');
        setTimeout(removeClass, 200);

        // this.triggerEvent();
      });

      // Add button to fragment

      fragmentKeys.append(keyElement);
      if (breaks) {
        fragmentKeys.append(document.createElement('br'));
      }
    }
    return fragmentKeys;
  },

  /*
  triggerEvent() {
    document.querySelector('.keyboard__input-area').value = this.properties.value;
  },
  */

  toggleCapslock() {

  },

  pushKey() {
    document.querySelectorAll('.keyboard__key').forEach((el) => {
      if (el.keyCode === event.code) {
        el.classList.add('keyboard__key_active');
        document.addEventListener('keyup', (event) => {
          el.classList.remove('keyboard__key_active');
        });
      }
    });
  },

};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
