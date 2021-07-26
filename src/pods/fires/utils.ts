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
