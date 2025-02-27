//function for fetching the data from the api.
const getCountries = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    return await res.json();
  } catch (error) {
    console.log("Failed to fetch countries", error);
  }
};
//creating an array from the fetched data
const countriesFull = await getCountries();
let countries = [...countriesFull];

const reset = () => {
  countries = [...countriesFull];
};
//using a filter function to filter the entire countries array to look for the searched country
const search = (word) => {
  countries = countriesFull.filter((country) => {
    const name = country.name.common.toLowerCase();
    const formatedWord = word.toLowerCase();
    return name.includes(formatedWord);
  });
};

export { countries, reset, search };
