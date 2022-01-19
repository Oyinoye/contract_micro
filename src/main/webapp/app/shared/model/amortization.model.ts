import { IContract } from 'app/shared/model/contract.model';

export interface IAmortization {
  id?: number;
  amortizationID?: string | null;
  currentMonth?: string | null;
  interest?: number | null;
  principalAmount?: number | null;
  principalBalance?: number | null;
  contract?: IContract;
}

export const defaultValue: Readonly<IAmortization> = {};
