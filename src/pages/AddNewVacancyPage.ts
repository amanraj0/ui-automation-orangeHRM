import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AddNewVacancyPage extends BasePage {
  private vacancyNameInputLocator: Locator;
  private jobTitleDropdownLocator: Locator;
  private jobTitleOptionsLocator: Locator;
  private hiringManagerInputLocator: Locator;
  private hiringManagerAutoCompleteLocator: Locator;
  private vacancySaveButtonLocator: Locator;
  private editVacancyHeaderLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.vacancyNameInputLocator = page.locator(
      "//div[label[normalize-space()='Vacancy Name']]/following-sibling::div/input",
    );

    this.jobTitleDropdownLocator = page.locator(
      "//div[label[normalize-space()='Job Title']]/following-sibling::div/div[@class='oxd-select-wrapper']",
    );

    this.jobTitleOptionsLocator = page.locator(
      "//div[@class='oxd-select-option']/span",
    );

    this.hiringManagerInputLocator = page.locator(
      "//div[label[normalize-space()='Hiring Manager']]/following-sibling::div//input",
    );

    this.hiringManagerAutoCompleteLocator = page.locator(
      "//div[@class='oxd-autocomplete-option']/span",
    );

    this.vacancySaveButtonLocator = page.locator(
      "//button[normalize-space()='Save']",
    );

    this.editVacancyHeaderLocator = page.locator(
      "//h6[normalize-space()='Edit Vacancy']",
    );
  }

  async createNewVacancy(vacancyDetails: {
    vacancyName: string;
    jobTitle: string;
    hiringManager: string;
  }): Promise<void> {
    this.logger.info(
      `Creating new Vacancy, Vacancy Details: ${JSON.stringify(vacancyDetails)}`,
    );
    await this.writeTo(
      this.vacancyNameInputLocator,
      vacancyDetails.vacancyName,
    );
    await this.clickOn(this.jobTitleDropdownLocator);
    await this.clickOn(
      this.jobTitleOptionsLocator.filter({ hasText: vacancyDetails.jobTitle }),
    );
    await this.writeTo(
      this.hiringManagerInputLocator,
      vacancyDetails.hiringManager,
    );

    await this.clickOn(
      this.hiringManagerAutoCompleteLocator.filter({
        hasText: vacancyDetails.hiringManager,
      }),
    );

    await this.clickOn(this.vacancySaveButtonLocator);

    await this.waitForElementVisibility(this.editVacancyHeaderLocator);
  }
}
