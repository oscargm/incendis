import { parse } from 'date-fns';
import { APIFires, APIYears, VMFire } from './model';

export const mapFiresFromApiToVm = (apiFires: APIFires[]): VMFire[] =>
  apiFires.map((fire, fireIndex) => ({
    id: fireIndex,
    fire_date: new Date(fire.data_incendi),
    region_name: fire.comarca,
    region_code: parseInt(fire.codi_comarca),
    municipality_name: fire.termemunic,
    municipality_code: parseInt(fire.codi_municipi),
    forest_hectares_burnt: mapToNumber(fire.haarbrades),
    pasture_hectares_burnt: mapToNumber(fire.hanoarbrad),
    urban_hectares_burnt: mapToNumber(fire.hanoforest),
    total_green_hectares_burnt: mapToNumber(fire.haforestal),
    total_hectares_burnt:
      Math.round(
        (parseFloat(fire.hanoforest) + parseFloat(fire.haforestal)) * 100
      ) / 100,
  }));

const mapToNumber = (apiValue: string): number =>
  Math.round(parseFloat(apiValue) * 100) / 100;

export const mapAvailableDataYears = (apiYears: APIYears[]): string[] =>
  apiYears.map((apiYear) => apiYear.year);
