import logger from "../configs/winston-logger.config";

export class Logger {
  static for(target: Function | string) {
    const context =
      typeof target === "string" ? target : target.name || "Anonymous";
    const workerId = process.env.PW_WORKER_ID || "main";
    const testName = process.env.PW_TEST_NAME;

    return {
      debug: (message: string, meta?: Record<string, unknown>) =>
        logger.debug(message, {
          context,
          workerId,
          testName,
          ...meta,
        }),

      info: (message: string, meta?: Record<string, unknown>) =>
        logger.info(message, {
          context,
          workerId,
          testName,
          ...meta,
        }),

      warn: (message: string, meta?: Record<string, unknown>) =>
        logger.warn(message, {
          context,
          workerId,
          testName,
          ...meta,
        }),

      error: (
        message: string,
        error?: unknown,
        meta?: Record<string, unknown>,
      ) => {
        if (error instanceof Error) {
          logger.error(message, {
            context,
            workerId,
            testName,
            errorMessage: error.message,
            stack: error.stack,
            ...meta,
          });
          return;
        }
        logger.error(message, { context, testName, workerId, ...meta });
      },
    };
  }
}
