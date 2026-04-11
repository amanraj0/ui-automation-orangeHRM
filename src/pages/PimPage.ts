import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";
import { AddNewEmployeePage } from "./AddNewEmployeePage";

export class PimPage extends BasePage {
  private readonly createNewEmployeeButtonLocator: Locator;
  private readonly employeeNameSearchInputLocator: Locator;
  private readonly searchEmployeeButtonLocator: Locator;
  private readonly searchEmployeeResultRowLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.createNewEmployeeButtonLocator = page.locator(
      "//div[@class='orangehrm-header-container']/button",
    );

    this.employeeNameSearchInputLocator = page.locator(
      "//div[label[normalize-space()='Employee Name']]/following-sibling::div//input",
    );

    this.searchEmployeeButtonLocator = page.locator(
      "//button[normalize-space()='Search']",
    );

    this.searchEmployeeResultRowLocator = page.locator(
      "//div[@class='oxd-table-card']/div",
    );
  }

  async moveToAddNewEmployeePage(): Promise<AddNewEmployeePage> {
    this.logger.info("Moving to new Employee creation page");
    this.clickOn(this.createNewEmployeeButtonLocator);
    await this.waitForPageToLoad(OrangeHrmEndpoint.ADD_EMPLOYEE_PAGE);
    return new AddNewEmployeePage(this.page);
  }

  async searchForEmployee(empName: string): Promise<void> {
    this.logger.info(
      `Searching for an Employee by Name, Employee Name: ${empName}`,
    );
    await this.writeTo(this.employeeNameSearchInputLocator, empName);
    await this.clickOn(this.searchEmployeeButtonLocator);
  }

  async getEmployeeSearchResultString(): Promise<string | null> {
    this.logger.info(`Fetching the searched employee details`);
    return await this.getText(this.searchEmployeeResultRowLocator);
  }
}
