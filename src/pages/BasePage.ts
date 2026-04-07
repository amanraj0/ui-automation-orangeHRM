import { Locator, type Page } from "@playwright/test";
import {
  EnvironmentConfig,
  getEnvironmentConfig,
} from "../configs/environment.config";
import { Logger } from "../utils/LoggerUtil";

export class BasePage {
  protected readonly page: Page;
  private readonly baseUrl: string;
  private readonly config: EnvironmentConfig = getEnvironmentConfig();
  protected logger;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = this.config.baseUrl;
    this.logger = Logger.for(this.constructor.name);
  }

  async navigateTo(endpoint: string = "", timeout?: number): Promise<void> {
    const fullUrl = this.baseUrl + endpoint;

    const navigationTimeout = timeout || this.config.timeout.navigation;

    this.logger.debug(`Navigating to URL: ${fullUrl}`, {
      navigationTimeout,
    });

    try {
      await this.page.goto(fullUrl, {
        timeout: navigationTimeout,
        waitUntil: "domcontentloaded",
      });

      this.logger.info(`Navigated to ${fullUrl}`);
    } catch (error: unknown) {
      const reason = error instanceof Error ? error.message : "Unknown Error";

      const navigationError = {
        Error: "UI_NAVIGATION_ERROR",
        Url: fullUrl,
        Navigation_Timeout: navigationTimeout,
        reason,
        casue: error,
      };

      this.logger.error(
        `Navigation for failed URL: ${fullUrl} (timeout:navigationTimeout)`,
        navigationError,
      );

      throw error;
    }
  }

  async waitForElementVisibility(
    locator: Locator,
    timeout?: number,
  ): Promise<void> {
    const elementTimeout = timeout || this.config.timeout.elementTimeout;

    this.logger.debug(
      `waiting for visibility of element: ${locator.toString()}, (timeout: elementTimeout)`,
    );

    try {
      await locator.waitFor({
        state: "visible",
        timeout: elementTimeout,
      });
      this.logger.debug(`Found element: ${locator.toString()}`);
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown Error";

      const elementTimeoutError = {
        Error: "ELEMENT_VISIBILITY_ERROR",
        Locator: locator.toString(),
        State: "visible",
        elementTimeout,
        reason,
        casue: error,
      };

      this.logger.error(
        `Couldn't find element: ${locator.toString()} (timeout:elementTimeout)`,
        elementTimeoutError,
      );

      throw error;
    }
  }

  async clickOn(
    locator: Locator,
    options?: { force?: boolean; timeout?: number },
  ): Promise<void> {
    const timeout = options?.timeout || this.config.timeout.actionTimeout;

    try {
      await locator.click({
        force: options?.force || false,
        timeout,
      });

      this.logger.debug(`Successfully clicked element: ${locator.toString()}`);
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown Error";

      const elementClickError = {
        Error: "ELEMENT_CLICK_ERROR",
        Locator: locator.toString(),
        timeout,
        force: options?.force || false,
        reason,
        cause: error,
      };

      this.logger.error(
        `Couldn't click element: ${locator.toString()} (timeout)`,
        elementClickError,
      );

      throw error;
    }
  }

  async writeTo(
    locator: Locator,
    value: string,
    options?: { timeout?: number; force?: boolean },
  ): Promise<void> {
    const timeout = options?.timeout || this.config.timeout.actionTimeout;

    try {
      await locator.fill(value, {
        force: options?.force || false,
        timeout,
      });
      this.logger.debug(`Successfully wrote in element: ${locator.toString()}`);
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown Error";

      const elementWriteError = {
        Error: "ELEMENT_WRITE_ERROR",
        Locator: locator.toString(),
        timeout,
        force: options?.force || false,
        reason,
        cause: error,
      };

      this.logger.error(
        `Couldn't write in element: ${locator.toString()} (timeout)`,
        elementWriteError,
      );

      throw error;
    }
  }

  async waitForPageToLoad(endpoint: string, timeout?: number): Promise<void> {
    const navigationTimeout = timeout || this.config.timeout.navigation;
    this.logger.debug(
      `waiting for page to load , endpoint:${endpoint}, (timeout: navigationTimeout)`,
    );

    try {
      await this.page.waitForURL(new RegExp(`.*${endpoint}.*`), {
        waitUntil: "domcontentloaded",
        timeout: navigationTimeout,
      });

      this.logger.info(`Page loaded successfully , endpoint:${endpoint}`);
    } catch (error: unknown) {
      const reason = error instanceof Error ? error.message : "Unknown Error";
      const navigationError = {
        Error: "UI_NAVIGATION_ERROR",
        Endpoint: endpoint,
        Navigation_Timeout: navigationTimeout,
        reason,
        casue: error,
      };

      this.logger.error(
        `Navigation for failed Endpoint: ${endpoint}`,
        navigationError,
      );

      throw error;
    }
  }
}
