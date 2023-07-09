"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var uuidGen = function () { return (0, uuid_1.v4)(); }; // generate random id
// * from https://dev.to/mapleleaf/indexing-objects-in-typescript-1cgi
// `PropertyKey` is short for "string | number | symbol"
// since an object key can be any of those types, our key can too
// in TS 3.0+, putting just "string" raises an error
function hasKey(obj, key) {
    return key in obj;
}
var __Console = /** @class */ (function () {
    function __Console(terminal, config) {
        var _this = this;
        // this._config = new Object();
        // this._terminal = new Array();
        this._terminal = terminal;
        this._config = config;
        this._commands = __assign({ clear: function () { return _this.removeAllLines(); } }, this._config.commands);
    }
    __Console.prototype.addLine = function (item) {
        this._terminal.push(__assign(__assign({}, item), { id: uuidGen() }));
        return this._terminal;
    };
    __Console.prototype.removeAllLines = function () {
        this._terminal.length = 0;
        this.addLine({
            text: "cleared",
            type: "system",
            icon: this._config.icons.terminal,
        });
        return this._terminal;
    };
    Object.defineProperty(__Console.prototype, "lines", {
        get: function () {
            return this._terminal;
        },
        enumerable: false,
        configurable: true
    });
    __Console.prototype.log = function (message) {
        this.addLine({
            text: message,
            type: "normal",
            icon: this._config.icons.log,
        });
    };
    __Console.prototype.warn = function (message) {
        this.addLine({
            text: message,
            type: "warning",
            icon: this._config.icons.warn,
        });
    };
    __Console.prototype.error = function (message) {
        this.addLine({
            text: message,
            type: "error",
            icon: this._config.icons.error,
        });
    };
    __Console.prototype.system = function (message) {
        this.addLine({
            text: message,
            type: "system",
            icon: this._config.icons.system,
        });
    };
    __Console.prototype.response = function (message) { };
    __Console.prototype.parse = function (command) {
        var _this = this;
        // if (typeof command == "string") {
        var _broken_command = command
            .replace(/^\s+|\s+$/g, "")
            .split(" ")
            .filter(function (n) { return n; });
        //  check for empty string
        if (_broken_command.length === 1 && _broken_command[0].length === 0) {
            // this.log("");
            return;
        }
        else if (
        // !this._commands[_broken_command]
        // this._commands[_broken_command.toString()] == undefined
        hasKey(this._commands, _broken_command.toString())
        // ||
        // typeof this._commands[_broken_command] == "undefined"
        // ||
        // this._commands[_broken_command]() == undefined
        ) {
            this.error("The term '".concat(_broken_command, "' is not recognized as the name of a command"));
        }
        else {
            if (_broken_command.length == 1 &&
                hasKey(this._commands, _broken_command.toString())) {
                // checking if its only one word command to avoid processing
                this._commands[_broken_command.toString()]();
            }
            else if (hasKey(this._commands, _broken_command.toString()) &&
                _broken_command.some(function (v) {
                    return _this._commands[_broken_command[0]]._flags.keys().includes(v);
                })) {
                //check if parts of the broken command inlcude flags for the command
                var _command_function = _broken_command.reduce(function () { });
                var _command_options = _broken_command.reduce(function () { });
                this._commands[_broken_command][_command_function](_command_options);
            }
        }
        return;
        // }
    };
    return __Console;
}());
var Terminal = __Console;
exports.default = Terminal;
