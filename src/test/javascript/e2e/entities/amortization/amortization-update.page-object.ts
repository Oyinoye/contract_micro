import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AmortizationUpdatePage {
  pageTitle: ElementFinder = element(by.id('maxContractApp.amortization.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  amortizationIDInput: ElementFinder = element(by.css('input#amortization-amortizationID'));
  currentMonthInput: ElementFinder = element(by.css('input#amortization-currentMonth'));
  interestInput: ElementFinder = element(by.css('input#amortization-interest'));
  principalAmountInput: ElementFinder = element(by.css('input#amortization-principalAmount'));
  principalBalanceInput: ElementFinder = element(by.css('input#amortization-principalBalance'));
  contractSelect: ElementFinder = element(by.css('select#amortization-contract'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAmortizationIDInput(amortizationID) {
    await this.amortizationIDInput.sendKeys(amortizationID);
  }

  async getAmortizationIDInput() {
    return this.amortizationIDInput.getAttribute('value');
  }

  async setCurrentMonthInput(currentMonth) {
    await this.currentMonthInput.sendKeys(currentMonth);
  }

  async getCurrentMonthInput() {
    return this.currentMonthInput.getAttribute('value');
  }

  async setInterestInput(interest) {
    await this.interestInput.sendKeys(interest);
  }

  async getInterestInput() {
    return this.interestInput.getAttribute('value');
  }

  async setPrincipalAmountInput(principalAmount) {
    await this.principalAmountInput.sendKeys(principalAmount);
  }

  async getPrincipalAmountInput() {
    return this.principalAmountInput.getAttribute('value');
  }

  async setPrincipalBalanceInput(principalBalance) {
    await this.principalBalanceInput.sendKeys(principalBalance);
  }

  async getPrincipalBalanceInput() {
    return this.principalBalanceInput.getAttribute('value');
  }

  async contractSelectLastOption() {
    await this.contractSelect.all(by.tagName('option')).last().click();
  }

  async contractSelectOption(option) {
    await this.contractSelect.sendKeys(option);
  }

  getContractSelect() {
    return this.contractSelect;
  }

  async getContractSelectedOption() {
    return this.contractSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setAmortizationIDInput('amortizationID');
    expect(await this.getAmortizationIDInput()).to.match(/amortizationID/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCurrentMonthInput('currentMonth');
    expect(await this.getCurrentMonthInput()).to.match(/currentMonth/);
    await waitUntilDisplayed(this.saveButton);
    await this.setInterestInput('5');
    expect(await this.getInterestInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setPrincipalAmountInput('5');
    expect(await this.getPrincipalAmountInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setPrincipalBalanceInput('5');
    expect(await this.getPrincipalBalanceInput()).to.eq('5');
    await this.contractSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
