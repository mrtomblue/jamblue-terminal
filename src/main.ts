"use strict";

import { v4 as uuidv4 } from "uuid";

const uuidGen = () => uuidv4(); // generate random id

export type TerminalItemText = string;
export type TerminalItemType = "normal" | "system" | "error" | "warning";
export type TerminalItemIcon = any;

export interface TerminalItem {
    text: TerminalItemText;
    type: TerminalItemType;
    icon: TerminalItemIcon;
}

export interface TerminalCommandGroup {}

// type Dictionary

export interface TerminalConfig {
    commands: Object;
    icons: {
        // terminal: any;
        // system: any;
        // error: any;
        // warn: any;
        // log: any;
        normal: TerminalItemIcon;
        system: TerminalItemIcon;
        error: TerminalItemIcon;
        warning: TerminalItemIcon;
    };
}

export interface TerminalStates {
    activeStates: TerminalItem;
}

// * from https://dev.to/mapleleaf/indexing-objects-in-typescript-1cgi
// `PropertyKey` is short for "string | number | symbol"
// since an object key can be any of those types, our key can too
// in TS 3.0+, putting just "string" raises an error
function hasKey<O extends object>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj;
}

function checkKeyReturn<O extends object>(
    obj: O,
    key: PropertyKey
): // key is keyof O
PropertyKey | null {
    return key in obj
        ? key
        : // ""
          null;
}

class __Console {
    #_terminal: Array<Object>;
    #_config: TerminalConfig;
    #_commands: object;
    #_states: TerminalStates;

    constructor(
        terminal: Array<Object>,
        config: TerminalConfig,
        initialStates: TerminalStates
    ) {
        // this.#_config = new Object();
        // this.#_terminal = new Array();
        this.#_terminal = terminal;
        this.#_config = config;
        this.#_states = initialStates;

        this.#_commands = {
            clear: () => this.removeAllLines(),
            // commandGroup: {
            //flags available for command
            // _flags: {},
            // actual command
            // _commands: {},
            // },
            ...this.#_config.commands,
        };
    }

    get terminal() {
        return this.#_terminal;
    }

    get config() {
        return this.#_config;
    }

    get commands() {
        return this.#_commands;
    }

    // state
    get activeText() {
        return this.#_states.activeStates.text;
    }

    set activeText(activeText: TerminalItemText) {
        this.#_states.activeStates.text = activeText;
    }

    get activeType() {
        return this.#_states.activeStates.type;
    }

    set activeType(activeType: TerminalItemType) {
        this.#_states.activeStates.type = activeType;
    }

    get activeIcon() {
        return this.#_states.activeStates.icon;
    }

    set activeIcon(activeIcon: TerminalItemIcon) {
        this.#_states.activeStates.icon = activeIcon;
    }

    matchIcon(icon: any) {
        if (typeof icon !== "string") {
            return;
        }

        switch (icon) {
            // case "terminal":
            // return this.#_config.icons.terminal;
            case "norma;":
                return this.#_config.icons.normal;
            case "system":
                return this.#_config.icons.system;
            case "error":
                return this.#_config.icons.error;
            case "warning":
                return this.#_config.icons.warning;
            // case "warn":
            // return this.#_config.icons.warn;
            // case "log":
            // return this.#_config.icons.log;

            default:
                return icon;
        }
    }

    addLine(item: TerminalItem) {
        this.#_terminal.push({
            ...item,
            icon: this.matchIcon(item.icon),
            id: uuidGen(),
        });
        return this.#_terminal;
    }

    removeAllLines() {
        this.#_terminal.length = 0;
        this.addLine({
            text: "cleared",
            type: "system",
            icon: this.#_config.icons.system,
        });
        return this.#_terminal;
    }

    log(message: TerminalItemText) {
        this.addLine({
            text: message,
            type: "normal",
            icon: this.#_config.icons.normal,
        });
    }

    warn(message: TerminalItemText) {
        this.addLine({
            text: message,
            type: "warning",
            icon: this.#_config.icons.warning,
        });
    }

    error(message: TerminalItemText) {
        this.addLine({
            text: message,
            type: "error",
            icon: this.#_config.icons.error,
        });
    }

    system(message: TerminalItemText) {
        this.addLine({
            text: message,
            type: "system",
            icon: this.#_config.icons.system,
        });
    }

    response(message: string) {}

    parse(command: string) {
        // if (typeof command == "string") {
        let _broken_command: string[] = command
            .replace(/^\s+|\s+$/g, "")
            .split(" ")
            .filter((n) => n);

        //  check for empty string
        if (_broken_command.length === 1 && _broken_command[0].length === 0) {
            // this.log("");

            return;
        } else if (
            // !this.#_commands[_broken_command]
            // this.#_commands[_broken_command.toString()] == undefined
            hasKey(this.#_commands, _broken_command.toString())
            // ||
            // typeof this.#_commands[_broken_command] == "undefined"
            // ||
            // this.#_commands[_broken_command]() == undefined
        ) {
            this.error(
                `The term '${_broken_command}' is not recognized as the name of a command`
            );
        } else {
            if (
                _broken_command.length == 1 &&
                hasKey(this.#_commands, _broken_command.toString())
            ) {
                // checking if its only one word command to avoid processing
                this.#_commands[_broken_command.toString()]();
            } else if (
                hasKey(this.#_commands, _broken_command.toString()) &&
                _broken_command.some((v) =>
                    this.#_commands[_broken_command[0]]._flags
                        .keys()
                        .includes(v)
                )
            ) {
                //check if parts of the broken command inlcude flags for the command
                let _command_function = _broken_command.reduce(() => {});
                let _command_options = _broken_command.reduce(() => {});

                this.#_commands[_broken_command][_command_function](
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
