export interface APIFires {
  data_incendi: string;
  comarca: string;
  termemunic: string;
  haarbrades: string;
  hanoarbrad: string;
  hanoforest: string;
  haforestal: string;
}

export interface VMFires {
  fire_date: Date;
  region_name: string;
  municipality_name: string;
  forest_hectares_burnt: number;
  pasture_hectares_burnt: number;
  urban_hectares_burnt: number;
  total_green_hectares_burnt: number;
}

export interface Filter {
  text: string;
  api_field: keyof APIFires;
  vm_field: keyof VMFires;
}

export interface Column extends Filter {
  sortable: boolean;
  width?: string;
}

export const COLUMNS: { [key: string]: Column } = {
  fire_date: {
    text: 'Data',
    api_field: 'data_incendi',
    vm_field: 'fire_date',
    sortable: true,
    width: 'min-content',
  },
  region_name: {
    text: 'Comarca',
    api_field: 'comarca',
    vm_field: 'region_name',
    sortable: true,
    width: 'min-content',
  },
  municipality_name: {
    text: 'Municipi',
    api_field: 'termemunic',
    vm_field: 'municipality_name',
    sortable: true,
    width: 'min-content',
  },
  forest_hectares_burnt: {
    text: 'Ha bosc cremat',
    api_field: 'haarbrades',
    vm_field: 'forest_hectares_burnt',
    sortable: true,
  },
  pasture_hectares_burnt: {
    text: 'Ha pastures cremades',
    api_field: 'hanoarbrad',
    vm_field: 'pasture_hectares_burnt',
    sortable: true,
  },
  urban_hectares_burnt: {
    text: 'Ha urbanes cremades',
    api_field: 'hanoforest',
    vm_field: 'urban_hectares_burnt',
    sortable: true,
  },
  total_green_hectares_burnt: {
    text: 'Ha verdes cremades',
    api_field: 'haforestal',
    vm_field: 'total_green_hectares_burnt',
    sortable: true,
  },
};

export interface APIYears {
  year: string;
}
