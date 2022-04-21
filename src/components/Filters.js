import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { RiFilterFill, RiFilterOffFill } from 'react-icons/ri';
import AppContext from '../context/AppContext';
import { columnFilters } from '../helpers';
import './Filters.css';

function Filters({ pageRefs }) {
  const {
    nameFilter,
    setNameFilter, newNumericFilter, numericFilters,
    removeNumericFilter, setNumericFilters,
  } = useContext(AppContext);

  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [filterNumValue, setFilterNumValue] = useState(0);
  const [columnFilterOptions, setColumnFilterOptions] = useState(columnFilters);

  const handleInputChange = ({ target: { value, name } }) => {
    if (name === 'name-filter') setNameFilter(value);
    if (name === 'filter-num-value') setFilterNumValue(value);
  };

  const handleSelectChange = ({ target: { value, name } }) => {
    if (name === 'column') setColumnFilter(value);
    if (name === 'comparison') setComparisonFilter(value);
  };

  const handleFilterClick = () => {
    const newFilterOpt = columnFilterOptions.filter((opt) => opt !== columnFilter);
    setColumnFilterOptions(newFilterOpt);
    setColumnFilter(newFilterOpt[0]);
    newNumericFilter({
      column: columnFilter, comparison: comparisonFilter, value: filterNumValue,
    });
  };

  const handleRemoveFilter = ({ currentTarget: { name } }) => {
    setColumnFilterOptions([...columnFilterOptions, name]);
    removeNumericFilter(name);
  };

  const handleRemoveAllFilters = () => {
    setNumericFilters([]);
  };

  const generateOptions = () => (
    <>
      <option value="maior que">maior que</option>
      <option value="menor que">menor que</option>
      <option value="igual a">igual a</option>
    </>
  );

  return (
    <div className="filters-div">
      <h1 ref={ (el) => { pageRefs.current = { ...pageRefs.current, filters: el }; } }>
        STAR WARS PLANETS
      </h1>
      <input
        onChange={ handleInputChange }
        name="name-filter"
        className="name-filter"
        value={ nameFilter }
        data-testid="name-filter"
        placeholder="PLANET NAME"
      />
      <fieldset className="filters-form">
        <legend>FILTERS</legend>
        <form
          className="non-name-filters"
        >
          <label className="filter-label" htmlFor="column">
            COLUMN
            <select
              value={ columnFilter }
              data-testid="column-filter"
              onChange={ handleSelectChange }
              name="column"
            >
              {columnFilterOptions.map((filterOption) => (
                <option key={ filterOption } value={ filterOption }>
                  {filterOption}
                </option>
              ))}
            </select>
          </label>
          <label className="filter-label" htmlFor="comparison">
            COMPARISON
            <select
              data-testid="comparison-filter"
              onChange={ handleSelectChange }
              value={ comparisonFilter }
              name="comparison"
            >
              {generateOptions()}
            </select>
          </label>
          <label className="filter-label" htmlFor="filter-num-value">
            VALUE
            <input
              data-testid="value-filter"
              type="number"
              name="filter-num-value"
              value={ filterNumValue }
              onChange={ handleInputChange }
            />
          </label>
          <button
            type="button"
            onClick={ handleFilterClick }
            data-testid="button-filter"
            disabled={ columnFilterOptions.length <= 0 }
          >
            <RiFilterFill />
            FILTER
          </button>
          <button
            type="button"
            onClick={ handleRemoveAllFilters }
            data-testid="button-remove-filters"
          >
            <RiFilterOffFill />
            REMOVE FILTERS
          </button>
        </form>
        {numericFilters.length > 0
          && numericFilters.map(({ column, comparison, value }) => (
            <div data-testid="filter" className="added-filter" key={ `${column}Filter` }>
              <p>{`${column} ${comparison} ${value}`}</p>
              <button
                type="button"
                name={ column }
                onClick={ handleRemoveFilter }
              >
                <BsTrash className="trash-icon" id={ column } />
              </button>
            </div>
          ))}
      </fieldset>
    </div>
  );
}

Filters.propTypes = {
  pageRefs: PropTypes.objectOf(PropTypes.element).isRequired,
};

export default Filters;
