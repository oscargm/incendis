import * as React from 'react';
import { getFires, getFiresAvailableData } from '../pods/fires/fires.service';
import {
  mapAvailableDataYears,
  mapFiresFromApiToVm,
} from '../pods/fires/mappers';
import {
  APIFires,
  APIYears,
  Column,
  COLUMNS,
  VMFire,
} from '../pods/fires/model';
import { FiresTable } from '../pods/fires/fires-table.component';
import { Loader, Selector } from '../common';
import { useYearParameters } from '../common/hooks/use-year-parameters';
import { TableContainer, FiresHeader } from '../pods/fires/fires-table.styles';
// import { FireDetail } from '../pods/fire-detail/fire-detail.component';
import { HistoryOverview } from '../pods/history-overview/history-overview.component';
import { createFire } from '../pods/fires/utils';

export const Fires = () => {
  const [year] = useYearParameters();
  const [fires, setFires] = React.useState<VMFire[]>([]);
  const [yearSelected, setYearSelected] = React.useState<string>('');
  const [availableYears, setAvailableYears] = React.useState<string[]>([]);
  const [overviewOpen, setOverviewOpen] = React.useState<boolean>(true);
  const [orderBy, setOrderBy] = React.useState<Column>();
  const [orderAsc, setOrderAsc] = React.useState<boolean>(true);
  const [fireSelected, setFireSelected] = React.useState<VMFire>(createFire());

  const getFiresCallback = (rows: APIFires[]) => {
    console.log(rows);
    setFires(mapFiresFromApiToVm(rows));
  };
  React.useEffect(() => {
    if (yearSelected !== '') {
      getFires(yearSelected, getFiresCallback);
    }
  }, [yearSelected]);

  React.useEffect(() => {
    console.log('orderAsc', orderAsc);
    orderBy &&
      setFires(COLUMNS[orderBy.vm_field].orderFunction(fires, orderAsc));
  }, [orderBy, orderAsc]);
  // React.useEffect(() => {
  //   if (orderBy) {
  //     setFires(
  //       [...fires].sort((a, b) =>
  //         orderAsc
  //           ? String(a[orderBy.vm_field]).localeCompare(
  //               String(b[orderBy?.vm_field])
  //             )
  //           : String(b[orderBy.vm_field]).localeCompare(
  //               String(a[orderBy?.vm_field])
  //             )
  //       )
  //     );
  //   }
  // }, [orderAsc, orderBy, fires]);

  React.useEffect(() => {
    getFiresAvailableData(
      (years: APIYears[]) => {
        setAvailableYears(mapAvailableDataYears(years));
      },
      (error) => console.log(error)
    );
    setOverviewOpen(yearSelected === '' ? true : false);
  }, [yearSelected]);

  React.useEffect(() => {
    year && setYearSelected(year);
  }, [year]);

  const headerClicked = (column: Column) => {
    if (orderBy?.api_field !== column.api_field) {
      setOrderBy(column);
      setOrderAsc(true);
    } else {
      setOrderAsc(!orderAsc);
      // setFires(COLUMNS[column.vm_field].orderFunction(fires, orderAsc));
    }
    console.log('headerClicked', column);
  };

  const rowClicked = (fire: VMFire) => setFireSelected(fire);

  const selectYear = (year: string) => {
    setYearSelected(year);
    setOverviewOpen(true);
  };

  return (
    <>
      <FiresHeader>
        {availableYears.length > 0 ? (
          <Selector
            data={availableYears}
            selectedValue={yearSelected}
            selectionTopic={'year'}
            label={'Sel·lecciona un any: '}
            onChangeEvent={(event) => setYearSelected(event.target.value)}
          />
        ) : (
          <Loader text={'Carregant ...'} />
        )}
      </FiresHeader>
      {fires && (
        <HistoryOverview
          open={overviewOpen}
          onYearClick={selectYear}
          onTitleClick={() => {
            setOverviewOpen(!overviewOpen);
          }}
        />
      )}
      <TableContainer open={yearSelected !== ''}>
        {fires.length > 0 ? (
          <FiresTable
            columns={Object.values(COLUMNS)}
            fires={fires}
            onHeaderClick={headerClicked}
            orderedBy={orderBy}
            orderAsc={orderAsc}
            onRowClick={rowClicked}
            fireSelected={fireSelected}
          />
        ) : (
          <Loader text={'Sel·lecciona un any.'} />
        )}
      </TableContainer>
    </>
  );
};

// {fireSelected.id > -1 ? (
//   <FireDetail fire={fireSelected} />
// ) : (
//   <HistoryOverview/>
// )}
