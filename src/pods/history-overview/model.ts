export interface APIHistoryYear {
  haforestal: number;
  hanoforest: number;
  year: number;
}

export interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
  fill: boolean;
}

export interface HistoryData {
  labels: string[];
  datasets: Dataset[];
}
