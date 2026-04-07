import { test as base } from "@playwright/test";

import logger from "../configs/winston-logger.config";

export const test = base.extend({});

test.beforeEach(async ({}, testInfo) => {
  const workerId =
    testInfo.workerIndex !== undefined ? `W${testInfo.workerIndex}` : "main";

  process.env.PW_WORKER_ID = workerId;
  process.env.PW_TEST_NAME = testInfo.title;
  logger.info(`TEST START: "${testInfo.title}"`, {
    workerId,
    testName: testInfo.title,
    state: "STARTED",
  });
});

test.afterEach(async ({ page }, testInfo) => {
  const workerId =
    testInfo.workerIndex !== undefined ? `W${testInfo.workerIndex}` : "main";

  const testName = testInfo.title;
  const duration = testInfo.duration;

  if (testInfo.status == "passed") {
    logger.info(`TEST PASSED: ${testName}`, {
      workerId,
      testName,
      status: "PASSED",
      duration,
    });
  } else if (testInfo.status == "failed") {
    const url = page.url();
    const formattedError = testInfo.errors.map((err) => {
      const msg = err.message || "Unknown";
      const stack = err.stack || "";
      const stackLines = stack.split("\n").slice(0, 5).join("\n");

      return `${msg}\n${stackLines}`;
    });
    logger.error(`TEST FAILED: ${testName}`, {
      workerId,
      testName,
      status: "FAILED",
      duration,
      errorCount: testInfo.errors.length,
      url,
      formattedError,
    });
  }
});

export { expect } from "@playwright/test";
