interface TerminalItem {
    text: String;
    type: String;
    icon: any;
}
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
declare class __Console {
    _terminal: Array<Object>;
    _config: TerminalConfig;
    _commands: Object;
    constructor(terminal: Array<Object>, config: TerminalConfig);
    addLine(item: TerminalItem): Object[];
    removeAllLines(): Object[];
    get lines(): Object[];
    log(message: String): void;
    warn(message: String): void;
    error(message: String): void;
    system(message: String): void;
    response(message: String): void;
    parse(command: String): void;
}
declare const Terminal: typeof __Console;
export default Terminal;
