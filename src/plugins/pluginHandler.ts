export class PluginHandler {
    public globalPlugins = new Map<string, Function>();
    public guildPlugins = new Map<string, Map<string, any>>();

    private _getGuildPlugin(id: string): Map<string, any> {
        return this.guildPlugins.get(id) || new Map<string, any>();
    }

    private _saveGuildPlugin(id: string, plugin: any): void {
        this.guildPlugins.set(id, plugin);
    }
}
