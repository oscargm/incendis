import styled from '@emotion/styled';
import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { Loader } from '../../common';
import { getHistoryData } from '../fires/fires.service';
import { mapHistoryData } from './mappers';
import { HistoryData } from './model';
import { HistoryOverviewContainer } from './history-overview.styles';

interface HistoryOverviewProps {
  open: boolean;
  onYearClick: (year: string) => void;
  onTitleClick: () => void;
}

export const HistoryOverview = (props: HistoryOverviewProps) => {
  const [historyData, setHistoryData] = React.useState<HistoryData>();
  const { open, onYearClick, onTitleClick } = props;
  React.useEffect(() => {
    getHistoryData(
      (apiData) => setHistoryData(mapHistoryData(apiData)),
      (error) => {
        console.log(error);
      }
    );
    console.log(document.documentElement.clientHeight * 0.2);
  }, []);
  return (
    <HistoryOverviewContainer open={open}>
      {open ? (
        historyData ? (
          <Line
            data={historyData}
            options={{
              title: {
                display: true,
                text: "Historial d'Incendis",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'top',
              },
              maintainAspectRatio: false,
            }}
            width={100}
            height={100}
            fallbackContent={<Loader text="Carregant..." />}
            getElementAtEvent={(element: any) => {
              if (!element.length) return;
              const { index } = element[0];
              onYearClick(historyData.labels[index]);
            }}
          />
        ) : (
          <div></div>
        )
      ) : (
        <h4 onClick={onTitleClick}>Historial gràfic</h4>
      )}
    </HistoryOverviewContainer>
  );
};
