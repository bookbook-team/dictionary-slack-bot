# dictionary-slack-bot

make dictionary for your team mates.

Add this bot to your slack!

<a href="https://slack.com/oauth/v2/authorize?client_id=1979864452692.4160834459763&scope=app_mentions:read,chat:write,chat:write.customize,chat:write.public,im:read,im:write,channels:history,groups:history,im:history,mpim:history,commands&user_scope="><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

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

### slack bolt

- `${baseURl}/slack/events`: event handlers
- `${baseURl}/slack/install`: show slack install button
- `${baseURl}/slack/oauth_redirect`: oauth redirect uri provided by slack bolt

### TODO

- deploy to aws
- support other languages
  - https://api.slack.com/start/designing/localizing

## trouble shooting

- `[WARN] bolt-app http request failed unable to get local issuer certificate`: turn off proxy
