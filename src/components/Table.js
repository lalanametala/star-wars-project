import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { tableHeading } from '../helpers';
import './Table.css';

function Table() {
  const { data } = useContext(AppContext);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {tableHeading.map((heading) => (
              <th key={ heading }>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
            .map(({
              name, rotation_period: rotationPeriod,
              orbital_period: orbitalPeriod, diameter, climate, gravity,
              terrain, surface_water: surfaceWater, population, films,
              created, edited, url,
            }) => (
              <tr key={ name }>
                <td data-testid="planet-name">{name}</td>
                <td>{rotationPeriod}</td>
                <td>{orbitalPeriod}</td>
                <td>{diameter}</td>
                <td>{climate}</td>
                <td>{gravity}</td>
                <td>{terrain}</td>
                <td>{surfaceWater}</td>
                <td>{population}</td>
                <td>{films}</td>
                <td>{created}</td>
                <td>{edited}</td>
                <td>{url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
