import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";
import { AddNewVacancyPage } from "./AddNewVacancyPage";

export class VacancyPage extends BasePage {
  private readonly moveToNewVacancyPageButtonLocator: Locator;
  private readonly vacancyDropdownLocator: Locator;
  private readonly vacancyOptionLocator: Locator;
  private readonly searchVacancyButtonLocator: Locator;
  private searchVacancyResultRowLocator: Locator;
  constructor(page: Page) {
    super(page);

    this.moveToNewVacancyPageButtonLocator = page.locator(
      "//button[normalize-space()='Add']",
    );

    this.vacancyDropdownLocator = page.locator(
      "//div[label[normalize-space()='Vacancy']]/following-sibling::div/div[@class='oxd-select-wrapper']",
    );

    this.vacancyOptionLocator = page.locator(
      "//div[label[normalize-space()='Vacancy']]/following-sibling::div//div[@class='oxd-select-option']/span",
    );

    this.searchVacancyButtonLocator = page.locator(
      "//button[normalize-space()='Search']",
    );

    this.searchVacancyResultRowLocator = page.locator(
      "//div[@class='oxd-table-card']/div",
    );
  }

  async moveToNewVacancyPage(): Promise<AddNewVacancyPage> {
    this.logger.info("Move to crete New Vacnacy Page");
    await this.clickOn(this.moveToNewVacancyPageButtonLocator);
    await this.waitForPageToLoad(OrangeHrmEndpoint.ADD_VACANCY_PAGE);
    return new AddNewVacancyPage(this.page);
  }

  async searchWithVacancyname(vacancyName: string): Promise<void> {
    this.logger.info(
      `Searching for vacancy by Name, Vacancy Name: ${vacancyName} `,
    );
    await this.clickOn(this.vacancyDropdownLocator);

    await this.clickOn(
      this.vacancyOptionLocator.filter({
        hasText: vacancyName,
      }),
    );

    await this.clickOn(this.searchVacancyButtonLocator);
  }

  async getVacancySearchResultString(): Promise<string | null> {
    this.logger.info(`Fetching the searched vacancy details`);
    return await this.getText(this.searchVacancyResultRowLocator);
  }
}
