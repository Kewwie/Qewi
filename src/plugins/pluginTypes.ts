import { PermissionResolvable } from "discord.js";
import { Command } from "../commands/commandTypes";
import { Event } from "../events/eventTypes";

export interface Plugin {
    id: string;
    description?: string;
    type: PluginType;

    defaultPremissions?: Array<PermissionResolvable>;
    defaultData?: PluginData;

    commands?: Array<Command>;
    events?: Array<Event>;

    beforeLoad?: (plugin: Plugin) => Promise<void> | void;
    beforeUnload?: (plugin: Plugin) => Promise<void> | void;
}

export enum PluginType {
    Global = "global",
    Guild = "guild",
    Developer = "developer",
}

export interface PluginData {
    enabled: boolean;
    options: Array<PluginOption>;
}

interface PluginOption {
    id: string;
    description?: string;
    type: PluginOptionType;

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

export enum PluginOptionType {
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
