import { APIFires, APIYears, VMFires } from './model';

export const mapFiresFromApiToVm = (apiFires: APIFires[]): VMFires[] =>
  apiFires.map((fire) => ({
    fire_date: new Date(fire.data_incendi),
    region_name: fire.comarca,
    municipality_name: fire.termemunic,
    forest_hectares_burnt: parseInt(fire.haarbrades),
    pasture_hectares_burnt: parseInt(fire.hanoarbrad),
    urban_hectares_burnt: parseInt(fire.hanoforest),
    total_green_hectares_burnt: parseInt(fire.haforestal),
  }));

export const mapAvailableDataYears = (apiYears: APIYears[]): string[] =>
  apiYears.map((apiYear) => apiYear.year);
