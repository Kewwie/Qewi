export class EventHandler {
    public globalListeners = new Map<string, Function>();
    public guildListeners = new Map<string, Map<string, Function>>();

    private _getListeners(event: string): Map<string, Function> {
        return this.guildListeners.get(event) || new Map<string, Function>();
    }

    private _saveListeners(event: string, listeners: Map<string, Function>): void {
        this.guildListeners.set(event, listeners);
    }

    public addListener(event: string, id: string, listener: Function): void {
        const listeners = this._getListeners(event);
        listeners.set(id, listener);
        this._saveListeners(event, listeners);
    }

    public deleteListener(event: string, id: string): void {
        const listeners = this._getListeners(event);
        listeners.delete(id);
        this._saveListeners(event, listeners);
    }
}
