import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { DashboardPage } from "./DashboardPage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";

export class LoginPage extends BasePage {
  private readonly userNameInputFieldLocator: Locator;
  private readonly passwordInputFieldLocator: Locator;
  private readonly loginButtonLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.userNameInputFieldLocator = page.locator("//input[@name='username']");
    this.passwordInputFieldLocator = page.locator("//input[@name='password']");
    this.loginButtonLocator = page.locator(
      "//button[contains(@class,'orangehrm-login-button')]",
    );
  }

  async moveToLoginPage(): Promise<void> {
    this.logger.info(
      `Moving to Login Page, endpoint:${OrangeHrmEndpoint.LOGIN_PAGE}`,
    );
    this.navigateTo(OrangeHrmEndpoint.LOGIN_PAGE);
  }

  async doLogin(username: string, password: string): Promise<DashboardPage> {
    this.logger.info(`Initiating login flow with username:${username}`);
    await this.writeTo(this.userNameInputFieldLocator, username);
    await this.writeTo(this.passwordInputFieldLocator, password);
    await this.clickOn(this.loginButtonLocator);
    this.waitForPageToLoad(OrangeHrmEndpoint.DASHBOARD_PAGE);
    this.logger.info(`Login successfull for  username:${username}`);
    return new DashboardPage(this.page);
  }
}
