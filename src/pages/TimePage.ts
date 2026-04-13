import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";
import { ProjectPage } from "./ProjectPage";
import { CustomerPage } from "./CustomerPage";

export class TimePage extends BasePage {
  private readonly projectInfoDropdownButtonLocator: Locator;
  private readonly projectInfoDropdownOptionsLocator: Locator;
  constructor(page: Page) {
    super(page);

    this.projectInfoDropdownButtonLocator = page.locator(
      "//span[normalize-space()='Project Info']",
    );

    this.projectInfoDropdownOptionsLocator = page.locator(
      "//span[normalize-space()='Project Info']/following-sibling::ul[@class='oxd-dropdown-menu']//a[@class='oxd-topbar-body-nav-tab-link']",
    );
  }

  async moveToProjectPage(): Promise<ProjectPage> {
    this.logger.info(`Moving to Project Page`);
    await this.clickOn(this.projectInfoDropdownButtonLocator);
    await this.clickOn(
      this.projectInfoDropdownOptionsLocator.filter({ hasText: "Projects" }),
    );
    await this.waitForPageToLoad(OrangeHrmEndpoint.PROJECT_PAGE);
    return new ProjectPage(this.page);
  }

  async moveToCustomerPage(): Promise<CustomerPage> {
    this.logger.info(`Moving to Customers Page`);
    await this.clickOn(this.projectInfoDropdownButtonLocator);
    await this.clickOn(
      this.projectInfoDropdownOptionsLocator.filter({ hasText: "Customers" }),
    );
    await this.waitForPageToLoad(OrangeHrmEndpoint.CUSTOMER_PAGE);
    return new CustomerPage(this.page);
  }
}
