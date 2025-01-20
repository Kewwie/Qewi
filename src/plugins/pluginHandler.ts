export class PluginHandler {
    public globalPlugins = new Map<string, Function>();
    public guildPlugins = new Map<string, Map<string, Function>>();

    private _getGuildPlugins(event: string): Map<string, Function> {
        return this.guildPlugins.get(event) || new Map<string, Function>();
    }

    private _saveGuildPlugins(event: string, listeners: Map<string, Function>): void {
        this.guildPlugins.set(event, listeners);
    }
}
