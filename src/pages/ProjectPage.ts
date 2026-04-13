import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";
import { AddNewProjectPage } from "./AddNewProjectPage";

export class ProjectPage extends BasePage {
  private readonly newProjectCreateButtonLocator: Locator;
  constructor(page: Page) {
    super(page);

    this.newProjectCreateButtonLocator = page.locator(
      "//button[normalize-space()='Add']",
    );
  }

  async moveToAddNewProjectPage(): Promise<AddNewProjectPage> {
    await this.clickOn(this.newProjectCreateButtonLocator);
    await this.waitForPageToLoad(OrangeHrmEndpoint.ADD_PROJECT_PAGE);
    return new AddNewProjectPage(this.page);
  }
}
