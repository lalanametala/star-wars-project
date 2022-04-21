export const tableHeading = ['Name',
  'Rotation Period',
  'Orbital Period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Surface Water',
  'Population',
  'Films',
  'Created',
  'Edited',
  'URL'];

export const columnFilters = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export const nameSorter = (a, b) => {
  const minusOne = -1;
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return minusOne;
  }
  return 0;
};

export const ascSorter = (a, b) => {
  const minusOne = -1;
  if (+a.value > +b.value) {
    return 1;
  }
  if (+a.value < +b.value) {
    return minusOne;
  }
  return 0;
};

export const descSorter = (a, b) => {
  const minusOne = -1;
  if (+a.value < +b.value) {
    return 1;
  }
  if (+a.value > +b.value) {
    return minusOne;
  }
  return 0;
};
