import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ContractUpdatePage {
  pageTitle: ElementFinder = element(by.id('maxContractApp.contract.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  contractIDInput: ElementFinder = element(by.css('input#contract-contractID'));
  championIDInput: ElementFinder = element(by.css('input#contract-championID'));
  vehicleIDInput: ElementFinder = element(by.css('input#contract-vehicleID'));
  hpAmountInput: ElementFinder = element(by.css('input#contract-hpAmount'));
  durationInput: ElementFinder = element(by.css('input#contract-duration'));
  balanceInput: ElementFinder = element(by.css('input#contract-balance'));
  statusInput: ElementFinder = element(by.css('input#contract-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setContractIDInput(contractID) {
    await this.contractIDInput.sendKeys(contractID);
  }

  async getContractIDInput() {
    return this.contractIDInput.getAttribute('value');
  }

  async setChampionIDInput(championID) {
    await this.championIDInput.sendKeys(championID);
  }

  async getChampionIDInput() {
    return this.championIDInput.getAttribute('value');
  }

  async setVehicleIDInput(vehicleID) {
    await this.vehicleIDInput.sendKeys(vehicleID);
  }

  async getVehicleIDInput() {
    return this.vehicleIDInput.getAttribute('value');
  }

  async setHpAmountInput(hpAmount) {
    await this.hpAmountInput.sendKeys(hpAmount);
  }

  async getHpAmountInput() {
    return this.hpAmountInput.getAttribute('value');
  }

  async setDurationInput(duration) {
    await this.durationInput.sendKeys(duration);
  }

  async getDurationInput() {
    return this.durationInput.getAttribute('value');
  }

  async setBalanceInput(balance) {
    await this.balanceInput.sendKeys(balance);
  }

  async getBalanceInput() {
    return this.balanceInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
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
    await this.setContractIDInput('contractID');
    expect(await this.getContractIDInput()).to.match(/contractID/);
    await waitUntilDisplayed(this.saveButton);
    await this.setChampionIDInput('championID');
    expect(await this.getChampionIDInput()).to.match(/championID/);
    await waitUntilDisplayed(this.saveButton);
    await this.setVehicleIDInput('vehicleID');
    expect(await this.getVehicleIDInput()).to.match(/vehicleID/);
    await waitUntilDisplayed(this.saveButton);
    await this.setHpAmountInput('5');
    expect(await this.getHpAmountInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDurationInput('duration');
    expect(await this.getDurationInput()).to.match(/duration/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBalanceInput('5');
    expect(await this.getBalanceInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setStatusInput('status');
    expect(await this.getStatusInput()).to.match(/status/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
