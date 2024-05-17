import { Page, test, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.class';
import { delay } from '../utils/helpers';

export class MainPage extends BasePage {
  OPEN_REG_BTN: Locator;
  LOGIN_FIELD: Locator;
  PASSWORD_FIELD: Locator;
  SUBMIT_BTN: Locator;
  TRY_FOR_FREE_BTN: Locator;
  ERROR_MSG: Locator;
  NEW_ORDER_BTN: Locator;
  POSITIONS_COUNTER: Locator;
  TABLE_ROWS: Locator;
  LOADER: Locator;
  CLOSE_POS_BTN: Locator;

  constructor(page: Page) {
    super(page);
    //this.OPEN_REG_BTN = this.page.locator('[data-test-id=log-in]').locator('..');
    this.OPEN_REG_BTN = this.page.locator('[data-smoke-id=log-in]').locator('button');
    //this.NEW_ORDER_BTN = this.page.locator('[data-test-id=new-order-button]').locator('button').first();
    this.NEW_ORDER_BTN = this.page.locator('button').filter({ hasText: 'New Order' }).first();
    //this.POSITIONS_COUNTER = this.page.locator('[data-test-id=positions-tab]').locator('div');
    this.POSITIONS_COUNTER = this.page.locator('div').filter({ hasText: 'Positions' });
    //this.TABLE_ROWS = this.page.locator('[data-test-id=table-row]');
    this.TABLE_ROWS = this.page.locator('[cache-key*="full-undefined"]');
    this.LOADER = this.page.locator('[data-test-id=loader]');
    this.CLOSE_POS_BTN = this.page.locator('[id="ic_access_cross"]').locator('..');
  }



  async getCurrentOrdersList(): Promise<string[]> {
    return await test.step(`Get array of all positions`, async () => {
      for await (let loc of await this.TABLE_ROWS.all()) {
        await expect(loc).toBeVisible();
      }
      return await this.TABLE_ROWS.allInnerTexts();
    });
  }

  async openMainPage() {
    await test.step(`Open Main page`, async () => {
      await this.openPage(`${process.env.BASE_URL}`);
    });
  }

  async waitForLoadPage() {
    await test.step(`Wait till page is loaded`, async () => {
      // condition of page fully loaded is lack of loaders
      for await (let loader of await this.LOADER.all()) {
        await expect(loader).not.toBeVisible();
      }
    });
  }

  async openRegWindow() {
    await test.step(`Open Registration/SignIn window`, async () => {
      await this.OPEN_REG_BTN.click();
    });
  }

  async clickNewOrderBtn() {
    await test.step(`click 'New order' button`, async () => {
      await this.NEW_ORDER_BTN.click();
    });
  }

  async closeAllPositions() {
    await test.step(`Click close position button`, async () => {
      for await (let loc of await this.CLOSE_POS_BTN.all()) {
        await loc.click();
      }
    });
  }

  async getCurrentPositionsCount(): Promise<number> {
    return await test.step(`Get current positions count`, async () => {
      // waiting every row of table to be loaded that leads POSITIONS_COUNTER shows correct number
      for await (let loc of await this.TABLE_ROWS.all()) {
        await expect(loc).toBeVisible();
      }

      await delay(500);
      //return Number(await this.POSITIONS_COUNTER.innerText());
      return (await this.TABLE_ROWS.allInnerTexts()).length;
    });
  }
}
