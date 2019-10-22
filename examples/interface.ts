import axios from 'axios';
import querystring from 'querystring';

export function recordInterface(port: number) {
  const requestBody = {
    "team_id": "T02NULWBW",
    token: 'zPYiDF6xOOhAtJE3F26GEZr7',
    team_domain: 'ringcentral',
    channel_id: 'GL5K7LFQW',
    channel_name: 'privategroup',
    user_id: 'UL376J36D',
    user_name: 'dina.huang',
    command: '/rcdev',
    text: 'help',
    response_url: 'https://hooks.slack.com/commands/T02NULWBW/745421442549/sgZYFH27vsoxSeWGEfogm7UD',
    trigger_id: '745417153904.2776710404.1bdeac2eeb2f0ddeb3e048eb885cc68b',
  };
  function sendIncoming(res: any): any {
    const url = `http://127.0.0.1:${port}/api/v1/slack/slash-command`;
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Host': 'test.ringcentral-bot.com'
      },
    };
    return axios.post(url, querystring.stringify(res), config).then(res => console.log(res.status));
  }
  return () => sendIncoming(requestBody);
}