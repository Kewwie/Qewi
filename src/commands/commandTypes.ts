import { Qewi } from "../qewi";
import { Plugin } from "../plugins/pluginTypes";

type CommandPayload = (qewi: Qewi, plugin: Plugin, command: Command, ...args: any) => Promise<void> | void;

export interface Command {
    id: string;
    description?: string;

    /* TODO: Add in command options for both slash commands and prefix commands */
    /* TODO: Add in both command so its slash and prefix */

    options?: Array<CommandOption>;

    execute: CommandPayload;
}

interface CommandOption {
    id: string;
    description?: string;
    type: CommandOptionType;

    /* Boolean Type */
    defaultBoolean?: boolean;

    /* Number Type */
    maxNumber?: number;
    minNumber?: number;

    /* String Type */
    maxLength?: number;
    minLength?: number;

    /* User & Member Type */
    defaultToAuthor?: string;

    /* Channel Type */
    defaultToCurrentChannel?: string;

    /* Guild Type */
    defaultToCurrentGuild?: string;
}

export enum CommandOptionType {
    Boolean = "boolean",
    Number = "number",
    String = "string",
    User = "user",
    Member = "member",
    Channel = "channel",
    Role = "role",
    Guild = "guild",
    Message = "message",
}
