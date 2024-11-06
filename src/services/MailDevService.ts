import {
    Injectable,
    DockerService
} from "@wocker/core";
import * as Path from "path";


@Injectable()
export class MailDevService {
    protected imageName = "ws-maildev";
    protected containerName = "maildev.workspace";

    public constructor(
        protected readonly dockerService: DockerService
    ) {}

    public async start(restart?: boolean, rebuild?: boolean): Promise<void> {
        console.info("MailDev starting...");

        if(restart) {
            await this.dockerService.removeContainer(this.containerName);
        }

        let container = await this.dockerService.getContainer(this.containerName);

        if(!container) {
            await this.build(rebuild);

            container = await this.dockerService.createContainer({
                name: this.containerName,
                image: this.imageName,
                restart: "always",
                env: {
                    VIRTUAL_HOST: this.containerName,
                    VIRTUAL_PORT: "80"
                },
                ports: [
                    "25:25"
                ]
            });

            await container.start();
        }

        console.info(`Maildev started at ${this.containerName}`);
    }

    public async build(rebuild?: boolean): Promise<void> {
        if(rebuild) {
            await this.dockerService.imageRm(this.imageName);
        }

        if(!await this.dockerService.imageExists(this.imageName)) {
            await this.dockerService.buildImage({
                tag: this.imageName,
                context: Path.join(__dirname, "../../plugin"),
                src: "./Dockerfile"
            });
        }
    }

    public async stop(): Promise<void> {
        console.info("MailDev stopping...");

        await this.dockerService.removeContainer(this.containerName);
    }
}
