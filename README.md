# dictionary-slack-bot

make dictionary for your team mates.

Add this bot to your slack!

<a href="https://slack.com/oauth/v2/authorize?scope=app_mentions%3Aread%2Cchannels%3Ahistory%2Cchat%3Awrite%2Cchat%3Awrite.customize%2Cchat%3Awrite.public%2Ccommands%2Cgroups%3Ahistory%2Cim%3Ahistory%2Cim%3Aread%2Cim%3Awrite%2Cmpim%3Ahistory&amp;user_scope=&amp;redirect_uri=https%3A%2F%2Fgithub.com%2Fbookbook-team%2Fdictionary-slack-bot&amp;client_id=1979864452692.4160834459763" style="align-items:center;color:#fff;background-color:#4A154B;border:0;border-radius:4px;display:inline-flex;font-family:Lato, sans-serif;font-size:16px;font-weight:600;height:48px;justify-content:center;text-decoration:none;width:236px"><svg xmlns="http://www.w3.org/2000/svg" style="height:20px;width:20px;margin-right:12px" viewBox="0 0 122.8 122.8"><path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"></path><path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"></path><path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"></path><path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"></path></svg>Add to Slack</a>

## how to use this bot

### commands

- `/create-dict <word>`: create word and description
- `/update-dict <word>`: update word description
- `@<slack bot name> <word>`: mention bot name with the word you want to know (before mentioned, the app must be added to the channel)
  - ex. `@dictionary-bot asap`

### usage

- <img width="649" alt="스크린샷 2022-10-02 오후 9 36 44" src="https://user-images.githubusercontent.com/41788121/193454493-54c4a8d9-4717-46f1-8400-a0baf590d5fe.png">
- <img width="490" alt="스크린샷 2022-10-02 오후 9 37 17" src="https://user-images.githubusercontent.com/41788121/193454498-ea8be92e-d964-4bcf-8f44-c166b8e757c6.png">

## development

### slack socket mode

- socket mode: https://slack.dev/node-slack-sdk/socket-mode
- type of events: https://api.slack.com/events
- block kit builder: https://app.slack.com/block-kit-builder

### TODO

- auth
  - https://slack.dev/bolt-js/concepts#authenticating-oauth
- connect db
  - distict the dictionaries by organization(? workspace?)
- deploy to heroku
- support other languages
  - https://api.slack.com/start/designing/localizing

## trouble shooting

- `[WARN] bolt-app http request failed unable to get local issuer certificate`: turn off proxy
