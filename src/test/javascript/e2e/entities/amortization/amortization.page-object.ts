import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AmortizationUpdatePage from './amortization-update.page-object';

const expect = chai.expect;
export class AmortizationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('maxContractApp.amortization.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-amortization'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AmortizationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('amortization-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('amortization');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAmortization() {
    await this.createButton.click();
    return new AmortizationUpdatePage();
  }

  async deleteAmortization() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const amortizationDeleteDialog = new AmortizationDeleteDialog();
    await waitUntilDisplayed(amortizationDeleteDialog.deleteModal);
    expect(await amortizationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/maxContractApp.amortization.delete.question/);
    await amortizationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(amortizationDeleteDialog.deleteModal);

    expect(await isVisible(amortizationDeleteDialog.deleteModal)).to.be.false;
  }
}
