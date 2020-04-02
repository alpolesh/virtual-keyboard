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
    shift: false,
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
    this.capsAndShift();
  },

  createKeys() {
    const fragmentKeys = document.createDocumentFragment();
    const keyboardKeys = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
      'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift', '↑',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', '←', '↓', '→'];

    const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0',
      'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft',
      'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon',
      'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ArrowUp',
      'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

    for (let i = 0; i < keyboardKeys.length; i += 1) {
      const breaks = ['backspace', 'del', 'enter', '↑', '→'].indexOf(keyboardKeys[i]) !== -1;
      const keyElement = document.createElement('button');

      // Add attributes and classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      if (keyboardKeys[i] === 'backspace' || keyboardKeys[i] === 'tab' || keyboardKeys[i] === 'caps lock' || keyboardKeys[i] === 'enter' || keyboardKeys[i] === 'shift' || keyboardKeys[i] === 'ctrl' || keyboardKeys[i] === 'alt') {
        keyElement.classList.add('keyboard__key_wide');
      } else if (keyboardKeys[i] === 'space') {
        keyElement.classList.add('keyboard__key_extra-wide');
      }

      keyElement.keyCode = keyCodes[i];

      // Creation buttons across the language
      keyElement.keyKey = keyboardKeys[i];
      keyElement.textContent = keyboardKeys[i];

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
      if (event.target.tagName === 'BUTTON') {
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
            this.capsAndShift();
            if (this.properties.capsLock === true) {
              event.target.classList.add('keyboard__key_active');
            }
            break;
          case 'ShiftLeft':
            document.querySelector('.keyboard__input-area').value += '';
            this.capsAndShift();
            break;
          case 'ShiftRight':
            document.querySelector('.keyboard__input-area').value += '';
            this.capsAndShift();
            break;
          default:
            if (this.properties.shift === true && this.properties.capsLock === true) {
              document.querySelector('.keyboard__input-area').value += event.target.textContent.toLowerCase();
            } else if (this.properties.capsLock === true) {
              document.querySelector('.keyboard__input-area').value += event.target.keyKey.toUpperCase();
            } else if (this.properties.shift === true) {
              document.querySelector('.keyboard__input-area').value += event.target.textContent;
            } else {
              document.querySelector('.keyboard__input-area').value += event.target.keyKey.toLowerCase();
            }
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
        if (this.properties.shift === false) {
          this.properties.shift = true;
          document.querySelectorAll('.keyboard__key').forEach((el, index) => {
            const button = el;
            button.textContent = this.languages.shift_eng[index];
          });
        } else {
          this.properties.shift = false;
          document.querySelectorAll('.keyboard__key').forEach((el, index) => {
            const button = el;
            button.textContent = this.languages.english[index];
          });
        }
      }
    });
    document.querySelector('.keyboard__keys').addEventListener('mouseup', (event) => {
      if (event.target.classList.contains('shift')) {
        // document.querySelectorAll('.keyboard__key').forEach((el, index) => {
        //   const button = el;
        //   button.textContent = this.languages.english[index];
        // });
      }
    });
    document.querySelector('.keyboard__keys').addEventListener('mouseout', (event) => {
      if (event.target.classList.contains('shift')) {
        // document.querySelectorAll('.keyboard__key').forEach((el, index) => {
        //   const button = el;
        //   button.textContent = this.languages.english[index];
        // });
      }
    });
  },

  activateButtonMouse() {
    document.querySelector('.keyboard__keys').addEventListener('mousedown', (event) => {
      if (event.target.tagName === 'BUTTON' && event.target.keyKey !== 'shift' && event.target.keyKey !== 'caps lock') {
        event.target.classList.add('keyboard__key_active');
      } else if (event.target.keyKey === 'shift' && this.properties.shift === true) {
        event.target.classList.add('keyboard__key_active');
      } else if (event.target.keyKey === 'shift' && this.properties.shift === false) {
        event.target.classList.remove('keyboard__key_active');
      }
    });
    document.querySelector('.keyboard__keys').addEventListener('mouseup', (event) => {
      if (event.target.tagName === 'BUTTON' && event.target.keyKey !== 'shift') {
        event.target.classList.remove('keyboard__key_active');
      }
    });
    document.querySelector('.keyboard__keys').addEventListener('mouseout', (event) => {
      if (event.target.tagName === 'BUTTON' && event.target.keyKey !== 'shift' && event.target.keyKey !== 'caps lock') {
        event.target.classList.remove('keyboard__key_active');
      }
    });
  },

  capsAndShift() {
    if (this.properties.shift === true && this.properties.capsLock === true) {
      document.querySelectorAll('.keyboard__key').forEach((el) => {
        const button = el;
        button.textContent = button.textContent.toLowerCase();
      });
    }
  },

  languages: {
    letters: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
      'z', 'x', 'c', 'v', 'b', 'n', 'm'],

    english: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
      'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift', '↑',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', '←', '↓', '→'],

    shift_eng: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
      'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'del',
      'caps lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'enter',
      'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'shift', '↑',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', '←', '↓', '→'],
  },

};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
