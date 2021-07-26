import { VMFire } from './model';

export const createFire = (): VMFire => ({
  id: -1,
  fire_date: new Date(),
  region_name: '',
  region_code: -1,
  municipality_name: '',
  municipality_code: -1,
  forest_hectares_burnt: -1,
  pasture_hectares_burnt: -1,
  urban_hectares_burnt: -1,
  total_green_hectares_burnt: -1,
  total_hectares_burnt: -1,
});

export const orderByNumberOrDate = (
  fires: VMFire[],
  key: string,
  orderAsc: boolean
): VMFire[] => {
  const compareFunction = (a: VMFire, b: VMFire) =>
    orderAsc ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1;
  return fires.sort(compareFunction);
};

export const orderByText = (
  fires: VMFire[],
  key: string,
  orderAsc: boolean
): VMFire[] => {
  const compareFunction = (a: VMFire, b: VMFire) =>
    orderAsc ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
  return fires.sort(compareFunction);
};
