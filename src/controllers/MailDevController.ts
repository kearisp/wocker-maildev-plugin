import {
    Controller,
    Command
} from "@wocker/core";

import {MailDevService} from "../services/MailDevService";


@Controller()
export class MailDevController {
    public constructor(
        protected readonly mailDevService: MailDevService
    ) {}

    @Command("maildev:start")
    public async start(): Promise<void> {
        await this.mailDevService.start();
    }

    @Command("maildev:stop")
    public async stop(): Promise<void> {
        await this.mailDevService.stop();
    }
}
