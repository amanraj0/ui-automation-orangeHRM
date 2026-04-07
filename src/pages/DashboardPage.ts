import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async moveToDashboardPage(): Promise<void> {
    this.logger.info(
      `Moving to Dashboard Page, endpoint:${OrangeHrmEndpoint.DASHBOARD_PAGE}`,
    );
    await this.navigateTo(OrangeHrmEndpoint.DASHBOARD_PAGE);
  }
}
