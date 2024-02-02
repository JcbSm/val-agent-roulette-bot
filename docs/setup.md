# Set Up
There are a few pre-requesites to testing this:

0. [Install node.js](https://discordjs.guide/preparations/#installing-node-js)

1. [Set up a Discord application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) (a bot)

2. [Add the bot to your server(s)](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)
    - Select `bot` and `application.commands` scopes
    - Select the following permissions:
        - Manage Webhooks
        - Send Messages
        - Send Messages in Threads
        - Embed Links
        - Attach Files
        - Read Message History
        - Add Reactions

3. Add [your bots token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-bot-s-token) to the project environment
```
project_root> $ echo "TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" > .env
```

*Or just create a file called `.env` with the single line `TOKEN=...`*

4. Run the application using the `start` script
```
projet_root> $ npm run start
```