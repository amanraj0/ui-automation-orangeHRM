import { OrangeHrmEndpoint } from "../../constants/endpoint.constants";
import { MenuItem } from "../../constants/menuItem.constants";
import { test, expect } from "../../fixtures/base.fixture";
import { AddNewEmployeePage } from "../../pages/AddNewEmployeePage";
import { AddNewVacancyPage } from "../../pages/AddNewVacancyPage";
import { DashboardPage } from "../../pages/DashboardPage";
import { PimPage } from "../../pages/PimPage";
import { RecruitmentPage } from "../../pages/RecruitmentPage";
import { VacancyPage } from "../../pages/VacancyPage";
import {
  EmployeeDetails,
  VacancyDetails,
} from "../../test-data/orangeHrmTestData";

test(
  "Validating new Vacancy Creation Flow",
  { tag: ["@smoke", "@regression"] },
  async ({ page }) => {
    let dashboardPage: DashboardPage;
    let pimPage: PimPage;
    let addEmployeePage: AddNewEmployeePage;
    let recruitmentPage: RecruitmentPage;
    let vacancyPage: VacancyPage;
    let addNewVacancyPage: AddNewVacancyPage;

    await test.step("Move to Dashboard page", async () => {
      dashboardPage = new DashboardPage(page);
      await dashboardPage.moveToDashboardPage();
      const dashboardEndpoint = OrangeHrmEndpoint.DASHBOARD_PAGE;
      const actualDashboardPageUrl = page.url();

      expect(
        actualDashboardPageUrl,
        "User successfully navigated to Dashboard page",
      ).toContain(dashboardEndpoint);
    });

    await test.step("Move to PIM Page", async () => {
      pimPage = await dashboardPage.selectSidebarMenu(MenuItem.PIM, PimPage);

      const pimEndpoint = OrangeHrmEndpoint.PIM_PAGE;
      const actualPimPageUrl = page.url();

      expect(
        actualPimPageUrl,
        "User successfully navigated to PIM page",
      ).toContain(pimEndpoint);
    });

    await test.step("Move to New Employee creation page", async () => {
      addEmployeePage = await pimPage.moveToAddNewEmployeePage();

      const addEmployeePageEndpoint = OrangeHrmEndpoint.ADD_EMPLOYEE_PAGE;
      const actualAddEmployeePageUrl = page.url();

      expect(
        actualAddEmployeePageUrl,
        "User successfully navigated to Add New Employee page",
      ).toContain(addEmployeePageEndpoint);
    });

    await test.step("Create a New Employee", async () => {
      await addEmployeePage.createNewEmployee(EmployeeDetails);

      const isEmployeeListTabIsHighlighted =
        await addEmployeePage.isEmployeeListHeaderSelected();

      expect(
        isEmployeeListTabIsHighlighted,
        "User moves to Employee List tab on successfull employee creation",
      ).toBeTruthy();
    });

    await test.step("Move to Recruitment page", async () => {
      recruitmentPage = await dashboardPage.selectSidebarMenu(
        MenuItem.RECRUITMENT,
        RecruitmentPage,
      );

      const recruitmentEndpoint = OrangeHrmEndpoint.RECRUITMENT_PAGE;
      const actualRecruitmentPageUrl = page.url();

      expect(
        actualRecruitmentPageUrl,
        "User successfully navigated to Recruitment page",
      ).toContain(recruitmentEndpoint);
    });

    await test.step("Move to Vacnacy Page", async () => {
      vacancyPage = await recruitmentPage.moveToVacancyPage();

      const vacancyPageEndpoint = OrangeHrmEndpoint.VACANCY_PAGE;
      const actualVacancyPageUrl = page.url();

      expect(
        actualVacancyPageUrl,
        "User successfully navigated to Vacancy page",
      ).toContain(vacancyPageEndpoint);
    });

    await test.step("Move to New Vacnacy creation page", async () => {
      addNewVacancyPage = await vacancyPage.moveToNewVacancyPage();

      const addVacancyPageEndpoint = OrangeHrmEndpoint.ADD_VACANCY_PAGE;
      const actualAddVacancyPageUrl = page.url();

      expect(
        actualAddVacancyPageUrl,
        "User successfully navigated to Add New Vacancy page",
      ).toContain(addVacancyPageEndpoint);
    });

    await test.step("Create new vacancy", async () => {
      await addNewVacancyPage.createNewVacancy({
        vacancyName: VacancyDetails.name,
        jobTitle: VacancyDetails.jobTitle,
        hiringManager: `${EmployeeDetails.firstName} ${EmployeeDetails.lastName}`,
      });
    });
  },
);
