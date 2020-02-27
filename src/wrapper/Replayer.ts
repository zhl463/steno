import path from 'path';
import { Replayer as RealReplayer, History } from '../replay/replayer';

function sleep(time: number): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time);
  });
}

interface IReplayer {
  targetUrl: string;
  port: string;
  scenariosDir?: string;
}

export class Replayer {
  private scenariosDir: string;
  private timeout: number = 2000;
  protected replayer: RealReplayer;
  protected ready: boolean;
  constructor(props: IReplayer) {
    // tslint:disable-next-line: strict-boolean-expressions
    this.scenariosDir = props.scenariosDir || path.join(process.cwd(), 'scenarios');
    this.replayer = new RealReplayer(
      props.targetUrl,
      props.port,
      this.scenariosDir,
      console.log,
    );
    this.ready = false;
  }
  public async start(): Promise<Replayer> {
    await this.replayer.start();
    this.ready = true;
    return this;
  }
  public async setScenarioName(name: string): Promise<Replayer> {
    await this.replayer.setStoragePath(path.join(this.scenariosDir, name));
    return this;
  }
  public async trigger(request: Function): Promise<History> {
    if (!this.ready) {
      await this.start();
    }
    await request();
    await sleep(this.timeout);
    const history = this.replayer.getHistory();
    this.replayer.reset();
    return history;
  }
  
  public async getHistory(): Promise<History> {
    if (!this.ready) {
      await this.start();
    }
    await sleep(this.timeout);
    const history = this.replayer.getHistory();
    this.replayer.reset();
    return history;
  }

  public shutdown(): void {
    this.replayer.server.close();
  }

  public setTimeout(time: number): Replayer {
    this.timeout = time;
    return this;
  }
}
