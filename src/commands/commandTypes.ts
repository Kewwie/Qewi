import { Qewi } from "../qewi";
import { Plugin } from "../plugins/pluginTypes";

type CommandPayload = (qewi: Qewi, plugin: Plugin, command: Command, ...args: any) => Promise<void> | void;

export interface Command {
    id: string;
    description: string;
    type: CommandType;

    /* TODO: Add in command options for both slash commands and prefix commands */
    /* TODO: Add in both command so its slash and prefix */

    execute: CommandPayload;
}

export enum CommandType {
    Global = "global",
    Guild = "guild",
    Developer = "developer",
}
