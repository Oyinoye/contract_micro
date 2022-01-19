export interface IContract {
  id?: number;
  contractID?: string | null;
  championID?: string | null;
  vehicleID?: string | null;
  hpAmount?: number | null;
  duration?: string | null;
  balance?: number | null;
  status?: string | null;
}

export const defaultValue: Readonly<IContract> = {};
