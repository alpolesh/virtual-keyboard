const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    input_container: null,
    input_area: null,
    additional_text: null,
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    lastButtonShift: false,
    alt: false,
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

    this.elements.additional_text = document.createElement('p');
    this.elements.additional_text.classList.add('keyboard__additional-text');
    const changingLanguage = document.createElement('p');
    changingLanguage.classList.add('input-area-container__text');
    const developeText = document.createElement('p');
    developeText.classList.add('keyboard__develope-text');

    // Add to DOM
    document.body.prepend(this.elements.main);
    document.querySelector('.keyboard').prepend(this.elements.input_container);
    document.querySelector('.input-area-container').append(this.elements.input_area);
    document.querySelector('.input-area-container').append(changingLanguage);
    changingLanguage.textContent = 'Change language: Shift + left alt';
    document.querySelector('.input-area-container').append(this.elements.additional_text);
    document.querySelector('.keyboard__additional-text').textContent = `Language: ${this.properties.language}`;
    document.querySelector('.keyboard').append(this.elements.keysContainer);
    document.querySelector('.keyboard__keys').append(this.createKeys());
    document.querySelector('.keyboard').append(developeText);
    developeText.textContent = 'The keyboard was developed on Windows OS';

    // Connect pushing buttons
    document.querySelector('.keyboard__input-area').focus();
    this.pushKey();
    this.clickButton();
    this.pressShiftMouse();
    this.pressShiftButton();
    this.activateButtonMouse();
  },

  createKeys() {
    const fragmentKeys = document.createDocumentFragment();

    let keyboardKeys = [];
    if (this.properties.language === 'eng') {
      keyboardKeys = this.languages.english;
    } else if (this.properties.language === 'rus') {
      keyboardKeys = this.languages.rus;
    }

    const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0',
      'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft',
      'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon',
      'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ArrowUp',
      'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

    for (let i = 0; i < keyboardKeys.length; i += 1) {
      const breaks = ['backspace', 'del', 'enter', '↑', '→'].indexOf(keyboardKeys[i]) !== -1;
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('keyboard__button-container');
      const keyElement = document.createElement('button');
      buttonContainer.append(keyElement);


      // Add attributes and classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      if (keyboardKeys[i] === 'backspace' || keyboardKeys[i] === 'tab' || keyboardKeys[i] === 'caps lock' || keyboardKeys[i] === 'enter' || keyboardKeys[i] === 'shift' || keyboardKeys[i] === 'ctrl' || keyboardKeys[i] === 'alt') {
        buttonContainer.classList.add('keyboard__key_wide');
      } else if (keyboardKeys[i] === 'space') {
        buttonContainer.classList.add('keyboard__key_extra-wide');
      }

      keyElement.keyCode = keyCodes[i];

      // Creation buttons across the language
      keyElement.keyKey = keyboardKeys[i];
      keyElement.textContent = keyboardKeys[i];

      // Add button to fragment

      fragmentKeys.append(buttonContainer);
      if (breaks) {
        fragmentKeys.append(document.createElement('br'));
      }
    }
    return fragmentKeys;
  },

  pushKey() {
    const input = document.querySelector('.keyboard__input-area');
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.activateButtonPush();
      input.focus();
      switch (event.code) {
        case 'Space':
          input.setRangeText(' ', input.selectionStart, input.selectionEnd, 'end');
          break;
        case 'Backspace':
          if (input.selectionStart === input.selectionEnd) {
            input.setSelectionRange(input.selectionStart - 1, input.selectionEnd);
            input.setRangeText('', input.selectionStart, input.selectionEnd, 'end');
          }
          input.setRangeText('', input.selectionStart, input.selectionEnd, 'end');
          break;
        case 'Delete':
          if (input.selectionStart === input.selectionEnd) {
            input.setSelectionRange(input.selectionStart, input.selectionStart + 1);
            input.setRangeText('', input.selectionStart, input.selectionEnd, 'end');
          }
          input.setRangeText('', input.selectionStart, input.selectionEnd, 'end');
          break;
        case 'Enter':
          input.setRangeText('\n', input.selectionStart, input.selectionEnd, 'end');
          break;
        case 'Tab':
          input.setRangeText('    ', input.selectionStart, input.selectionEnd, 'end');
          break;
        case 'CapsLock':
          this.toggleCapslock();
          this.capsAndShift();
          break;
        case 'ShiftLeft':
          input.value += '';
          if (this.properties.alt === true) {
            if (this.properties.language === 'eng') {
              this.properties.language = 'rus';
            } else if (this.properties.language === 'rus') {
              this.properties.language = 'eng';
            }
            this.switchLanguage();
          }
          break;
        case 'ShiftRight':
          input.value += '';
          if (this.properties.alt === true) {
            if (this.properties.language === 'eng') {
              this.properties.language = 'rus';
            } else if (this.properties.language === 'rus') {
              this.properties.language = 'eng';
            }
            this.switchLanguage();
          }
          break;
        case 'AltLeft':
          if (this.properties.shift === true) {
            if (this.properties.language === 'eng') {
              this.properties.language = 'rus';
            } else if (this.properties.language === 'rus') {
              this.properties.language = 'eng';
            }
            this.switchLanguage();
          }
          this.properties.alt = true;
          document.addEventListener('keyup', () => {
            if (event.code === 'AltLeft') {
              this.properties.alt = false;
            }
          });
          break;
        case 'AltRight':
          input.value += '';
          break;
        case 'ControlLeft':
          input.value += '';
          break;
        case 'ControlRight':
          input.value += '';
          break;
        case 'MetaLeft':
          input.value += '';
          break;
        case 'ArrowLeft':
          input.setRangeText('←', input.selectionStart, input.selectionEnd, 'end');
          break;
        case 'ArrowRight':
          input.setRangeText('→', input.selectionStart, input.selectionEnd, 'end');
          break;
        case 'ArrowDown':
          input.setRangeText('↓', input.selectionStart, input.selectionEnd, 'end');
          break;
        case 'ArrowUp':
          input.setRangeText('↑', input.selectionStart, input.selectionEnd, 'end');
          break;
        default:
          if (this.languages.keyCodes.includes(event.code)) {
            document.querySelectorAll('.keyboard__key').forEach((el) => {
              if (el.keyCode === event.code) {
                input.setRangeText(el.textContent, input.selectionStart, input.selectionEnd, 'end');
              }
            });
          }
      }
    });
  },

  activateButtonPush() {
    document.querySelectorAll('.keyboard__key').forEach((el) => {
      if (el.keyCode === event.code) {
        if (event.code === 'CapsLock' && this.properties.capsLock) {
          el.classList.remove('keyboard__key_active');
        } else {
          el.classList.add('keyboard__key_active');
        }
        document.addEventListener('keyup', (event) => {
          if (el.keyCode === event.code && event.code !== 'CapsLock') {
            el.classList.remove('keyboard__key_active');
          }
        });
      }
    });
  },

  clickButton() {
    const input = document.querySelector('.keyboard__input-area');
    document.querySelector('.keyboard__keys').addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON' || event.target.className === 'keyboard__button-container') {
        input.focus();
        switch (event.target.keyCode) {
          case 'Space':
            input.setRangeText(' ', input.selectionStart, input.selectionEnd, 'end');
            break;
          case 'Backspace':
            if (input.selectionStart === input.selectionEnd) {
              input.setSelectionRange(input.selectionStart - 1, input.selectionEnd);
              input.setRangeText('', input.selectionStart, input.selectionEnd, 'end');
            }
            input.setRangeText('', input.selectionStart, input.selectionEnd, 'end');
            break;
          case 'Delete':
            if (input.selectionStart === input.selectionEnd) {
              input.setSelectionRange(input.selectionStart, input.selectionStart + 1);
              input.setRangeText('', input.selectionStart, input.selectionEnd, 'end');
            }
            input.setRangeText('', input.selectionStart, input.selectionEnd, 'end');
            break;
          case 'Enter':
            input.setRangeText('\n', input.selectionStart, input.selectionEnd, 'end');
            break;
          case 'Tab':
            input.setRangeText('    ', input.selectionStart, input.selectionEnd, 'end');
            break;
          case 'CapsLock':
            this.toggleCapslock();
            this.capsAndShift();
            if (this.properties.capsLock === true) {
              event.target.classList.add('keyboard__key_active');
            }
            break;
          case 'ShiftLeft':
            input.value += '';
            this.capsAndShift();
            if (this.properties.lastButtonShift) {
              this.properties.lastButtonShift = false;
            } else {
              this.properties.lastButtonShift = true;
            }
            break;
          case 'ShiftRight':
            input.value += '';
            this.capsAndShift();
            if (this.properties.lastButtonShift) {
              this.properties.lastButtonShift = false;
            } else {
              this.properties.lastButtonShift = true;
            }
            break;
          case 'AltLeft':
            if (this.properties.lastButtonShift) {
              if (this.properties.language === 'eng') {
                this.properties.language = 'rus';
              } else if (this.properties.language === 'rus') {
                this.properties.language = 'eng';
              }
              this.switchLanguage();
            }
            this.properties.lastButtonShift = false;
            break;
          case 'AltRight':
            input.value += '';
            break;
          case 'ControlLeft':
            input.value += '';
            break;
          case 'ControlRight':
            input.value += '';
            break;
          case 'MetaLeft':
            input.value += '';
            break;
          default:
            input.setRangeText(event.target.textContent, input.selectionStart, input.selectionEnd, 'end');
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

  pressShiftMouse() {
    document.querySelectorAll('.keyboard__key')[42].classList.add('shift');
    document.querySelectorAll('.keyboard__key')[53].classList.add('shift');
    document.querySelector('.keyboard__keys').addEventListener('mousedown', (event) => {
      if (event.target.keyKey === 'shift') {
        if (this.properties.shift === false) {
          this.properties.shift = true;
          document.querySelectorAll('.keyboard__key').forEach((el, index) => {
            const button = el;
            if (this.properties.language === 'eng') {
              button.textContent = this.languages.shift_eng[index];
            } else if (this.properties.language === 'rus') {
              button.textContent = this.languages.shift_rus[index];
            }
          });
        } else {
          this.properties.shift = false;
          document.querySelectorAll('.keyboard__key').forEach((el, index) => {
            const button = el;
            if (this.properties.language === 'eng') {
              button.textContent = this.languages.english[index];
            } else if (this.properties.language === 'rus') {
              button.textContent = this.languages.rus[index];
            }
          });
        }
      }
    });
  },

  pressShiftButton() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        this.properties.shift = true;
        document.querySelectorAll('.keyboard__key').forEach((el, index) => {
          const button = el;
          if (this.properties.language === 'eng') {
            button.textContent = this.languages.shift_eng[index];
          } else if (this.properties.language === 'rus') {
            button.textContent = this.languages.shift_rus[index];
          }
        });
      }
      this.capsAndShift();
    });

    document.addEventListener('keyup', (event) => {
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        document.querySelectorAll('.keyboard__key').forEach((el, index) => {
          const button = el;
          if (this.properties.language === 'eng') {
            button.textContent = this.languages.english[index];
          } else if (this.properties.language === 'rus') {
            button.textContent = this.languages.rus[index];
          }
        });
        this.properties.shift = false;
        this.capsAndShift();
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
      if (event.target.tagName === 'BUTTON' && event.target.keyKey === 'alt') {
        document.querySelectorAll('.shift')[0].classList.remove('keyboard__key_active');
        document.querySelectorAll('.shift')[1].classList.remove('keyboard__key_active');
        event.target.classList.remove('keyboard__key_active');
        this.properties.shift = false;
      } else if (event.target.tagName === 'BUTTON' && event.target.keyKey !== 'shift') {
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
    if (this.properties.capsLock === true && this.properties.shift === true) {
      document.querySelectorAll('.keyboard__key').forEach((el) => {
        const button = el;
        button.textContent = button.textContent.toLowerCase();
      });
    } else if (this.properties.capsLock === true) {
      document.querySelectorAll('.keyboard__key').forEach((el) => {
        const button = el;
        if (this.languages.letters.includes(el.keyKey)) {
          button.textContent = el.textContent.toUpperCase();
        }
      });
    }
  },

  switchLanguage() {
    document.querySelector('.keyboard__additional-text').textContent = `Language: ${this.properties.language}`;
    if (this.properties.language === 'eng') {
      document.querySelectorAll('.keyboard__key').forEach((el, index) => {
        const button = el;
        button.keyKey = this.languages.english[index];
        button.textContent = this.languages.english[index];
      });
    } else if (this.properties.language === 'rus') {
      document.querySelectorAll('.keyboard__key').forEach((el, index) => {
        const button = el;
        button.keyKey = this.languages.rus[index];
        button.textContent = this.languages.rus[index];
      });
    }
    localStorage.setItem('language', Keyboard.properties.language);
  },

  languages: {
    letters: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
      'z', 'x', 'c', 'v', 'b', 'n', 'm', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы',
      'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'],

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

    rus: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'del',
      'caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'shift', '↑',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', '←', '↓', '→'],

    shift_rus: ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace',
      'tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'del',
      'caps lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter',
      'shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'shift', '↑',
      'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', '←', '↓', '→'],

    keyCodes: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0',
      'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft',
      'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon',
      'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight', 'ArrowUp',
      'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  },

};

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('language') === null) {
    localStorage.setItem('language', 'eng');
  }
  Keyboard.properties.language = localStorage.getItem('language');
  Keyboard.init();
});
