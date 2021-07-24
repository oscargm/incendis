import * as React from 'react';
import { format } from 'date-fns';
import { Column, VMFires } from './model';
import { Table, ArrowUp, ArrowDown } from './fires-table.styles';

interface FiresTableProps {
  columns: Column[];
  fires: VMFires[];
  onHeaderClick: (column: Column) => void;
  orderedBy: Column | undefined;
  orderAsc: boolean;
}

export const FiresTable = (props: FiresTableProps) => {
  const [rowSelected, setRowSelected] = React.useState(0);
  const { fires, columns, onHeaderClick, orderedBy, orderAsc } = props;
  React.useEffect(() => {}, []);
  React.useEffect(() => {
    console.log(orderedBy);
  }, [orderedBy]);
  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column) => (
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
        {fires.map((fire, fireIndex) => (
          <tr
            key={`fire-${fireIndex}`}
            className={fireIndex === rowSelected ? 'active-row' : ''}
            onClick={() => setRowSelected(fireIndex)}
          >
            {Object.keys(fires[0]).map((key, keyIndex) =>
              keyIndex === 0 ? (
                <td key={`fire-${fireIndex}-${key}`}>
                  {format(fire[key], 'dd-MMM-yyyy')}
                </td>
              ) : (
                <td key={`fire-${fireIndex}-${key}`}>{fire[key]}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
