import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AmortizationComponentsPage from './amortization.page-object';
import AmortizationUpdatePage from './amortization-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Amortization e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let amortizationComponentsPage: AmortizationComponentsPage;
  let amortizationUpdatePage: AmortizationUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    amortizationComponentsPage = new AmortizationComponentsPage();
    amortizationComponentsPage = await amortizationComponentsPage.goToPage(navBarPage);
  });

  it('should load Amortizations', async () => {
    expect(await amortizationComponentsPage.title.getText()).to.match(/Amortizations/);
    expect(await amortizationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete Amortizations', async () => {
        const beforeRecordsCount = await isVisible(amortizationComponentsPage.noRecords) ? 0 : await getRecordsCount(amortizationComponentsPage.table);
        amortizationUpdatePage = await amortizationComponentsPage.goToCreateAmortization();
        await amortizationUpdatePage.enterData();

        expect(await amortizationComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(amortizationComponentsPage.table);
        await waitUntilCount(amortizationComponentsPage.records, beforeRecordsCount + 1);
        expect(await amortizationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await amortizationComponentsPage.deleteAmortization();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(amortizationComponentsPage.records, beforeRecordsCount);
          expect(await amortizationComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(amortizationComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
