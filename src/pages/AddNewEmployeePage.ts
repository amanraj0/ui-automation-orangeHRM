import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";

export class AddNewEmployeePage extends BasePage {
  private readonly employeeFirstNameInputLocator: Locator;
  private readonly employeeLastNameInputLocator: Locator;
  private readonly employeeIdInputLocator: Locator;
  private readonly newEmployeeSaveButtonLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.employeeFirstNameInputLocator = page.locator(
      "//input[@name='firstName']",
    );
    this.employeeLastNameInputLocator = page.locator(
      "//input[@name='lastName']",
    );
    this.employeeIdInputLocator = page.locator(
      "//div[label[normalize-space()='Employee Id']]/following-sibling::div/input",
    );
    this.newEmployeeSaveButtonLocator = page.locator(
      "//button[normalize-space()='Save']",
    );
  }

  async createNewEmployee(employeeDetails: {
    firstName: string;
    lastName: string;
    id: string;
  }): Promise<void> {
    this.logger.info(
      `Creating new employee: ${JSON.stringify(employeeDetails)}`,
    );
    await this.writeTo(
      this.employeeFirstNameInputLocator,
      employeeDetails.firstName,
    );
    await this.writeTo(
      this.employeeLastNameInputLocator,
      employeeDetails.lastName,
    );
    await this.writeTo(this.employeeIdInputLocator, employeeDetails.id);

    await this.clickOn(this.newEmployeeSaveButtonLocator);

    this.waitForPageToLoad(OrangeHrmEndpoint.EMPLOYEE_DETAILS_PAGE);
  }

  async fetchEmployeeFirstname(): Promise<string | null> {
    return await this.getText(this.employeeFirstNameInputLocator);
  }

  async fetchEmployeeLastname(): Promise<string | null> {
    return await this.getText(this.employeeLastNameInputLocator);
  }

  async fetchEmployeeId(): Promise<string | null> {
    return await this.getText(this.employeeIdInputLocator);
  }
}
