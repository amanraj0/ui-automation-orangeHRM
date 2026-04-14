import { test as setup } from "@playwright/test";
import path from "path";
import fs from "fs";
import logger from "../../configs/winston-logger.config";
import { DashboardPage } from "../../pages/DashboardPage";
import { OrangeHrmEndpoint } from "../../constants/endpoint.constants";
import { LoginPage } from "../../pages/LoginPage";

const STORAGE_STATE = path.join(
  __dirname,
  "../../../playwright/.auth/user.json",
);

const authDir = path.dirname(STORAGE_STATE);

if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir, { recursive: true });
}

setup("authenticate", async ({ page }) => {
  logger.debug("Starting authentication setup");

  if (fs.existsSync(STORAGE_STATE)) {
    logger.debug(`Storage State file exist`);
    try {
      const stateString = fs.readFileSync(STORAGE_STATE, "utf-8");
      const stateJson = JSON.parse(stateString);

      if (stateJson.cookies?.length) {
        logger.debug("Adding cookies to page context");
        await page.context().addCookies(stateJson.cookies);

        logger.debug("Navigation to dashboard page to check for valid session");

        await new DashboardPage(page).moveToDashboardPage();

        if (!page.url().includes(OrangeHrmEndpoint.LOGIN_PAGE)) {
          logger.info("Existing session is valid, skipping login");
          return;
        }
        logger.info("Session expired, performing fresh login");
      }
    } catch (error) {
      logger.info("Corrupted storage state, performing fresh login");
    }
  } else {
    logger.info("No storage state file found, performing fresh login");
  }

  const loginPage = new LoginPage(page);
  await loginPage.moveToLoginPage();

  await loginPage.doLogin(process.env.TEST_USER, process.env.TEST_PASSWORD);

  logger.debug("Saving new Auth state");

  await page.context().storageState({ path: STORAGE_STATE });
  logger.debug(`Auth state saved successfully at ${STORAGE_STATE}`);
});
