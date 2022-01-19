import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ContractComponentsPage from './contract.page-object';
import ContractUpdatePage from './contract-update.page-object';
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

describe('Contract e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contractComponentsPage: ContractComponentsPage;
  let contractUpdatePage: ContractUpdatePage;
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
    contractComponentsPage = new ContractComponentsPage();
    contractComponentsPage = await contractComponentsPage.goToPage(navBarPage);
  });

  it('should load Contracts', async () => {
    expect(await contractComponentsPage.title.getText()).to.match(/Contracts/);
    expect(await contractComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Contracts', async () => {
    const beforeRecordsCount = (await isVisible(contractComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(contractComponentsPage.table);
    contractUpdatePage = await contractComponentsPage.goToCreateContract();
    await contractUpdatePage.enterData();

    expect(await contractComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(contractComponentsPage.table);
    await waitUntilCount(contractComponentsPage.records, beforeRecordsCount + 1);
    expect(await contractComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await contractComponentsPage.deleteContract();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(contractComponentsPage.records, beforeRecordsCount);
      expect(await contractComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(contractComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
