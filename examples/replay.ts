import { Replayer } from '../build/src';
import { recordInterface } from './interface';

const replayer = new Replayer({
  targetUrl: 'https://test.ringcentral-bot.com/api/v1/slack/slash-command',
  port: '5000',
});

(async function () {
  await replayer
    .setScenarioName('slack_help2')
    .trigger(recordInterface(5000))
    .then((history) => console.log(history))
    .catch(e => console.log(e.message));

  replayer.shutdown();
})();
