import { RouletteClient } from "./lib/RouletteClient";


async function main() {

    // Get env variables
    (await import ('dotenv')).config();

    // Initialise client
    const client = new RouletteClient();
    
    // Attempt to log in.
    try {

        client.logger.verbose("Logging in...");

        // Attempt log in
        await client.login(process.env.TOKEN);

        client.logger.info("Logged in.");

    } catch (err) {
        client.logger.error(err);
    }
}

main();