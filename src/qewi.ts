import { EventEmitter } from "events";
import { Client } from "discord.js";

import { PluginHandler } from "./plugins/pluginHandler";
import { Plugin } from "./plugins/pluginTypes";

export class Qewi extends EventEmitter {
    public client: Client;
    public config: any = {};

    public pluginHandler = new PluginHandler();

    constructor(client: Client, config: any) {
        super();

        this.client = client;
        this.config = config;
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
