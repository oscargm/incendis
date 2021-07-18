import * as React from 'react';
import { getFires, getFiresAvailableData } from './fires.service';
import { mapAvailableDataYears, mapFiresFromApiToVm } from './mappers';
import { APIFires, APIYears, Column, COLUMNS, VMFires } from './model';
import { FiresTable } from './fires-table.component';
import { Loader, Selector } from '../../common';

export const Fires = () => {
  const [fires, setFires] = React.useState<VMFires[]>([]);
  const [yearSelected, setYearSelected] = React.useState<string>('');
  const [availableYears, setAvailableYears] = React.useState<string[]>([]);
  const [orderBy, setOrderBy] = React.useState<Column>();
  const [orderAsc, setOrderAsc] = React.useState<boolean>(true);

  React.useEffect(() => {
    yearSelected !== '' &&
      getFires(
        yearSelected,
        orderBy?.api_field,
        orderAsc,
        (rows: APIFires[]) => {
          console.log(rows);
          setFires(mapFiresFromApiToVm(rows));
        },
        (error) => console.log(error)
      );
  }, [orderAsc, orderBy, yearSelected]);

  React.useEffect(() => {
    getFiresAvailableData(
      (years: APIYears[]) => {
        setAvailableYears(mapAvailableDataYears(years));
      },
      (error) => console.log(error)
    );
  }, []);

  const headerClicked = (column: Column) => {
    if (orderBy?.api_field !== column.api_field) {
      setOrderBy(column);
      setOrderAsc(true);
    } else {
      setOrderAsc(!orderAsc);
    }
    console.log('headerClicked', column);
  };

  return (
    <>
      <div>
        {availableYears.length > 0 ? (
          <Selector
            data={availableYears}
            selectedValue={yearSelected}
            selectionTopic={'year'}
            label={'Sel·lecciona un any: '}
            onChangeEvent={(event) => setYearSelected(event.target.value)}
          />
        ) : (
          <Loader text={'loading ...'} />
        )}
      </div>
      <div>
        {fires.length > 0 ? (
          <FiresTable
            columns={Object.values(COLUMNS)}
            fires={fires}
            onHeaderClick={headerClicked}
            orderedBy={orderBy}
            orderAsc={orderAsc}
          />
        ) : (
          <Loader text={'Please, select a date.'} />
        )}
      </div>
    </>
  );
};