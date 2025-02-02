import { Plugin } from "./pluginTypes";

export class PluginHandler {
    public globalPlugins = new Map<string, Plugin>();
    public guildPlugins = new Map<string, Map<string, Plugin>>();

    /* Global Plugins */

    public getGlobalPlugin(pluginId: string): Plugin | null {
        return this.globalPlugins.get(pluginId) || null;
    }

    public loadGlobalPlugin(pluginId: string, plugin: Plugin): void {
        if (this.getGlobalPlugin(pluginId)) {
            throw new Error(`Plugin ${pluginId} is already loaded globally`);
        } else {
            if (plugin.beforeLoad) plugin.beforeLoad(plugin);
            this.globalPlugins.set(pluginId, plugin);
        }
    }

    public unloadGlobalPlugin(pluginId: string): void {
        const plugin = this.getGlobalPlugin(pluginId);
        if (plugin) {
            if (plugin.beforeUnload) plugin.beforeUnload(plugin);
            this.globalPlugins.delete(pluginId);
        } else {
            throw new Error(`Plugin ${pluginId} is not loaded globally`);
        }
    }

    /* Guild Plugins */

    private _getGuildPlugins(guildId: string): Map<string, Plugin> {
        var pluginsMap = this.guildPlugins.get(guildId);
        if (!pluginsMap) {
            pluginsMap = new Map<string, Plugin>();
        }
        return pluginsMap;
    }

    private _getGuildPlugin(guildId: string, pluginId: string): Plugin | null {
        return this._getGuildPlugins(guildId).get(pluginId) || null;
    }

    private _setGuildPlugin(guildId: string, pluginId: string, plugin: Plugin): void {
        const guildPlugins = this._getGuildPlugins(guildId);
        guildPlugins.set(pluginId, plugin);
        this.guildPlugins.set(guildId, guildPlugins);
    }

    public getGuildPlugin(guildId: string, pluginId: string): Plugin | null {
        return this._getGuildPlugin(guildId, pluginId);
    }

    public loadGuildPlugin(guildId: string, pluginId: string, plugin: Plugin): void {
        if (this._getGuildPlugin(guildId, pluginId)) {
            throw new Error(`Plugin ${pluginId} is already loaded in guild ${guildId}`);
        } else {
            if (plugin.beforeLoad) plugin.beforeLoad(plugin);
            this._setGuildPlugin(guildId, pluginId, plugin);
        }
    }

    public unloadGuildPlugin(guildId: string, pluginId: string): void {
        const plugin = this._getGuildPlugin(guildId, pluginId);
        if (plugin) {
            if (plugin.beforeUnload) plugin.beforeUnload(plugin);
            this._getGuildPlugins(guildId).delete(pluginId);
        } else {
            throw new Error(`Plugin ${pluginId} is not loaded in guild ${guildId}`);
        }
    }
}
