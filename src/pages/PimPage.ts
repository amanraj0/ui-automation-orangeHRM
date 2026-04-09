import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";
import { AddNewEmployeePage } from "./AddNewEmployeePage";

export class PimPage extends BasePage {
  private readonly createNewEmployeeButtonLocator: Locator;
  constructor(page: Page) {
    super(page);

    this.createNewEmployeeButtonLocator = page.locator(
      "//div[@class='orangehrm-header-container']/button",
    );
  }

  async moveToAddNewEmployeePage(): Promise<AddNewEmployeePage> {
    this.logger.info("Moving to new Employee creation page");
    this.clickOn(this.createNewEmployeeButtonLocator);
    await this.waitForPageToLoad(OrangeHrmEndpoint.ADD_EMPLOYEE_PAGE);
    return new AddNewEmployeePage(this.page);
  }
}
