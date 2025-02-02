import { Client } from "discord.js";

import { PluginHandler } from "./plugins/pluginHandler";
import { Plugin } from "./plugins/pluginTypes";

import { EventHandler } from "./events/eventHandler";

export interface QewiConfig {
    prefix: string;
}

export class Qewi {
    public client: Client;
    public config: QewiConfig;

    public pluginHandler: PluginHandler;
    public eventHandler: EventHandler;

    constructor(client: Client, config: QewiConfig) {
        this.client = client;
        this.config = config;

        this.pluginHandler = new PluginHandler(this);
        this.eventHandler = new EventHandler(this);
    }

    /* Plugin Handler */

    public async loadGlobalPlugins(plugins: Array<Plugin>): Promise<void> {
        // Load global plugins
        for (const plugin of plugins) {
            this.pluginHandler.loadGlobalPlugin(plugin.id, plugin);
        }
    }

    public async unloadGlobalPlugins(pluginIds: Array<string>): Promise<void> {
        // Unload global plugins
        for (const pluginId of pluginIds) {
            this.pluginHandler.unloadGlobalPlugin(pluginId);
        }
    }

    public async loadGuildPlugins(guildId: string, plugins: Array<Plugin>): Promise<void> {
        // Load guild plugins
        for (const plugin of plugins) {
            this.pluginHandler.loadGuildPlugin(guildId, plugin.id, plugin);
        }
    }

    public async unloadGuildPlugins(guildId: string, pluginIds: Array<string>): Promise<void> {
        // Unload guild plugins
        for (const pluginId of pluginIds) {
            this.pluginHandler.unloadGuildPlugin(guildId, pluginId);
        }
    }
}
