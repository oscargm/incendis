import * as React from 'react';
import { format } from 'date-fns';
import { Column, VMFires } from './model';
import styled from '@emotion/styled';

const Table = styled.table`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  &thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }
  & th {
    cursor: pointer;
    position: relative;
  }
  & th,
  td {
    padding: 12px 15px;
  }
  & tr {
    border-bottom: 1px solid #ddd;
  }
  & tr:nth-of-type(even) {
    background-color: #fbfbfb;
  }
  & tr:last-of-type {
    border-bottom: 2px solid #009879;
  }
  & tr.active-row {
    font-weight: bold;
    color: #009879;
  }
`;

const Arrow = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  position: absolute;
  top: 40%;
  right: 0;
  padding: 3px;
  /* margin-left: 10px; */
`;

const ArrowUp = styled(Arrow)`
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
`;

const ArrowDown = styled(Arrow)`
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
`;

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
