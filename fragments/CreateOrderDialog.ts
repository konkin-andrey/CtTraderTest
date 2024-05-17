import { Locator, Page, expect } from '@playwright/test';
import { test } from '../pom';
import { OrderType } from '../types';

export class CreateOrderDialog {
  LOGIN_FIELD: Locator;
  PASSWORD_FIELD: Locator;
  LOGIN_BTN: Locator;
  page: Page;
  OPEN_LIST_BTN: Locator;
  CREATE_ORDER_BTN: Locator;
  STOCKNAME_FIELD: Locator;
  STOCKNAME_BTN: Locator;
  STOCKCOUNT_FIELD: Locator;

  constructor(page: Page) {
    this.page = page;
    //this.CREATE_ORDER_BTN = this.page.locator('[data-test-id=new-position-submit-control]').locator('button');
    this.CREATE_ORDER_BTN = this.page.locator('button').filter({hasText: 'Place Order'});
    this.OPEN_LIST_BTN = this.page.locator('[data-test-id=trade-dialog-symbol-select]');
    this.STOCKNAME_FIELD = this.page.locator('[data-test-id=trade-dialog-symbol-select-panel]').locator('input');
    this.STOCKCOUNT_FIELD = this.page.locator('[data-test-id=lot-size-select]').locator('input');
    this.STOCKNAME_BTN = this.page.locator('[data-test-id=info-tooltip]').locator('div').filter({hasText:'Positions'});
  }

  async clickCreateOrder() {
    await test.step(`Click Create order btn`, async () => {
      await this.CREATE_ORDER_BTN.click();
    });
  }

  async openSelectList() {
    await test.step(`Click on stock list`, async () => {
      await this.OPEN_LIST_BTN.click();
      expect(this.STOCKNAME_FIELD).toBeVisible();
    });
  }

  async setStockName(stockName: string) {
    await test.step(`Click Create order btn`, async () => {
      await this.STOCKNAME_FIELD.fill(stockName);
      expect(await this.STOCKNAME_FIELD.inputValue()).toBe(stockName);
      await this.STOCKNAME_BTN.filter({hasText: stockName}).last().click();
      expect(await this.OPEN_LIST_BTN.innerText()).toBe(stockName);
      
    });
  }

  async setStockCount(stockCount: number) {
    await test.step(`Click Create order btn`, async () => {
      await this.STOCKCOUNT_FIELD.fill(String(stockCount));
      await this.STOCKCOUNT_FIELD.click();
      expect(await this.STOCKCOUNT_FIELD.inputValue()).toBe(String(stockCount));
    });
  }

  async createOrder(orderType: OrderType, stockName: string, stockCount: number) {
    await test.step(`Create order for: ${stockName}, count: ${stockCount}`, async () => {
      // switch(orderType) {
      //   case 'Buy':
      //     break;
      //   case 'Sell':
      //     break;
      // }
      //await this.openSelectList();
      //await this.setStockName(stockName);
      //await this.setStockCount(stockCount);
      await this.clickCreateOrder();
    });
  }

}