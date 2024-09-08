'use strict';

export const restaurantRow = ({name, company, address}) => {
  const rivi = document.createElement('tr');

  const nimi = document.createElement('td');
  nimi.innerText = name;

  const firma = document.createElement('td');
  firma.innerText = company;

  const osoite = document.createElement('td');
  osoite.innerText = address;

  rivi.append(nimi, firma, osoite);
  return rivi;
};

export const restaurantModal = (restaurant, menu) => {
  const {name, company, address, city, phone, postalCode} = restaurant;

  let listaHTML = '';
  menu.forEach(({name, price, diets}) => {
    listaHTML += `
    <li>
      <h4>${name || 'Not available'}</h4>
      <p>Price: ${price || 'Not available'}</p>
      <p>Diets: ${diets || 'Not available'}</p>
    </li>`;
  });

  const ravintolaHTML = `
    <header>
      <h3>${name}</h3>
      <p>${company}</p>
    </header>
    <address>
      ${address}<br>
      ${postalCode} ${city}<br>
      ${phone}<br>
    </address>
    <div>
      <h3>Today's Menu</h3>
      <ul>
        ${listaHTML}
      </ul>
    </div>
  `;

  return ravintolaHTML;
};
