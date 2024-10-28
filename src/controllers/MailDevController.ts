import {
    Controller,
    Command,
    Option
} from "@wocker/core";

import {MailDevService} from "../services/MailDevService";


@Controller()
export class MailDevController {
    public constructor(
        protected readonly mailDevService: MailDevService
    ) {}

    @Command("maildev:start")
    public async start(
        @Option("restart", {
            type: "boolean",
            alias: "r",
            description: "Restart maildev"
        })
        restart?: boolean,
        @Option("build", {
            type: "boolean",
            alias: "b",
            description: "Build image"
        })
        rebuild?: boolean
    ): Promise<void> {
        await this.mailDevService.start(restart, rebuild);
    }

    @Command("maildev:stop")
    public async stop(): Promise<void> {
        await this.mailDevService.stop();
    }
}
