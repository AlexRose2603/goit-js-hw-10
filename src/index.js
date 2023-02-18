import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const countryEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(event) {
  console.log(event.target.value);
  const country = event.target.value.trim();
  loadMarkup();
  if (!country) {
    return;
  }
  fetchCountries(country).then(answerCheck).catch(wrongNameInput);
}

function createMarkup({ name, capital, population, flags, languages }) {
  console.log(name);
  const langNames = languages.map(({ name }) => name).join(', ');
  return `
  <div class="country-info">
  <h2 class="country-name">Name:${name}</h2>
  <p class="country-capital">Capital: ${capital}</p>
  <p class="country-population">Population: ${population}</p>
  <p class="country-flag">Flags: <img src="${flags.svg}" width="70"
 alt="flag"></p>
  <p class="country-language">Languages: ${langNames}</p>
  </div>`;
}

function createListMarkup(listCountries = []) {
  return listCountries
    .map(({ flags, name }) => {
      return `<li>
    <img src="${flags.svg}" width="70"
    alt="flag">
    <h2 class="country-name">Name:${name}</h2>
    </li>`;
    })
    .join('');
}
console.log(createMarkup);
function loadMarkup(countriesList = '', countryInfo = '') {
  countryEl.innerHTML = countryInfo;
  listEl.innerHTML = countriesList;
}

function answerCheck(response) {
  const responseLength = response.length;
  if (responseLength === 1) {
    const firstCountry = createMarkup(response[0]);
    loadMarkup('', firstCountry);
  } else if (responseLength > 1 && responseLength <= 10) {
    const saveMarkup = createListMarkup(response);
    loadMarkup(saveMarkup);
  } else {
    specifyName();
  }
}
function specifyName() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function wrongNameInput() {
  Notiflix.Notify.failure(`Oops, there is no country with that name`);
}
