import { join as pathJoin } from 'path';
import { Controller, ControllerMode } from './controller';
import { ProxyTargetConfig } from './record/http-proxy';
import { Recorder } from './record/recorder';
import { Replayer } from './replay/replayer';
import { PrintFn } from './util';
import { StenoHook } from './steno';

function createController(
  initialMode: ControllerMode, controlPort: string, scenarioName: string, scenarioDir: string,
  incomingRequestUrl: string, inPort: string,
  outgoingRequestUrl: string, outPort: string,
  hooks: StenoHook[] = [],
  print: PrintFn = console.log,
): Controller {
  const absoluteScenarioDir = pathJoin(process.cwd(), scenarioDir);

  const incomingProxyTargetConfig: ProxyTargetConfig = {
    targetUrl: incomingRequestUrl,
  };

  // TODO: conditionally read from configuration where parameters are not defined
  // TODO: can this just be a URL now that rules has been removed? what about a more atomic
  // proxyconfig that encapsulates the port and the targetUrl?
  const outgoingProxyTargetConfig: ProxyTargetConfig = {
    targetUrl: outgoingRequestUrl,
  };

  return new Controller(
    initialMode, controlPort, scenarioName, absoluteScenarioDir,
    incomingProxyTargetConfig, inPort,
    outgoingProxyTargetConfig, outPort,
    hooks,
    print,
  );
}

export {
  createController,
  Recorder,
  Replayer,
};
