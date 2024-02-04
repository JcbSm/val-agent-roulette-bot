import { Logger, createLogger, format, transports } from "winston"
const { combine, timestamp, label, printf } = format;

export class LoggerFactory {

    private static format = printf(({ level, message, label }) => {
        return `[${label}] ${message}`;
      });

    public static create(name: string): Logger {
        return createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: combine(
                label({ label: name }),
                this.format
              ),
            transports: [new transports.Console()]
        })
    }

}