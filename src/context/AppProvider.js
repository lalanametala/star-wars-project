import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ascSorter, descSorter, nameSorter } from '../helpers';
import getPlanets from '../services/fetchPlanets';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);
  const [order, setOrder] = useState({});
  const [dataClone, setDataClone] = useState([]);

  useEffect(() => {
    const setPlanetsAPI = async () => {
      const results = await getPlanets();
      results.sort(nameSorter);
      setData(results);
      setDataClone(results);
      setPlanets(results);
    };
    setPlanetsAPI();
  }, []);

  useEffect(() => {
    const filterByNumberAndName = () => {
      const reduceCallback = (acc, { column, comparison, value }, index) => {
        const filterCallback = (planet) => {
          const comparisonValue = Number(planet[column]);
          if (comparison === 'maior que') return comparisonValue > value;
          if (comparison === 'menor que') return comparisonValue < value;
          return comparisonValue === Number(value);
        };
        if (index === 0) {
          acc = planets.filter(filterCallback);
          return acc;
        }
        return acc.filter(filterCallback);
      };
      let newData = [];
      if (numericFilters.length !== 0) {
        newData = numericFilters
          .reduce(reduceCallback, []).filter(({ name }) => name.includes(nameFilter));
      } else {
        newData = planets.filter(({ name }) => name.includes(nameFilter));
      }
      setData(newData);
      setDataClone(newData);
    };
    filterByNumberAndName();
  }, [nameFilter, numericFilters, planets]);

  const newNumericFilter = (newFilter) => {
    setNumericFilters([...numericFilters, newFilter]);
  };

  const removeNumericFilter = (removedFilter) => {
    const updatedFilters = numericFilters
      .filter(({ column }) => column !== removedFilter);
    setNumericFilters(updatedFilters);
  };

  useEffect(() => {
    const sortArray = () => {
      const { column, sort } = order;
      const mappedData = dataClone.map((planet, index) => ({
        value: planet[column],
        index,
      }));
      if (sort === 'ASC') mappedData.sort(ascSorter);
      if (sort === 'DESC') mappedData.sort(descSorter);
      const orderedData = mappedData.map(({ index }) => dataClone[index]);
      const knownData = orderedData.filter((planet) => planet[column] !== 'unknown');
      const unknownData = orderedData.filter((planet) => planet[column] === 'unknown');
      return [...knownData, ...unknownData];
    };
    setData(sortArray());
  }, [dataClone, order]);

  return (
    <AppContext.Provider
      value={ {
        data,
        setNameFilter,
        newNumericFilter,
        numericFilters,
        removeNumericFilter,
        setNumericFilters,
        setOrder,
      } }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
