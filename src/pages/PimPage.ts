import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";

export class PimPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async moveToPimPage(): Promise<void> {
    this.logger.info(
      `Moving to PIM Page, endpoint:${OrangeHrmEndpoint.PIM_PAGE}`,
    );
    await this.navigateTo(OrangeHrmEndpoint.PIM_PAGE);
  }
}
