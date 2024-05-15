import { test as _test } from "@playwright/test";
import { MainPage } from "./pages/MainPage.class";
import { LogInDialog } from "./fragments/LogInDialog.class";
import { Settings } from "./utils/types";

type Pages = {
  mainPage: MainPage;
  logInDialog: LogInDialog;
  settings: Settings;
}

export const test = _test.extend<Pages>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  logInDialog: async ({ page }, use) => {
    await use(new LogInDialog(page));
  },
  settings: [[], { option: true }] as any,
})