import { DiscordClient } from './lib/DiscordClient';

async function main() {

    // Get env variables
    (await import ('dotenv')).config();

    // Initialise client
    const client = new DiscordClient();
    
    // Attempt to log in.
    try {

        client.logger.verbose("Logging in...");

        // Attempt log in
        await client.login(process.env.TOKEN);

        client.logger.info("Logged in.");

        // Load the commands
        client.loadApplicationCommands();

    } catch (err) {
        client.logger.error(err);
    }
}

main();