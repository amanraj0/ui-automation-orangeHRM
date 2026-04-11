import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";
import { MenuItem } from "../constants/menuItem.constants";
import { PimPage } from "./PimPage";
import { RecruitmentPage } from "./RecruitmentPage";

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

  private async getSidebarMenuLocator(menuName: MenuItem): Promise<Locator> {
    this.logger.debug(`Constructing dynamic locator for Menu: ${menuName}`);
    const sidebarLocator: Locator = this.page.getByRole("link", {
      name: menuName,
    });
    return sidebarLocator;
  }

  async selectSidebarMenu<T extends BasePage>(
    menuName: MenuItem,
    PageClass: new (page: Page) => T,
  ): Promise<T> {
    this.logger.info(`Clicking on Menu:${menuName}`);
    this.clickOn(await this.getSidebarMenuLocator(menuName));

    switch (menuName) {
      case MenuItem.PIM:
        await this.waitForPageToLoad(OrangeHrmEndpoint.PIM_PAGE);
        return new PageClass(this.page);
      case MenuItem.RECRUITMENT:
        await this.waitForPageToLoad(OrangeHrmEndpoint.RECRUITMENT_PAGE);
        return new PageClass(this.page);
      default:
        this.logger.error(`Unsupported Menu item: ${menuName}`);
        throw new Error(`Unsupported Menu item: ${menuName}`);
    }
  }
}
