import { OrangeHrmEndpoint } from "../../constants/endpoint.constants";
import { MenuItem } from "../../constants/menuItem.constants";
import { test, expect } from "../../fixtures/base.fixture";
import { AddNewEmployeePage } from "../../pages/AddNewEmployeePage";
import { DashboardPage } from "../../pages/DashboardPage";
import { PimPage } from "../../pages/PimPage";
import { EmployeeDetails } from "../../test-data/orangeHrmTestData";

test(
  "Validating employee creation flow",
  { tag: "@smoke" },
  async ({ page }) => {
    let dashboardPage: DashboardPage;
    let pimPage: PimPage;
    let addEmployeePage: AddNewEmployeePage;

    await test.step("Navigating to Dashboard Page", async () => {
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
      pimPage = await dashboardPage.selectSidebarMenu(MenuItem.PIM);

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

      const employeeDetailsPageEndpoint =
        OrangeHrmEndpoint.EMPLOYEE_DETAILS_PAGE;
      const actualEmployeeDetailsPageUrl = page.url();

      expect(
        actualEmployeeDetailsPageUrl,
        "User successfully navigated to Employee details page after new employee creation",
      ).toContain(actualEmployeeDetailsPageUrl);
    });

    await test.step("Validate new employee info on employee details page", async () => {
      const actualEmployeeFirstName =
        await addEmployeePage.fetchEmployeeFirstname();
      const actualEmployeeLastName =
        await addEmployeePage.fetchEmployeeLastname();
      const actualEmployeeId = await addEmployeePage.fetchEmployeeId();

      expect(
        actualEmployeeFirstName,
        "First name on employee details page is same as provided while creating new Employee",
      ).toEqual(EmployeeDetails.firstName);

      expect(
        actualEmployeeLastName,
        "Last name on employee details page is same as provided while creating new Employee",
      ).toEqual(EmployeeDetails.lastName);

      expect(
        actualEmployeeId,
        "ID on employee details page is same as provided while creating new Employee",
      ).toEqual(EmployeeDetails.id);
    });
  },
);
