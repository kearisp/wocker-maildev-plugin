import {Plugin} from "@wocker/core";

import {MailDevController} from "./controllers/MailDevController";
import {MailDevService} from "./services/MailDevService";


@Plugin({
    name: "maildev",
    controllers: [
        MailDevController
    ],
    providers: [
        MailDevService
    ]
})
export default class MailDevPlugin {}
