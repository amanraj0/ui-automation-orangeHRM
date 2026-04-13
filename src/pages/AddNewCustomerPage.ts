import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";

export class AddNewCustomerPage extends BasePage {
  private readonly customerNameInputLocator: Locator;
  private readonly saveCustomerButtonLocator: Locator;
  constructor(page: Page) {
    super(page);

    this.customerNameInputLocator = page.locator(
      "//div[label[normalize-space()='Name']]/following-sibling::div/input",
    );

    this.saveCustomerButtonLocator = page.locator(
      "//button[normalize-space()='Save']",
    );
  }

  async createNewCustomer(customerName: string): Promise<void> {
    this.logger.info(`Creating new customer, Customer Name: ${customerName}`);
    await this.writeTo(this.customerNameInputLocator, customerName);
    await this.clickOn(this.saveCustomerButtonLocator);
    await this.waitForPageToLoad(OrangeHrmEndpoint.CUSTOMER_PAGE);
  }
}
