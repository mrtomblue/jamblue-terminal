export interface TerminalItem {
    text: string;
    type: string;
    icon: any;
}
export interface TerminalCommandGroup {
}
export interface TerminalConfig {
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
    #private;
    constructor(terminal: Array<Object>, config: TerminalConfig);
    get terminal(): Object[];
    get config(): TerminalConfig;
    get commands(): Object;
    matchIcon(icon: any): any;
    addLine(item: TerminalItem): Object[];
    removeAllLines(): Object[];
    log(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    system(message: string): void;
    response(message: string): void;
    parse(command: string): void;
}
declare const Terminal: typeof __Console;
export default Terminal;
