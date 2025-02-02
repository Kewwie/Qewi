import { Qewi } from "../qewi";
import { ClientEvents } from "discord.js";
import { Event, EventList } from "./eventTypes";

export class EventHandler {
    public globalListeners = new Map<string, Event>();
    public guildListeners = new Map<string, Map<string, Event>>();

    private qewi: Qewi;
    constructor(qewi: Qewi) {
        this.qewi = qewi;

        // Bind event listeners
        for (const value of Object.values(EventList)) {
            this.qewi.client.on(value as keyof ClientEvents, (...args) => this._onEvent(value, ...args));
        }
    }

    private async _onEvent(key: string, ...args: any[]): Promise<void> {
        var globalEvent = this.getGlobalEvent(key);
        if (globalEvent) {
            var plugin = this.qewi.pluginHandler.getGlobalPlugin(globalEvent.pluginId ?? "");

            if (globalEvent.beforeTrigger) {
                await globalEvent.beforeTrigger(this.qewi, plugin, globalEvent, ...args);
            }
            await globalEvent.trigger(this.qewi, plugin, globalEvent, ...args);
            if (globalEvent.afterTrigger) {
                await globalEvent.afterTrigger(this.qewi, plugin, globalEvent, ...args);
            }
        }

        let guildId: string | null = null;

        // Determine guildId based on event type
        if (args[0] && "guild" in args[0]) {
            guildId = args[0].guild?.id || null;
        } else if (args[0] && "guildId" in args[0]) {
            guildId = args[0].guildId || null;
        }

        if (guildId) {
            var guildEvent = this.getGuildEvent(guildId, key);
            if (guildEvent) {
                var plugin = this.qewi.pluginHandler.getGuildPlugin(guildId, guildEvent.pluginId ?? "");

                if (guildEvent.beforeTrigger) {
                    await guildEvent.beforeTrigger(this.qewi, plugin, guildEvent, ...args);
                }
                await guildEvent.trigger(this.qewi, plugin, guildEvent, ...args);
                if (guildEvent.afterTrigger) {
                    await guildEvent.afterTrigger(this.qewi, plugin, guildEvent, ...args);
                }
            }
        }
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
