# Steno-x
With `Steno-x`, you can record a request at first time using `Recorder`. Then replay the response using the recorded request at first time using `Replayer`. `steno-x` can send the request which recorded at first and get the real response from server. It's useful to do `Interface testing`.
## Record
Record request
```ts
import { Recorder } from 'steno-x';

const recorder = new Recorder({
  incomingTargetUrl: targetApi, // The real api you want to request
  incomingPort: recordProxy.incomingPort, // local port which listen the request
  outgoingTargetUrl: targetApi, // unused now
  outgoingPort: recordProxy.outgoingPort, // unused now
});

(async function () {
  recorder.setScenarioName('teams_call');
  await recorder.recording(recordInterface(proxyApi)); // record request
  recorder.shutdown();
})();

```

## Replay
Replay response using the recorded request and the do some testing.
```ts
import { Replayer } from 'steno-x';

const replayer = new Replayer({
  targetUrl: targetApi, // The real api you want to request
  port: `${replayProxy.port}`, // local port which listen the request
  scenariosDir: path.join(__dirname, 'scenarios'), // Load scenarios which have been recorded
});

// test suite
test('demo', async () => {
  replayer
    .setTimeout(4000)
    .setScenarioName('teams_call')

  const history = await replayer.trigger(recordInterface(proxyApi));
  const response = history.interactions[0].response

  const body = JSON.parse(response.body.toString());
  expect(body.task.type).toEqual('continue');
  replayer.shutdown();
});

```
