import styled from '@emotion/styled';

export const Table = styled.table`
  border-collapse: collapse;
  margin: 25px 0;
  width: 100%;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  max-height: 80%;
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

export const Arrow = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  position: absolute;
  top: 40%;
  right: 0;
  padding: 3px;
  /* margin-left: 10px; */
`;

export const ArrowUp = styled(Arrow)`
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
`;

export const ArrowDown = styled(Arrow)`
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
`;

export const TableContainer = styled.div`
  max-height: 70vh;
  overflow-x: scroll;
  width: 100%;
`;
