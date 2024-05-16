import { Locator, Page, expect } from '@playwright/test';
import { test } from '../pom';

export class LogInDialog {
  LOGIN_FIELD: Locator;
  PASSWORD_FIELD: Locator;
  LOGIN_BTN: Locator;
  page: Page;
  SWICH_SIGNIN_BTN: Locator;
  SWICH_REG_BTN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.SWICH_SIGNIN_BTN = this.page.locator(('[data-test-id=signin-tab]'));
    this.SWICH_REG_BTN = this.page.locator(('[data-test-id=signup-tab]'));
    this.LOGIN_FIELD = this.page.locator('[data-test-id=email]').locator('input');
    this.PASSWORD_FIELD = this.page.locator('[data-test-id=password]').locator('input');
    this.LOGIN_BTN = this.page.locator('[data-test-id=submit]').locator('button');
    
  }

  async setLogin(login: string) {
    await test.step(`Set login: ${login}`, async () => {
    await this.LOGIN_FIELD.fill(login);
    });
  }

  async setPassword(password: string) {
    await test.step(`Set password: ${password}`, async () => {
      await this.PASSWORD_FIELD.fill(password);
    });
  }

  async clickLogInBtn() {
    await test.step(`Click on login button`, async () => {
      await this.LOGIN_BTN.click();
    });
  }

  async switchOnSignIn() {
    await test.step(`Click on login button`, async () => {
      await this.SWICH_SIGNIN_BTN.click();
    });
  }

  async loginAs(login: string, password: string) {
    await test.step(`login as: ${login}, password: ${password}`, async () => {
      await this.switchOnSignIn();
      await this.setLogin(login);
      await this.setPassword(password);
      await this.clickLogInBtn();
    });
  }
  
}