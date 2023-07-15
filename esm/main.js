"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var ___Console__terminal, ___Console__config, ___Console__commands, ___Console__states;
import { v4 as uuidv4 } from "uuid";
const uuidGen = () => uuidv4();
function hasKey(obj, key) {
    return key in obj;
}
function checkKeyReturn(obj, key) {
    return key in obj
        ? key
        :
            null;
}
class __Console {
    constructor(terminal, config, initialStates) {
        ___Console__terminal.set(this, void 0);
        ___Console__config.set(this, void 0);
        ___Console__commands.set(this, void 0);
        ___Console__states.set(this, void 0);
        __classPrivateFieldSet(this, ___Console__terminal, terminal, "f");
        __classPrivateFieldSet(this, ___Console__config, config, "f");
        __classPrivateFieldSet(this, ___Console__states, initialStates, "f");
        __classPrivateFieldSet(this, ___Console__commands, Object.assign({ clear: () => this.removeAllLines() }, __classPrivateFieldGet(this, ___Console__config, "f").commands), "f");
    }
    get terminal() {
        return __classPrivateFieldGet(this, ___Console__terminal, "f");
    }
    get config() {
        return __classPrivateFieldGet(this, ___Console__config, "f");
    }
    get commands() {
        return __classPrivateFieldGet(this, ___Console__commands, "f");
    }
    get activeText() {
        return __classPrivateFieldGet(this, ___Console__states, "f").activeStates.text;
    }
    set activeText(activeText) {
        __classPrivateFieldGet(this, ___Console__states, "f").activeStates.text = activeText;
    }
    get activeType() {
        return __classPrivateFieldGet(this, ___Console__states, "f").activeStates.type;
    }
    set activeType(activeType) {
        __classPrivateFieldGet(this, ___Console__states, "f").activeStates.type = activeType;
    }
    get activeIcon() {
        return __classPrivateFieldGet(this, ___Console__states, "f").activeStates.icon;
    }
    set activeIcon(activeIcon) {
        __classPrivateFieldGet(this, ___Console__states, "f").activeStates.icon = activeIcon;
    }
    matchIcon(icon) {
        if (typeof icon !== "string") {
            return;
        }
        switch (icon) {
            case "norma;":
                return __classPrivateFieldGet(this, ___Console__config, "f").icons.normal;
            case "system":
                return __classPrivateFieldGet(this, ___Console__config, "f").icons.system;
            case "error":
                return __classPrivateFieldGet(this, ___Console__config, "f").icons.error;
            case "warning":
                return __classPrivateFieldGet(this, ___Console__config, "f").icons.warning;
            default:
                return icon;
        }
    }
    addLine(item) {
        __classPrivateFieldGet(this, ___Console__terminal, "f").push(Object.assign(Object.assign({}, item), { icon: this.matchIcon(item.icon), id: uuidGen() }));
        return __classPrivateFieldGet(this, ___Console__terminal, "f");
    }
    removeAllLines() {
        __classPrivateFieldGet(this, ___Console__terminal, "f").length = 0;
        this.addLine({
            text: "cleared",
            type: "system",
            icon: __classPrivateFieldGet(this, ___Console__config, "f").icons.system,
        });
        return __classPrivateFieldGet(this, ___Console__terminal, "f");
    }
    log(message) {
        this.addLine({
            text: message,
            type: "normal",
            icon: __classPrivateFieldGet(this, ___Console__config, "f").icons.normal,
        });
    }
    warn(message) {
        this.addLine({
            text: message,
            type: "warning",
            icon: __classPrivateFieldGet(this, ___Console__config, "f").icons.warning,
        });
    }
    error(message) {
        this.addLine({
            text: message,
            type: "error",
            icon: __classPrivateFieldGet(this, ___Console__config, "f").icons.error,
        });
    }
    system(message) {
        this.addLine({
            text: message,
            type: "system",
            icon: __classPrivateFieldGet(this, ___Console__config, "f").icons.system,
        });
    }
    response(message) { }
    parse(command) {
        let _broken_command = command
            .replace(/^\s+|\s+$/g, "")
            .split(" ")
            .filter((n) => n);
        if (_broken_command.length === 1 && _broken_command[0].length === 0) {
            return;
        }
        else if (hasKey(__classPrivateFieldGet(this, ___Console__commands, "f"), _broken_command.toString())) {
            this.error(`The term '${_broken_command}' is not recognized as the name of a command`);
        }
        else {
            if (_broken_command.length == 1 &&
                hasKey(__classPrivateFieldGet(this, ___Console__commands, "f"), _broken_command.toString())) {
                __classPrivateFieldGet(this, ___Console__commands, "f")[_broken_command.toString()]();
            }
            else if (hasKey(__classPrivateFieldGet(this, ___Console__commands, "f"), _broken_command.toString()) &&
                _broken_command.some((v) => __classPrivateFieldGet(this, ___Console__commands, "f")[_broken_command[0]]._flags
                    .keys()
                    .includes(v))) {
                let _command_function = _broken_command.reduce(() => { });
                let _command_options = _broken_command.reduce(() => { });
                __classPrivateFieldGet(this, ___Console__commands, "f")[_broken_command][_command_function](_command_options);
            }
        }
        return;
    }
}
___Console__terminal = new WeakMap(), ___Console__config = new WeakMap(), ___Console__commands = new WeakMap(), ___Console__states = new WeakMap();
const Terminal = __Console;
export default Terminal;
//# sourceMappingURL=main.js.map