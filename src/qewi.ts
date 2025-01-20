import { EventEmitter } from "events";
import { Client } from "discord.js";

import { EventHandler } from "./events/eventHandler";

export class Qewi extends EventEmitter {
    public client: Client;
    public config: any = {};

    public EventHandler = new EventHandler();

    constructor(client: Client, config: any) {
        super();

        this.client = client;
        this.config = config;
    }
}
