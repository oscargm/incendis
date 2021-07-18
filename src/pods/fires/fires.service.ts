import { genericService } from '../../common';

export const getFires = (
  yearSelected: string = '',
  orderBy: string = '',
  orderAsc: boolean,
  successCallback: (rows) => void,
  failCallback: (error) => void
) => {
  // ORDER BY haforestal DESC
  genericService(
    `https://analisi.transparenciacatalunya.cat/resource/bks7-dkfd.json?${
      yearSelected !== ''
        ? `$query=SELECT data_incendi, comarca, termemunic, haarbrades, hanoarbrad, hanoforest, haforestal WHERE date_extract_y(data_incendi)==${yearSelected} ${
            orderBy !== ''
              ? `ORDER BY ${orderBy} ${orderAsc ? 'ASC' : 'DESC'}`
              : ''
          }`
        : ''
    }`,
    successCallback,
    failCallback
  );
};

export const getFiresAvailableData = (
  successCallback: (rows) => void,
  failCallback: (error) => void
) => {
  genericService(
    'https://analisi.transparenciacatalunya.cat/resource/bks7-dkfd.json?$select=date_extract_y(data_incendi)%20as%20year&$group=year',
    successCallback,
    failCallback
  );
};
