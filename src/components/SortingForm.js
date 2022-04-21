import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { columnFilters } from '../helpers';
import './SortingForm.css';

function SortingForm() {
  const { setOrder } = useContext(AppContext);

  const [columnSorter, setColumnSorter] = useState('population');
  const [sortOrder, setSortOrder] = useState('ASC');

  const handleInputChange = ({ target: { value } }) => {
    setSortOrder(value);
  };

  const handleSelectChange = ({ target: { value } }) => {
    setColumnSorter(value);
  };

  const handleSorterClick = () => {
    setOrder({
      column: columnSorter, sort: sortOrder,
    });
  };

  const generateRadio = () => (
    <div className="radio-container">
      <label htmlFor="sort-asc" className="rad-label">
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          id="sort-asc"
          name="sort-asc"
          value="ASC"
          className="rad-input"
          checked={ sortOrder === 'ASC' }
          onChange={ handleInputChange }
        />
        <div className="rad-design" />
        <div className="rad-text">ASCENDENT</div>
      </label>
      <label htmlFor="sort-desc" className="rad-label">
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          id="sort-desc"
          name="sort-desc"
          value="DESC"
          className="rad-input"
          checked={ sortOrder === 'DESC' }
          onChange={ handleInputChange }
        />
        <div className="rad-design" />
        <div className="rad-text">DESCENDENT</div>
      </label>
    </div>
  );

  return (
    <fieldset className="sort-fieldset">
      <legend>SORT</legend>
      <form className="sort-form">
        <label htmlFor="column-sort" className="filter-label">
          COLUMN
          <select
            value={ columnSorter }
            data-testid="column-sort"
            onChange={ handleSelectChange }
          >
            {columnFilters.map((filterOption) => (
              <option key={ `sort-${filterOption}` }>
                {filterOption}
              </option>
            ))}
          </select>
        </label>
        <div>
          <div className="radio-outer-container">
            <div className="filter-label">ORDER</div>
            {generateRadio()}
          </div>
        </div>
      </form>
      <button
        type="button"
        onClick={ handleSorterClick }
        data-testid="column-sort-button"
      >
        SORT
      </button>
    </fieldset>
  );
}

export default SortingForm;
