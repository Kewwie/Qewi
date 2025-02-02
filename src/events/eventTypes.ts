import { Qewi } from "../qewi";
import { Plugin } from "../plugins/pluginTypes";

type EventPayload = (qewi: Qewi, plugin: Plugin, event: Event, ...args: any) => Promise<void> | void;

export interface Event {
    id: string;
    type: EventType;

    beforeEmit?: EventPayload;
    emit: EventPayload;
    afterEmit?: EventPayload;
}

export enum EventType {
    Global = "global",
    Guild = "guild",
}
