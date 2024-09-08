import {fetchData} from './utils.js';
import {apiURL} from './variables.js';
import {restaurantRow, restaurantModal} from './components.js';

const tableBody = document.querySelector('#tableBody');
const modaali = document.querySelector('dialog');
const info = document.querySelector('#info');
const closeModal = document.querySelector('#close-modal');

closeModal.addEventListener('click', () => {
  modaali.close();
});

const renderRestaurants = async (filterCompany = 'All') => {
  try {
    const restaurants = await fetchData(apiURL + '/api/v1/restaurants');

    const filteredRestaurants =
      filterCompany === 'All'
        ? restaurants
        : restaurants.filter(({company}) =>
            company.toLowerCase().includes(filterCompany.toLowerCase())
          );

    tableBody.innerHTML = '';
    if (filteredRestaurants.length === 0) {
      tableBody.innerHTML =
        '<tr><td colspan="3">No restaurants found for this company.</td></tr>';
      return;
    }

    filteredRestaurants.forEach((restaurant) => {
      const row = restaurantRow(restaurant);
      row.addEventListener('click', async () => {
        modaali.showModal();
        info.innerHTML = '<div>Loading...</div>';

        const highlightedRows = document.querySelectorAll('.highlight');
        highlightedRows.forEach((highlightedRow) =>
          highlightedRow.classList.remove('highlight')
        );

        row.classList.add('highlight');

        try {
          const menu = await fetchData(
            `${apiURL}/api/v1/restaurants/daily/${restaurant._id}/en`
          );
          const modalContent = restaurantModal(restaurant, menu.courses);
          info.innerHTML = modalContent;
        } catch (menuError) {
          console.error('Failed to fetch menu:', menuError);
          info.innerHTML = '<p>Failed to load menu. Please try again.</p>';
        }
      });
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
    tableBody.innerHTML =
      '<tr><td colspan="3">Failed to load restaurants. Please try again.</td></tr>';
  }
};

document.querySelector('#sodexoFilter').addEventListener('click', () => {
  renderRestaurants('Sodexo');
});

document.querySelector('#compassFilter').addEventListener('click', () => {
  renderRestaurants('Compass');
});

document.querySelector('#allFilter').addEventListener('click', () => {
  renderRestaurants('All');
});

renderRestaurants();
