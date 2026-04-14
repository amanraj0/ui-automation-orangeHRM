import logger from "../../configs/winston-logger.config";
import { OrangeHrmEndpoint } from "../../constants/endpoint.constants";
import { MenuItem } from "../../constants/menuItem.constants";
import { test, expect } from "../../fixtures/base.fixture";
import { AddNewEmployeePage } from "../../pages/AddNewEmployeePage";
import { DashboardPage } from "../../pages/DashboardPage";
import { PimPage } from "../../pages/PimPage";
import { EmployeeDetails } from "../../test-data/orangeHrmTestData";

test(
  "Validating employee creation flow",
  { tag: ["@smoke", "@regression"] },
  async ({ page }) => {
    let dashboardPage: DashboardPage;
    let pimPage: PimPage;
    let addEmployeePage: AddNewEmployeePage;

    await test.step("Navigating to Dashboard Page", async () => {
      dashboardPage = new DashboardPage(page);
      await dashboardPage.moveToDashboardPage();
      const dashboardEndpoint = OrangeHrmEndpoint.DASHBOARD_PAGE;
      const cookies = await page.context().cookies();
      logger.debug("Cookies after login:", cookies);
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
  },
);
