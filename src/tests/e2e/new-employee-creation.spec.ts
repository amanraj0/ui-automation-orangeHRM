import { OrangeHrmEndpoint } from "../../constants/endpoint.constants";
import { test, expect } from "../../fixtures/base.fixture";
import { DashboardPage } from "../../pages/DashboardPage";

test("Validating employee creation flow", async ({ page }) => {
  test.step("Navigating to Dashboard Page", async () => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.moveToDashboardPage();

    await expect(page).toHaveURL(OrangeHrmEndpoint.DASHBOARD_PAGE);
  });
});
