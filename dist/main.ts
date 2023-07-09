"use strict";

import { v4 as uuidv4 } from "uuid";

const uuidGen = () => uuidv4(); // generate random id

export interface TerminalItem {
    text: String;
    type: String;
    icon: any;
}

export interface TerminalCommandGroup {}

// type Dictionary

interface TerminalConfig {
    commands: Object;
    icons: {
        terminal: any;
        system: any;
        error: any;
        warn: any;
        log: any;
    };
}

// * from https://dev.to/mapleleaf/indexing-objects-in-typescript-1cgi
// `PropertyKey` is short for "string | number | symbol"
// since an object key can be any of those types, our key can too
// in TS 3.0+, putting just "string" raises an error
function hasKey<O extends object>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj;
}

class __Console {
    _terminal: Array<Object>;
    _config: TerminalConfig;
    _commands: Object;

    constructor(terminal: Array<Object>, config: TerminalConfig) {
        // this._config = new Object();
        // this._terminal = new Array();
        this._terminal = terminal;
        this._config = config;

        this._commands = {
            clear: () => this.removeAllLines(),
            // commandGroup: {
            //flags available for command
            // _flags: {},
            // actual command
            // _commands: {},
            // },
            ...this._config.commands,
        };
    }

    addLine(item: TerminalItem) {
        this._terminal.push({ ...item, id: uuidGen() });
        return this._terminal;
    }

    removeAllLines() {
        this._terminal.length = 0;
        this.addLine({
            text: "cleared",
            type: "system",
            icon: this._config.icons.terminal,
        });
        return this._terminal;
    }

    get lines() {
        return this._terminal;
    }

    log(message: String) {
        this.addLine({
            text: message,
            type: "normal",
            icon: this._config.icons.log,
        });
    }

    warn(message: String) {
        this.addLine({
            text: message,
            type: "warning",
            icon: this._config.icons.warn,
        });
    }

    error(message: String) {
        this.addLine({
            text: message,
            type: "error",
            icon: this._config.icons.error,
        });
    }

    system(message: String) {
        this.addLine({
            text: message,
            type: "system",
            icon: this._config.icons.system,
        });
    }

    response(message: String) {}

    parse(command: String) {
        // if (typeof command == "string") {
        let _broken_command: Array<String> = command
            .replace(/^\s+|\s+$/g, "")
            .split(" ")
            .filter((n) => n);

        //  check for empty string
        if (_broken_command.length === 1 && _broken_command[0].length === 0) {
            // this.log("");

            return;
        } else if (
            // !this._commands[_broken_command]
            // this._commands[_broken_command.toString()] == undefined
            hasKey(this._commands, _broken_command.toString())
            // ||
            // typeof this._commands[_broken_command] == "undefined"
            // ||
            // this._commands[_broken_command]() == undefined
        ) {
            this.error(
                `The term '${_broken_command}' is not recognized as the name of a command`
            );
        } else {
            if (
                _broken_command.length == 1 &&
                hasKey(this._commands, _broken_command.toString())
            ) {
                // checking if its only one word command to avoid processing
                this._commands[_broken_command.toString()]();
            } else if (
                hasKey(this._commands, _broken_command.toString()) &&
                _broken_command.some((v) =>
                    this._commands[_broken_command[0]]._flags.keys().includes(v)
                )
            ) {
                //check if parts of the broken command inlcude flags for the command
                let _command_function = _broken_command.reduce(() => {});
                let _command_options = _broken_command.reduce(() => {});

                this._commands[_broken_command][_command_function](
                    _command_options
                );
            }
        }

        return;
        // }
    }
}

const Terminal = __Console;
export default Terminal;

// console.log(Terminal);
