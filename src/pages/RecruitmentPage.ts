import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { OrangeHrmEndpoint } from "../constants/endpoint.constants";
import { VacancyPage } from "./VacancyPage";

export class RecruitmentPage extends BasePage {
  private readonly vacanciesButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.vacanciesButtonLocator = page.locator(
      "//li[contains(@class,'oxd-topbar-body-nav-tab')]/a[normalize-space()='Vacancies']",
    );
  }

  async moveToVacancyPage(): Promise<VacancyPage> {
    this.logger.info("Moving to Vacnacy Page");
    await this.clickOn(this.vacanciesButtonLocator);
    await this.waitForPageToLoad(OrangeHrmEndpoint.VACANCY_PAGE);
    return new VacancyPage(this.page);
  }
}
