import { Page, test, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.class';

export class MainPage extends BasePage {
  OPEN_REG_BTN: Locator;
  LOGIN_FIELD: Locator;
  PASSWORD_FIELD: Locator;
  SUBMIT_BTN: Locator;
  TRY_FOR_FREE_BTN: Locator;
  ERROR_MSG: Locator;
  NEW_ORDER_BTN: Locator;

  constructor(page: Page) {
    super(page);
    this.OPEN_REG_BTN = this.page.locator('[data-test-id=log-in]').locator('..');
    this.PASSWORD_FIELD = this.page.locator('input[id=password]');
    this.NEW_ORDER_BTN = this.page.locator('[data-test-id=new-order-button]').locator('button').first();
    //this.OPEN_REG_BTN = this.page.locator('[data-test-id=log-in]').locator('..');
  }
 

  async openMainPage() {
    await test.step(`Open Main page`, async () => {
      await this.openPage(`${process.env.BASE_URL}`);
    });
  }

  async openRegWindow() {
    await test.step(`Open Main page`, async () => {
      await this.OPEN_REG_BTN.click();
    });
  }

  async clickNewOrderBtn() {
    await test.step(`Open Main page`, async () => {
      await this.NEW_ORDER_BTN.click();
    });
  }




  async clickSubmitButton() {
    await test.step(`click Submit button`, async () => {
      await this.SUBMIT_BTN.click();
      expect(this.page.url(), "Не удалось выполнить вход с указанными учетными данными").toBe(`${process.env.BASE_URL}/dashboard`);
    });
  }



}
