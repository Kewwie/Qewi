import { Qewi } from "../qewi";
import { Event } from "./eventTypes";

export class EventHandler {
    public globalListeners = new Map<string, Event>();
    public guildListeners = new Map<string, Map<string, Event>>();

    private qewi: Qewi;
    constructor(qewi: Qewi) {
        this.qewi = qewi;
    }

    /* Global Events */

    public getGlobalEvent(eventId: string): Event | null {
        return this.globalListeners.get(eventId) || null;
    }

    public loadGlobalEvent(event: Event): void {
        if (this.getGlobalEvent(event.id)) {
            throw new Error(`Event ${event.id} is already loaded globally`);
        } else {
            this.globalListeners.set(event.id, event);
        }
    }

    public unloadGlobalEvent(eventId: string): void {
        const event = this.getGlobalEvent(eventId);
        if (event) {
            this.globalListeners.delete(eventId);
        } else {
            throw new Error(`Event ${eventId} is not loaded globally`);
        }
    }

    /* Guild Events */

    private _getGuildListeners(guildId: string): Map<string, Event> {
        var eventsMap = this.guildListeners.get(guildId);
        if (!eventsMap) {
            eventsMap = new Map<string, Event>();
        }
        return eventsMap;
    }

    private _getGuildListener(guildId: string, eventId: string): Event | null {
        return this._getGuildListeners(guildId).get(eventId) || null;
    }

    private _setGuildListener(guildId: string, eventId: string, event: Event): void {
        const guildEvents = this._getGuildListeners(guildId);
        guildEvents.set(eventId, event);
        this.guildListeners.set(guildId, guildEvents);
    }

    public getGuildEvent(guildId: string, eventId: string): Event | null {
        return this._getGuildListener(guildId, eventId);
    }

    public loadGuildEvent(guildId: string, event: Event): void {
        if (this.getGuildEvent(guildId, event.id)) {
            throw new Error(`Event ${event.id} is already loaded in guild ${guildId}`);
        } else {
            this._setGuildListener(guildId, event.id, event);
        }
    }

    public unloadGuildEvent(guildId: string, eventId: string): void {
        const event = this.getGuildEvent(guildId, eventId);
        if (event) {
            this._getGuildListeners(guildId).delete(eventId);
        } else {
            throw new Error(`Event ${eventId} is not loaded in guild ${guildId}`);
        }
    }
}
