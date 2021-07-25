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
        ? `$query=SELECT data_incendi, comarca, termemunic, haarbrades, hanoarbrad, hanoforest, haforestal 
        WHERE date_extract_y(data_incendi)==${yearSelected}
        AND haarbrades !=0 AND hanoarbrad !=0 AND hanoforest !=0 AND haforestal != 0`
        : ' WHERE haarbrades !=0 AND hanoarbrad !=0 AND hanoforest !=0 AND haforestal != 0'
    } ${
      orderBy !== '' ? `ORDER BY ${orderBy} ${orderAsc ? 'ASC' : 'DESC'}` : ''
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

export const getHistoryData = (
  successCallback: (historyData) => void,
  failCallback: (error) => void
) => {
  genericService(
    'https://analisi.transparenciacatalunya.cat/resource/bks7-dkfd.json?$select=sum(haforestal) as haforestal, sum(hanoforest) as hanoforest , date_extract_y(data_incendi)%20as%20year&$group=year',
    successCallback,
    failCallback
  );
};
