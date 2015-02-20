'use strict';

var Keyboard = function() {
    var self = this;

    this.keyCodes = {};
    this.keyModifiers = {};

    this._onKeyDown = function(event) { self.onKeyChange(event, true) };
    this._onKeyUp = function(event) { self.onKeyChange(event, false) };

    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);

    return this;
};

Keyboard.prototype.onKeyChange = function(e, pressed) {
    var keyCode = e.keyCode;
    this.keyCodes[keyCode] = pressed;

    this.keyModifiers['shift'] = e.shiftKey;
};

Keyboard.prototype.pressed = function(keyPressed) {
    var keys = keyPressed.split('+');
    if(keys) {
        for(var i = 0; i < keys.length; i++) {
            var pressed = false;
            var key = keys[i];
            if(key === 'shift') {
                pressed = this.keyModifiers[key];
            } else if(key === 'left') {
                pressed = this.keyCodes[37];
            } else if(key === 'right') {
                pressed = this.keyCodes[39];
            } else {
                pressed = this.keyCodes[key.toUpperCase().charCodeAt(0)];
            }

            if(!pressed) {
                return false;
            }
        }

        return true;
    }
    return false;
};