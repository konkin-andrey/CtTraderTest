import { expect } from '@playwright/test';
import { test } from '../pom'

//test.describe.configure({ mode: 'parallel' }); Due parallel execution orders counting not working correctly

test.describe('Check page after login', () => {
  test.beforeEach(async ({ mainPage, logInDialog }) => {
    await mainPage.openMainPage();
    await mainPage.openRegWindow();
    await logInDialog.loginAs(process.env.LOGIN as string, process.env.PASSWORD as string);
    await mainPage.waitForLoadPage();
  });


  test('Create one order', async ({ mainPage, createOrderDialog, orderCreatedDialog }) => {
    const stockName = 'EURUSD',
      stockCount = 0.1;
    const ordersCount = await mainPage.getCurrentPositionsCount();
    await mainPage.clickNewOrderBtn();
    await createOrderDialog.createOrder(stockName, stockCount);
    await orderCreatedDialog.checkCreatedOrderMsg(stockName, stockCount);
    await orderCreatedDialog.closeDialog();
    const ordersCountAfterNewOrder = await mainPage.getCurrentPositionsCount();
    const ordersList = await mainPage.getCurrentOrdersList();
    expect(ordersList[ordersList.length - 1]).toContain(`${stockName}\n${stockCount}`);
    expect(ordersCount + 1, 'orders counter not increased after order creation').toBe(ordersCountAfterNewOrder);

    await mainPage.closeAllPositions();
  });
});