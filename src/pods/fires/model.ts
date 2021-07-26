import { orderByNumberOrDate, orderByText } from './utils';

export interface APIFires {
  data_incendi: string;
  comarca: string;
  codi_comarca: string;
  codi_municipi: string;
  termemunic: string;
  haarbrades: string;
  hanoarbrad: string;
  hanoforest: string;
  haforestal: string;
}

export interface VMFire {
  id: number;
  fire_date: Date;
  region_name: string;
  region_code: number;
  municipality_name: string;
  municipality_code: number;
  forest_hectares_burnt: number;
  pasture_hectares_burnt: number;
  urban_hectares_burnt: number;
  total_green_hectares_burnt: number;
  total_hectares_burnt: number;
}

export interface Filter {
  text: string;
  api_field?: keyof APIFires;
  vm_field: keyof VMFire;
}

export interface Column extends Filter {
  sortable: boolean;
  visible: boolean;
  width?: string;
  orderFunction: (fires: VMFire[], orderAsc: boolean) => VMFire[];
}

export const COLUMNS: { [key: string]: Column } = {
  fire_date: {
    text: 'Data',
    api_field: 'data_incendi',
    vm_field: 'fire_date',
    sortable: true,
    visible: true,
    width: 'min-content',
    orderFunction: (fires: VMFire[], orderAsc: boolean) =>
      orderByNumberOrDate(fires, 'fire_date', orderAsc),
  },
  region_name: {
    text: 'Comarca',
    api_field: 'comarca',
    vm_field: 'region_name',
    sortable: true,
    visible: true,
    width: 'min-content',
    orderFunction: (fires: VMFire[], orderAsc: boolean) =>
      orderByText(fires, 'region_name', orderAsc),
  },
  region_code: {
    text: 'Codi comarca',
    api_field: 'codi_comarca',
    vm_field: 'region_code',
    visible: false,
    sortable: true,
    width: 'min-content',
    orderFunction: (fires: VMFire[], orderAsc: boolean) => fires,
  },
  municipality_name: {
    text: 'Municipi',
    api_field: 'termemunic',
    vm_field: 'municipality_name',
    sortable: true,
    visible: true,
    width: 'min-content',
    orderFunction: (fires: VMFire[], orderAsc: boolean) =>
      orderByText(fires, 'municipality_name', orderAsc),
  },
  municipality_code: {
    text: 'Codi municipi',
    api_field: 'codi_municipi',
    vm_field: 'municipality_code',
    sortable: true,
    visible: false,
    width: 'min-content',
    orderFunction: (fires: VMFire[], orderAsc: boolean) => fires,
  },
  forest_hectares_burnt: {
    text: 'Ha bosc cremat',
    api_field: 'haarbrades',
    vm_field: 'forest_hectares_burnt',
    visible: true,
    sortable: true,
    orderFunction: (fires: VMFire[], orderAsc: boolean) =>
      orderByNumberOrDate(fires, 'forest_hectares_burnt', orderAsc),
  },
  pasture_hectares_burnt: {
    text: 'Ha pastures cremades',
    api_field: 'hanoarbrad',
    vm_field: 'pasture_hectares_burnt',
    visible: true,
    sortable: true,
    orderFunction: (fires: VMFire[], orderAsc: boolean) =>
      orderByNumberOrDate(fires, 'pasture_hectares_burnt', orderAsc),
  },
  urban_hectares_burnt: {
    text: 'Ha urbanes cremades',
    api_field: 'hanoforest',
    vm_field: 'urban_hectares_burnt',
    visible: true,
    sortable: true,
    orderFunction: (fires: VMFire[], orderAsc: boolean) =>
      orderByNumberOrDate(fires, 'urban_hectares_burnt', orderAsc),
  },
  total_green_hectares_burnt: {
    text: 'Ha verdes cremades',
    api_field: 'haforestal',
    vm_field: 'total_green_hectares_burnt',
    sortable: true,
    visible: true,
    orderFunction: (fires: VMFire[], orderAsc: boolean) =>
      orderByNumberOrDate(fires, 'total_green_hectares_burnt', orderAsc),
  },
  total_hectares_burnt: {
    text: 'Total Ha cremades',
    vm_field: 'total_hectares_burnt',
    sortable: true,
    visible: true,
    orderFunction: (fires: VMFire[], orderAsc: boolean) =>
      orderByNumberOrDate(fires, 'total_hectares_burnt', orderAsc),
  },
};

export interface APIYears {
  year: string;
}
