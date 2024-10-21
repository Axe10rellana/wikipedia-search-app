import {
  clearPushListener,
  clearSearchText,
  setSearchFocus,
  showClearTextButton,
} from "./searchBar.js";
import {
  deleteSearchResult,
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
} from "./searchResults.js";
import { getSearchTerm, retrieveSearchResult } from "./dataFunctions.js";

document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();

  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);
  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);

  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitTheSearch);
};

//Funcion Procedural "workflow"
const submitTheSearch = (e) => {
  e.preventDefault();
  deleteSearchResult();
  processTheSearch();
  setSearchFocus();
};

//Procedural
const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === "") return;
  const resultArray = await retrieveSearchResult(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray);
  setStatsLine(resultArray.length);
};
