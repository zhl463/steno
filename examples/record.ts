import { Recorder } from '..';
import { recordInterface } from './interface';

const recorder = new Recorder({
  incomingTargetUrl: 'https://test.ringcentral-bot.com/api/v1/slack/slash-command',
  incomingPort: 3001,
  outgoingTargetUrl: 'https://test.ringcentral-bot.com/api/v1/slack/slash-command',
  outgoingPort: 3101,
});



(async function () {
  recorder.setScenarioName('slack_help2');
  await recorder.recording(recordInterface(3001));
  recorder.shutdown();
})();
