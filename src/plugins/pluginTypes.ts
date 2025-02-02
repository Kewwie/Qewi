import { PermissionResolvable } from "discord.js";
import { Command } from "../commands/commandTypes";
import { Event } from "../events/eventTypes";

export interface Plugin {
    id: string;
    description?: string;

    default: {
        premissions?: Array<PermissionResolvable>;
        roles?: Array<string>;
    };

    commands?: Array<Command>;
    events?: Array<Event>;

    beforeLoad?: (plugin: Plugin) => Promise<void> | void;
    afterLoad?: (plugin: Plugin) => Promise<void> | void;
    beforeUnload?: (plugin: Plugin) => Promise<void> | void;
    afterUnload?: (plugin: Plugin) => Promise<void> | void;
}
