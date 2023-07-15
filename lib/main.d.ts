export type TerminalItemText = string;
export type TerminalItemType = "normal" | "system" | "error" | "warning";
export type TerminalItemIcon = any;
export interface TerminalItem {
    text: TerminalItemText;
    type: TerminalItemType;
    icon: TerminalItemIcon;
}
export interface TerminalCommandGroup {
}
export interface TerminalConfig {
    commands: Object;
    icons: {
        normal: TerminalItemIcon;
        system: TerminalItemIcon;
        error: TerminalItemIcon;
        warning: TerminalItemIcon;
    };
}
export interface TerminalStates {
    activeStates: TerminalItem;
}
declare class __Console {
    #private;
    constructor(terminal: Array<Object>, config: TerminalConfig, initialStates: TerminalStates);
    get terminal(): Object[];
    get config(): TerminalConfig;
    get commands(): object;
    get activeText(): TerminalItemText;
    set activeText(activeText: TerminalItemText);
    get activeType(): TerminalItemType;
    set activeType(activeType: TerminalItemType);
    get activeIcon(): TerminalItemIcon;
    set activeIcon(activeIcon: TerminalItemIcon);
    matchIcon(icon: any): any;
    addLine(item: TerminalItem): Object[];
    removeAllLines(): Object[];
    log(message: TerminalItemText): void;
    warn(message: TerminalItemText): void;
    error(message: TerminalItemText): void;
    system(message: TerminalItemText): void;
    response(message: string): void;
    parse(command: string): void;
}
declare const Terminal: typeof __Console;
export default Terminal;
//# sourceMappingURL=main.d.ts.map