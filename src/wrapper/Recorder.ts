
import path from 'path';

import { Recorder as RealRecorder } from '../record/recorder';

interface IRecorder {
  incomingTargetUrl: string;
  incomingPort: number;
  outgoingTargetUrl: string;
  outgoingPort: number;
  scenariosDir?: string;
}

export class Recorder {
  protected recorder: RealRecorder;
  protected ready: boolean;
  private scenariosDir: string;
  constructor(props: IRecorder) {
    // tslint:disable-next-line: strict-boolean-expressions
    this.scenariosDir = props.scenariosDir || path.join(process.cwd(), 'scenarios');
    this.recorder = new RealRecorder(
      { targetUrl: props.incomingTargetUrl },
      props.incomingPort,
      { targetUrl: props.outgoingTargetUrl },
      props.outgoingPort,
      this.scenariosDir,
      [],
    );
    this.ready = false;
  }
  public async start(): Promise<Recorder> {
    await this.recorder.start();
    this.ready = true;
    return this;
  }

  public setScenarioName(name: string): void {
    this.recorder.setStoragePath(path.join(this.scenariosDir, name));
  }

  public async recording(request: Function): Promise<Recorder> {
    if (!this.ready) {
      await this.start();
    }
    await request();
    return this;
  }
  public shutdown(): void {
    process.exit(0);
  }
}
