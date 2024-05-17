import { expect } from '@playwright/test';
import { test } from '../pom'
import { delay } from '../utils/helpers';

//test.describe.configure({ mode: 'parallel' }); Due parallel execution orders counting not working correctly

test.describe('Check page after login', () => {
  test.beforeEach(async ({ mainPage, logInDialog }) => {
    await mainPage.openMainPage();
    await mainPage.openRegWindow();
    await logInDialog.loginAs(process.env.LOGIN as string, process.env.PASSWORD as string);
  });


  test('Create one order', async ({ mainPage, createOrderDialog, orderCreatedDialog }) => {
    // random stock sample for test
    const stockName = 'EURUSD', stockCount = 0.1;

    const ordersCount = await mainPage.getCurrentPositionsCount();
    await mainPage.clickNewOrderBtn();
    await createOrderDialog.createOrder(stockName, stockCount);
    //await orderCreatedDialog.checkCreatedOrderMsg(stockName, stockCount);
    await orderCreatedDialog.closeDialog();


    const ordersCountAfterNewOrder = await mainPage.getCurrentPositionsCount();
    const ordersList = await mainPage.getCurrentOrdersList(), lastListItem = ordersList[ordersList.length - 1];

    // the last (item we just added) element has to contain sample stock name and count
    //expect(lastListItem).toContain(`${stockName}\n${stockCount}`);
    // numer of stocks has to be original + 1
    expect.soft(ordersCount + 1, 'orders counter not increased after order creation').toBe(ordersCountAfterNewOrder);

    await delay(5000);
    await mainPage.closeAllPositions();
  });
});