import { OrangeHrmEndpoint } from "../../constants/endpoint.constants";
import { MenuItem } from "../../constants/menuItem.constants";
import { test, expect } from "../../fixtures/base.fixture";
import { AddNewCustomerPage } from "../../pages/AddNewCustomerPage";
import { AddNewProjectPage } from "../../pages/AddNewProjectPage";
import { CustomerPage } from "../../pages/CustomerPage";
import { DashboardPage } from "../../pages/DashboardPage";
import { ProjectPage } from "../../pages/ProjectPage";
import { TimePage } from "../../pages/TimePage";
import {
  CustomerDetails,
  ProjectDetails,
} from "../../test-data/orangeHrmTestData";

test(
  "Validation new project creation flow",
  { tag: ["@smoke", "@regression"] },
  async ({ page }) => {
    let dashboardPage: DashboardPage;
    let timePage: TimePage;
    let customerPage: CustomerPage;
    let addNewCustomerPage: AddNewCustomerPage;
    let projectPage: ProjectPage;
    let addNewProjectPage: AddNewProjectPage;

    await test.step("Move to Dashboard Page", async () => {
      dashboardPage = new DashboardPage(page);
      await dashboardPage.moveToDashboardPage();

      const dashboardEndpoint = OrangeHrmEndpoint.DASHBOARD_PAGE;
      const actualDashboardPageUrl = page.url();

      expect(
        actualDashboardPageUrl,
        "User successfully navigated to Dashboard page",
      ).toContain(dashboardEndpoint);
    });

    await test.step("Move to Time Page", async () => {
      timePage = await dashboardPage.selectSidebarMenu(MenuItem.TIME, TimePage);

      const timePageEndpoint = OrangeHrmEndpoint.TIME_PAGE;
      const actualTimePageEndpoint = page.url();

      expect(
        actualTimePageEndpoint,
        "User successfully navigated to Time page",
      ).toContain(timePageEndpoint);
    });

    await test.step("Move to Customer page", async () => {
      customerPage = await timePage.moveToCustomerPage();

      const customerPageHeader = await customerPage.getCustomerPageHeader();

      expect("Customers", "User is on Customer page").toEqual(
        customerPageHeader,
      );
    });

    await test.step("Create a New Customer", async () => {
      addNewCustomerPage = await customerPage.moveToAddNewCustomerPage();
      await addNewCustomerPage.createNewCustomer(CustomerDetails.name);

      const customerPageHeader = await customerPage.getCustomerPageHeader();

      expect(
        "Customers",
        "User moves back to view customer page after successfully creating new customer",
      ).toEqual(customerPageHeader);
    });

    await test.step("Move to Project page", async () => {
      projectPage = await timePage.moveToProjectPage();

      const projectPageEndpoint = OrangeHrmEndpoint.PROJECT_PAGE;
      const actualProjectPageEndpoint = page.url();

      expect(
        actualProjectPageEndpoint,
        "User successfully navigated to Project page",
      ).toContain(projectPageEndpoint);
    });

    await test.step("Create a new Customer", async () => {
      addNewProjectPage = await projectPage.moveToAddNewProjectPage();

      await addNewProjectPage.createNewProject({
        projectname: ProjectDetails.name,
        customername: CustomerDetails.name,
      });

      const actualEditPageHeader =
        await addNewProjectPage.getEditPageHeaderText();

      expect(
        actualEditPageHeader,
        "On Successfull Project creation user moves to Edit Page",
      ).toEqual("Edit Project");
    });
  },
);
