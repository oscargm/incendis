import { genericService } from '../../common';
import { HOST_URL } from '../../common/constants/urls';

const RESOURCE_NAME = 'bks7-dkfd';
const FILE_EXTENSION = 'json';
const URL = `${HOST_URL}/${RESOURCE_NAME}.${FILE_EXTENSION}`;

export const getFires = (
  yearSelected: string = '',
  successCallback: (rows) => void,
  failCallback: (error) => void = (error) => console.log(error)
) => {
  // ORDER BY haforestal DESC
  genericService(
    `${URL}?${
      yearSelected !== ''
        ? `$query=SELECT data_incendi, comarca, codi_comarca, termemunic, haarbrades, hanoarbrad, hanoforest, haforestal 
        WHERE date_extract_y(data_incendi)==${yearSelected}
        AND haarbrades !=0 AND hanoarbrad !=0 AND hanoforest !=0 AND haforestal != 0`
        : ' WHERE haarbrades !=0 AND hanoarbrad !=0 AND hanoforest !=0 AND haforestal != 0'
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
    `${URL}?$select=date_extract_y(data_incendi)%20as%20year&$group=year`,
    successCallback,
    failCallback
  );
};

export const getHistoryData = (
  successCallback: (historyData) => void,
  failCallback: (error) => void
) => {
  genericService(
    `${URL}?$select=sum(haforestal) as haforestal, sum(hanoforest) as hanoforest , date_extract_y(data_incendi)%20as%20year&$group=year`,
    successCallback,
    failCallback
  );
};
