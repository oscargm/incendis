import styled from '@emotion/styled';
import { CollapsibleElementProps } from '../../common';

export const HistoryOverviewContainer = styled.div<CollapsibleElementProps>(
  ({ open }) => ({
    height: open ? '90vh' : '10vh',
    border: '1px dashed black',
    textAlign: 'center',
  })
);
