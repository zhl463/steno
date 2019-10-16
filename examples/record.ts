import axios from 'axios';
import { Recorder } from '../src';

const recorder = new Recorder({
  incomingTargetUrl: 'http://127.0.0.1:5500/',
  incomingPort: 3000,
  outgoingTargetUrl: 'http://127.0.0.1:5500/',
  outgoingPort: 3100,
});

(async function () {
  recorder.setScenarioName('test');
  await recorder.recording(() => axios.get('http://127.0.0.1:3000?test=2'));
  recorder.setScenarioName('test1');
  await recorder.recording(() => axios.get('http://127.0.0.1:3000?test=3'));
  recorder.shutdown();
})();
