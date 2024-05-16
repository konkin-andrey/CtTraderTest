import { test as _test } from "@playwright/test";
import { MainPage } from "./pages/MainPage.class";
import { LogInDialog } from "./fragments/LogInDialog.class";
import { Settings } from "./utils/types";
import { CreateOrderDialog } from "./fragments/CreateOrderDialog";
import { OrderCreatedDialog } from "./fragments/OrderCreatedDialog";

type Pages = {
  mainPage: MainPage;
  logInDialog: LogInDialog;
  createOrderDialog: CreateOrderDialog;
  orderCreatedDialog: OrderCreatedDialog;
  settings: Settings;
}

export const test = _test.extend<Pages>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  logInDialog: async ({ page }, use) => {
    await use(new LogInDialog(page));
  },
  createOrderDialog: async ({ page }, use) => {
    await use(new CreateOrderDialog(page));
  },
  orderCreatedDialog: async ({ page }, use) => {
    await use(new OrderCreatedDialog(page));
  },
  settings: [[], { option: true }] as any,
})