export class EventHandler {
    public globalListeners = new Map<string, Function>();
    public guildListeners = new Map<string, Map<string, Function>>();

    private _getGlobalListener(eventId: string): Function | null {
        return this.globalListeners.get(eventId) || null;
    }

    private _saveGlobalListener(eventId: string, listener: Function): void {
        this.globalListeners.set(eventId, listener);
    }

    private _deleteGlobalListener(eventId: string): void {
        this.globalListeners.delete(eventId);
    }

    private _getGuildListeners(eventId: string): Map<string, Function> {
        return this.guildListeners.get(eventId) || new Map<string, Function>();
    }

    private _saveGuildListeners(eventId: string, listeners: Map<string, Function>): void {
        this.guildListeners.set(eventId, listeners);
    }

    private _deleteGuildListeners(eventId: string): void {
        this.guildListeners.delete(eventId);
    }

    private _getGuildListener(eventId: string, guildId: string): Function | null {
        const listeners = this._getGuildListeners(eventId);
        return listeners.get(guildId) || null;
    }

    private _saveGuildListener(eventId: string, guildId: string, listener: Function): void {
        const listeners = this._getGuildListeners(eventId);
        listeners.set(guildId, listener);
        this._saveGuildListeners(eventId, listeners);
    }

    private _deleteGuildListener(eventId: string, guildId: string): void {
        const listeners = this._getGuildListeners(eventId);
        listeners.delete(guildId);
        this._saveGuildListeners(eventId, listeners);
    }

    /* PUBLIC FUNCTIONS */
    public addGlobalListener(eventId: string, listener: Function): void {
        this._saveGlobalListener(eventId, listener);
    }

    public addGuildListener(eventId: string, guildId: string, listener: Function): void {
        this._saveGuildListener(eventId, guildId, listener);
    }

    public deleteGuildListener(eventId: string, id: string): void {
        this._deleteGuildListener(eventId, id);
    }
}
