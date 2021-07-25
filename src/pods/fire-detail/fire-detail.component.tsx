import format from 'date-fns/format';
import * as React from 'react';
import { VMFire } from '../fires/model';
import { FireDetailContainer } from './fire-detail.styles';
interface FireDetailProps {
  fire: VMFire;
}

export const FireDetail = (props: FireDetailProps) => {
  const { fire } = props;
  return (
    <FireDetailContainer>
      <ul>
        {/* {Object.values(fire).map((fireProp) => (
          <li>{fireProp}</li>
        ))} */}
        <li>Identificador de l'incendi: {fire.id}</li>
        <li>Data de lincendi: {format(fire.fire_date, 'dd-MMM-yyyy')}</li>
        <li>Comarca: {fire.region_name}</li>
        <li>Municipi: {fire.municipality_name}</li>
        <li>Ha verdes cremades: {fire.total_green_hectares_burnt}</li>
        <li>Ha urbanes cremades: {fire.urban_hectares_burnt}</li>
        <li>
          Total ha cremades:{' '}
          {fire.total_green_hectares_burnt + fire.urban_hectares_burnt}
        </li>
      </ul>
    </FireDetailContainer>
  );
};
