import { expect } from '@playwright/test';
import { test } from '../pom'
import { delay } from '../utils/helpers';
test('has title', async ({ mainPage, logInDialog }) => {
  await mainPage.openMainPage();
  await mainPage.openRegWindow();
  await logInDialog.loginAs(process.env.LOGIN as string, process.env.PASSWORD as string);
  await mainPage.clickNewOrderBtn();
  await delay(120000);
});

