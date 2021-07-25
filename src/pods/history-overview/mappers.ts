import { APIHistoryYear, Dataset, HistoryData } from './model';

export const mapHistoryData = (apiHistory: APIHistoryYear[]): HistoryData => {
  const labels: string[] = [];
  const greenHectaresData: number[] = [];
  const urbanHectaresData: number[] = [];
  apiHistory.forEach((year) => {
    labels.push(String(year.year));
    greenHectaresData.push(year.haforestal);
    urbanHectaresData.push(year.hanoforest);
  });
  const greenZoneBurnt: Dataset = {
    label: 'ha forestals cremdes',
    data: greenHectaresData,
    backgroundColor: 'rgba(0,150,0,0.3)',
    fill: true,
  };
  const urbanZoneBurnt: Dataset = {
    label: 'ha urbanes cremdes',
    data: urbanHectaresData,
    backgroundColor: 'rgba(170,100,140,0.3)',
    fill: true,
  };
  return {
    labels: labels,
    datasets: [greenZoneBurnt, urbanZoneBurnt],
  };
};
