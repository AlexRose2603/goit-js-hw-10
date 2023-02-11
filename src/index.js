import './css/styles.css';

const DEBOUNCE_DELAY = 300;

function fetchCountries(name) {
  const URL = `https://restcountries.com/v2/${name}?fields=name,capital,population,flags,languages`;
  return fetch(URL).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}

const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const dataEl = document.querySelector('.country-info');

inputEl.addEventListener('input', onInputChange);
function onInputChange(event) {
  console.log(event.currentTarget.value);
  const text = event.currentTarget.value.trim();
  if (!text) {
    return;
  }
}

//     alert('Too many matches found. Please enter a more specific name.');

// const {name.official, capital, population, flags.svg, languages} = countries[0]
// console.log(countries[0]);
