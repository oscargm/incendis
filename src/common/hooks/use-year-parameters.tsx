import * as React from 'react';
import { yearValidWords } from '../utils/regexp';

export const useYearParameters = () => {
  const [year, setYear] = React.useState<any>();

  React.useEffect(() => {
    if (window.location.search) {
      const parameterNameRegexp = /(?!\?)\w([a-z]|[ñ])*(?=\=)/gi;
      const parameterName = window.location.search.match(parameterNameRegexp);
      const parameterValueRegexp = /(?!\?)\w(?![a-z])\w(?!\=)([1-9])\w/gi;
      const value = window.location.search.match(parameterValueRegexp);
      parameterName &&
        console.log(
          parameterName,
          value,
          yearValidWords.findIndex((word) => word === parameterName[0])
        );
      if (
        parameterName &&
        yearValidWords.findIndex((word) => word === parameterName[0]) > -1 &&
        value
      ) {
        setYear(value[0]);
      }
    }
  }, []);
  return [year, setYear];
};
