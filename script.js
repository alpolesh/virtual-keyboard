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
    language: 'eng',
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
    document.querySelector('.keyboard__input-area').focus();
    this.pushKey();
    this.clickButton();
    this.pressShift();
    this.activateButtonMouse();
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
      if (keyboardKeys[i] === 'Backspace' || keyboardKeys[i] === 'Tab' || keyboardKeys[i] === 'Caps Lock' || keyboardKeys[i] === 'Enter' || keyboardKeys[i] === 'Shift' || keyboardKeys[i] === 'Ctrl' || keyboardKeys[i] === 'Alt') {
        keyElement.classList.add('keyboard__key_wide');
      } else if (keyboardKeys[i] === 'Space') {
        keyElement.classList.add('keyboard__key_extra-wide');
      }

      keyElement.keyCode = keyCodes[i];

      // Creation buttons across the language
      keyElement.keyKey = keyboardKeys[i];
      keyElement.textContent = keyboardKeys[i].toLowerCase();

      // Add button to fragment

      fragmentKeys.append(keyElement);
      if (breaks) {
        fragmentKeys.append(document.createElement('br'));
      }
    }
    return fragmentKeys;
  },

  pushKey() {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.activateButtonPush();
      document.querySelector('.keyboard__input-area').focus();
      switch (event.code) {
        case 'Space':
          document.querySelector('.keyboard__input-area').value += ' ';
          break;
        case 'Backspace':
          document.querySelector('.keyboard__input-area').value = document.querySelector('.keyboard__input-area').value.slice(0, -1);
          break;
        case 'Enter':
          document.querySelector('.keyboard__input-area').value += '\n';
          break;
        case 'Tab':
          document.querySelector('.keyboard__input-area').value += '  ';
          break;
        case 'CapsLock':
          this.toggleCapslock();
          break;
        default:
          if (this.properties.capsLock === false) {
            document.querySelector('.keyboard__input-area').value += event.key.toLowerCase();
          } else {
            document.querySelector('.keyboard__input-area').value += event.key.toUpperCase();
          }
      }
    });
  },

  activateButtonPush() {
    document.querySelectorAll('.keyboard__key').forEach((el) => {
      if (el.keyCode === event.code) {
        el.classList.add('keyboard__key_active');
        document.addEventListener('keyup', (event) => {
          el.classList.remove('keyboard__key_active');
        });
      }
    });
  },

  clickButton() {
    document.querySelector('.keyboard__keys').addEventListener('click', (event) => {
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
        case 'Tab':
          document.querySelector('.keyboard__input-area').value += '  ';
          break;
        case 'CapsLock':
          this.toggleCapslock();
          break;
        case 'ShiftLeft':
          document.querySelector('.keyboard__input-area').value += '';
          break;
        case 'ShiftRight':
          document.querySelector('.keyboard__input-area').value += '';
          break;
        default:
          if (this.properties.capsLock === false) {
            document.querySelector('.keyboard__input-area').value += event.target.keyKey.toLowerCase();
          } else {
            document.querySelector('.keyboard__input-area').value += event.target.keyKey.toUpperCase();
          }
      }
    });
  },

  toggleCapslock() {
    if (this.properties.capsLock === false) {
      document.querySelectorAll('.keyboard__key').forEach((el) => {
        const button = el;
        if (this.languages.letters.includes(el.keyKey)) {
          button.textContent = el.textContent.toUpperCase();
        }
      });
      this.properties.capsLock = true;
    } else {
      document.querySelectorAll('.keyboard__key').forEach((el) => {
        const button = el;
        if (this.languages.letters.includes(el.keyKey)) {
          button.textContent = el.textContent.toLowerCase();
        }
      });
      this.properties.capsLock = false;
    }
  },

  pressShift() {
    document.querySelectorAll('.keyboard__key')[42].classList.add('shift');
    document.querySelectorAll('.keyboard__key')[53].classList.add('shift');
    document.querySelector('.keyboard__keys').addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('shift')) {
        document.querySelectorAll('.keyboard__key').forEach((el, index) => {
          const button = el;
          button.textContent = this.languages.shift_eng[index];
        });
      }
    });
    document.querySelector('.keyboard__keys').addEventListener('mouseup', (event) => {
      if (event.target.classList.contains('shift')) {
        document.querySelectorAll('.keyboard__key').forEach((el, index) => {
          const button = el;
          button.textContent = this.languages.english[index];
        });
      }
    });
  },

  activateButtonMouse() {
    document.querySelector('.keyboard__keys').addEventListener('mousedown', (event) => {
      if (event.target.tagName === 'BUTTON') {
        event.target.classList.add('keyboard__key_active');
      }
    });
    document.querySelector('.keyboard__keys').addEventListener('mouseup', (event) => {
      if (event.target.tagName === 'BUTTON') {
        event.target.classList.remove('keyboard__key_active');
      }
    });
    document.querySelector('.keyboard__keys').addEventListener('mouseout', (event) => {
      if (event.target.tagName === 'BUTTON' && event.target.keyKey !== 'Shift') {
        event.target.classList.remove('keyboard__key_active');
      }
    });
  },

  languages: {
    letters: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
      'z', 'x', 'c', 'v', 'b', 'n', 'm'],

    english: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
      'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift', '↑',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],

    shift_eng: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
      'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del',
      'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
      'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift', '↑',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],
  },

};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
