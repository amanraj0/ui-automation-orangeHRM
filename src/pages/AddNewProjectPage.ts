import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";

export class AddNewProjectPage extends BasePage {
  private readonly projectnameInputLocator: Locator;
  private readonly customerNameInputLocator: Locator;
  private readonly saveProjectButtonLocator: Locator;
  private readonly editProjectPageHeaderLocator: Locator;
  private readonly customerNameAutoCompleteLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.projectnameInputLocator = page.locator(
      "//div[label[normalize-space()='Name']]/following-sibling::div/input",
    );

    this.customerNameInputLocator = page.locator(
      "//div[label[normalize-space()='Customer Name']]/following-sibling::div//input",
    );

    this.saveProjectButtonLocator = page.locator(
      "//button[normalize-space()='Save']",
    );

    this.editProjectPageHeaderLocator = page.locator(
      "//h6[normalize-space()='Edit Project']",
    );

    this.customerNameAutoCompleteLocator = page.locator(
      "//div[@class='oxd-autocomplete-option']/span",
    );
  }

  async createNewProject(projectDetails: {
    projectname: string;
    customername: string;
  }): Promise<void> {
    this.logger.info(
      `Creating new Project, Project details: ${JSON.stringify(projectDetails)}`,
    );
    await this.writeTo(
      this.projectnameInputLocator,
      projectDetails.projectname,
    );
    await this.writeTo(
      this.customerNameInputLocator,
      projectDetails.customername,
    );

    await this.waitForElementVisibility(
      this.customerNameAutoCompleteLocator.filter({
        hasText: projectDetails.customername,
      }),
    );

    await this.clickOn(
      this.customerNameAutoCompleteLocator.filter({
        hasText: projectDetails.customername,
      }),
    );

    await this.clickOn(this.saveProjectButtonLocator);

    await this.waitForPageToLoad(OrangeHrmEndpoint.ADD_PROJECT_PAGE);
  }

  async getEditPageHeaderText(): Promise<string | null> {
    this.logger.info(`Fetching Edit page header`);
    return this.getText(this.editProjectPageHeaderLocator);
  }
}
