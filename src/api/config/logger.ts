import winston from 'winston';

export const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all: true}),
        winston.format.splat()
        ),
    transports: [new winston.transports.Console({
        stderrLevels: ['error']
    })],
});