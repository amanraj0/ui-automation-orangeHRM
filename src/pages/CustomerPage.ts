import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";
import { AddNewCustomerPage } from "./AddNewCustomerPage";

export class CustomerPage extends BasePage {
  private readonly newCustomerCreateButtonLocator: Locator;
  private readonly customerPageHeaderLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.customerPageHeaderLocator = page.locator(
      "//h6[normalize-space()='Customers']",
    );

    this.newCustomerCreateButtonLocator = page.locator(
      "//button[normalize-space()='Add']",
    );
  }

  async moveToAddNewCustomerPage(): Promise<AddNewCustomerPage> {
    this.logger.info(`Moving to Add new Customer Page`);
    await this.clickOn(this.newCustomerCreateButtonLocator);
    await this.waitForPageToLoad(OrangeHrmEndpoint.ADD_CUSTOMER_PAGE);
    return new AddNewCustomerPage(this.page);
  }

  async getCustomerPageHeader(): Promise<string | null> {
    this.logger.info(`Fetching View Customer Page header`);
    const viewCustomerPageHeader = await this.getText(
      this.customerPageHeaderLocator,
    );
    return viewCustomerPageHeader;
  }
}
