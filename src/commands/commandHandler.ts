import { Command } from "./commandTypes";

export class CommandHandler {
    public globalCommands = new Map<string, Command>();
    public guildCommands = new Map<string, Map<string, Command>>();

    private _getGlobalCommand(commandId: string): Command | null {
        return this.globalCommands.get(commandId) || null;
    }

    private _saveGlobalCommand(commandId: string, command: Command): void {
        this.globalCommands.set(commandId, command);
    }

    private _deleteGlobalCommand(commandId: string): void {
        this.globalCommands.delete(commandId);
    }

    private _getGuildCommands(id: string): Map<string, Command> {
        return this.guildCommands.get(id) || new Map<string, Command>();
    }

    private _saveGuildCommands(commandId: string, commands: Map<string, Command>): void {
        this.guildCommands.set(commandId, commands);
    }

    private _deleteGuildCommands(commandId: string): void {
        this.guildCommands.delete(commandId);
    }

    private _getGuildCommand(id: string, commandId: string): Command | null {
        const commands = this._getGuildCommands(id);
        return commands.get(commandId) || null;
    }

    private _saveGuildCommand(id: string, commandId: string, command: Command): void {
        const commands = this._getGuildCommands(id);
        commands.set(commandId, command);
        this._saveGuildCommands(id, commands);
    }

    private _deleteGuildCommand(id: string, commandId: string): void {
        const commands = this._getGuildCommands(id);
        commands.delete(commandId);
        this._saveGuildCommands(id, commands);
    }

    public addGlobalCommand(command: Command): void {
        //this._saveGlobalCommand(command);
    }

    public addGuildCommand(id: string, command: Command): void {}
}
