import * as React from 'react';
import { format } from 'date-fns';
import { Column, COLUMNS, VMFire } from './model';
import { Table, ArrowUp, ArrowDown } from './fires-table.styles';

interface FiresTableProps {
  columns: Column[];
  fires: VMFire[];
  onHeaderClick: (column: Column) => void;
  orderedBy: Column | undefined;
  orderAsc: boolean;
  fireSelected: VMFire;
  onRowClick: (fire: VMFire) => void;
}

export const FiresTable = (props: FiresTableProps) => {
  const {
    fires,
    columns,
    fireSelected,
    onHeaderClick,
    onRowClick,
    orderedBy,
    orderAsc,
  } = props;
  // React.useEffect(() => {}, []);
  // React.useEffect(() => {
  //   console.log(orderedBy);
  // }, [orderedBy]);
  return (
    <Table>
      <thead>
        <tr>
          {columns
            .filter((col) => col.visible)
            .map((column) => (
              <th
                key={column.vm_field}
                onClick={() => column.sortable && onHeaderClick(column)}
              >
                {column.text}
                {orderedBy &&
                  orderedBy.vm_field === column.vm_field &&
                  (orderAsc ? <ArrowUp /> : <ArrowDown />)}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {fires.map((fire) => (
          <tr
            key={`fire-${fire.id}`}
            className={fire.id === fireSelected.id ? 'active-row' : ''}
            onClick={() => onRowClick(fire)}
          >
            {columns.map((column) => {
              if (column.visible) {
                return column.vm_field === 'fire_date' ? (
                  <td key={`fire-${fire.id}-${column.vm_field}`}>
                    {format(fire[column.vm_field], 'dd-MMM-yyyy')}
                  </td>
                ) : (
                  <td key={`fire-${fire.id}-${column.vm_field}`}>
                    {fire[column.vm_field]}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
