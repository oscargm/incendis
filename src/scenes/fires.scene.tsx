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

export const Fires = () => {
  const [year] = useYearParameters();
  const [fires, setFires] = React.useState<VMFire[]>([]);
  const [yearSelected, setYearSelected] = React.useState<string>('');
  const [availableYears, setAvailableYears] = React.useState<string[]>([]);
  const [overviewOpen, setOverviewOpen] = React.useState<boolean>(true);
  const [orderBy, setOrderBy] = React.useState<Column>();
  const [orderAsc, setOrderAsc] = React.useState<boolean>(true);
  const [fireSelected, setFireSelected] = React.useState<VMFire>({
    id: -1,
    fire_date: new Date(),
    region_name: '',
    municipality_name: '',
    forest_hectares_burnt: -1,
    pasture_hectares_burnt: -1,
    urban_hectares_burnt: -1,
    total_green_hectares_burnt: -1,
    total_hectares_burnt: -1,
  });

  React.useEffect(() => {
    if (yearSelected !== '') {
      orderBy && orderBy.vm_field === 'total_hectares_burnt'
        ? fires.length > 0
          ? setFires(
              [...fires].sort(
                (a, b) => a.total_hectares_burnt - b.total_hectares_burnt
              )
            )
          : getFires(
              yearSelected,
              '',
              orderAsc,
              (rows: APIFires[]) => {
                console.log(rows);
                setFires(mapFiresFromApiToVm(rows));
              },
              (error) => console.log(error)
            )
        : getFires(
            yearSelected,
            orderBy?.api_field,
            orderAsc,
            (rows: APIFires[]) => {
              console.log(rows);
              setFires(mapFiresFromApiToVm(rows));
            },
            (error) => console.log(error)
          );
    }
  }, [orderAsc, orderBy, yearSelected]);

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
