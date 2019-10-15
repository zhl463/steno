import axios from 'axios';
import Replayer from './wrapper/Replayer';

const replayer = new Replayer({
  targetUrl: 'http://127.0.0.1:5500',
  port: '5000',
});

(async function () {
  await replayer
    .setScenarioName('test1')
    .trigger(() => axios.get('http://127.0.0.1:5000?test=2'))
    .then((history) => console.log(history))
    .catch(e => console.log(e.message))

  await replayer
    .setScenarioName('test')
    .trigger(() => axios.get('http://127.0.0.1:5000?test=2'))
    .then((history) => console.log(history));

  replayer.shutdown();
})();
