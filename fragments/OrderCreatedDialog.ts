import { Locator, Page, expect } from '@playwright/test';
import { test } from '../pom';

export class OrderCreatedDialog {
  page: Page;
  DIALOG_WINDOW: Locator;
  CLOSE_BTN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.DIALOG_WINDOW = this.page.locator('[data-test-id=dialog-header]').locator('..');
    this.CLOSE_BTN = this.page.locator('[data-test-id=ok-button]');
  }

  async checkCreatedOrderMsg(stockName: string, stockCount: number) {
    await test.step(`Click Create order btn`, async () => {
      await expect(this.DIALOG_WINDOW).toHaveText(new RegExp(`.*${stockName}.*`, 'g'), {useInnerText: true});
      expect(await this.DIALOG_WINDOW.innerText()).toContain(`${stockCount} Lots of ${stockName}`);
    });
  }

  async closeDialog() {
    await test.step(`Click Create order btn`, async () => {
      await this.CLOSE_BTN.click();
      expect(this.DIALOG_WINDOW).not.toBeVisible();
    });
  }
}