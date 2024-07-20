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

    public async start(): Promise<void> {
        console.info("MailDev starting...");

        let container = await this.dockerService.getContainer(this.containerName);

        if(!container) {
            await this.build();

            container = await this.dockerService.createContainer({
                name: this.containerName,
                image: this.imageName,
                restart: "always",
                env: {
                    VIRTUAL_HOST: this.containerName
                },
                ports: [
                    "25:25"
                ]
            });

            await container.start();
        }
    }

    public async build(rebuild?: boolean): Promise<void> {
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
