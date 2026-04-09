import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";

export class AddNewEmployeePage extends BasePage {
  private readonly employeeFirstNameInputLocator: Locator;
  private readonly employeeLastNameInputLocator: Locator;
  private readonly employeeIdInputLocator: Locator;
  private readonly newEmployeeSaveButtonLocator: Locator;
  private readonly employeeListNavHeaderLocator: Locator;
  private readonly loadingSpinnerLocator: Locator;

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
    this.newEmployeeSaveButtonLocator = page.getByRole("button", {
      name: "Save",
    });

    this.employeeListNavHeaderLocator = page.locator(
      "//li[a[normalize-space()='Employee List']]",
    );

    this.loadingSpinnerLocator = page.locator(".oxd-loading-spinner");
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

    await this.waitForPageToLoad(OrangeHrmEndpoint.EMPLOYEE_DETAILS_PAGE);
  }

  async fetchEmployeeFirstname(): Promise<string | null> {
    this.logger.info(`Fetching Employee First Name on Employee List Page}`);
    return await this.getText(this.employeeFirstNameInputLocator);
  }

  async fetchEmployeeLastname(): Promise<string | null> {
    this.logger.info(`Fetching Employee Last Name on Employee List Page}`);
    return await this.getText(this.employeeLastNameInputLocator);
  }

  async fetchEmployeeId(): Promise<string | null> {
    this.logger.info(`Fetching Employee ID on Employee List Page}`);
    return await this.getText(this.employeeIdInputLocator);
  }

  async isEmployeeListHeaderSelected(): Promise<boolean> {
    this.waitForElementVisibility(this.employeeListNavHeaderLocator);
    const className =
      await this.employeeListNavHeaderLocator.getAttribute("class");
    return className?.includes("--visited") ?? false;
  }

  async waitForLoaderToDisappear(): Promise<void> {
    await this.waitForElementToDisappear(this.loadingSpinnerLocator);
  }
}
