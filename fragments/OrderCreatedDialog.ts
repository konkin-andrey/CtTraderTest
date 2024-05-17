import { Locator, Page, expect } from '@playwright/test';
import { test } from '../pom';

export class OrderCreatedDialog {
  page: Page;
  DIALOG_WINDOW: Locator;
  CLOSE_BTN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.DIALOG_WINDOW = this.page.locator('[data-test-id=dialog-header]').locator('..');
    //this.CLOSE_BTN = this.page.locator('[data-test-id=ok-button]');
    this.CLOSE_BTN = this.page.locator('div').filter({hasText: 'OK'});
  }

  async checkCreatedOrderMsg(stockName: string, stockCount: number) {
    await test.step(`Check that msg contains text`, async () => {
      await expect(this.DIALOG_WINDOW).toHaveText(new RegExp(`.*${stockName}.*`, 'g'), {useInnerText: true});
      expect(await this.DIALOG_WINDOW.innerText()).toContain(`${stockCount} Lots of ${stockName}`);
    });
  }

  async closeDialog() {
    await test.step(`Click close msg btn`, async () => {
      await this.CLOSE_BTN.last().click();
      //expect(this.DIALOG_WINDOW).not.toBeVisible();
    });
  }
}