//* 1 fetching the data...
const url ="https://www.breakingbadapi.com/api/characters/";
// const getData = () => {
//   fetch(url)
//     .then((response) => {
//       return response.json();
//     })
//     .then((result) => {
//       const gameList = result.response;
//       console.log("gameList", gameList);
//       createHtmlTable(gameList);
//     });
// };
// getData();
//* 2 turn fetch in async/await

const getDataAsync = async () => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const gameList = result;
    console.log("gameList >>>", gameList);
    console.log("result >>>", result);
    // createHtmlTable(gameList);
    // createDropDown(gameList);
    return gameList;
  } catch (error) {
    console.log("error", error);
  }
};
getDataAsync()
//* 3 function for creating table and dropdown
const createHtmlTable = (gameList) => {
  let table = document.getElementById("table");
  table.innerHTML = "";

  gameList.forEach((ele, i) => {
    let row = document.createElement("tr");
    table.appendChild(row);

    let column = document.createElement("td");
    column.innerHTML = ele.name;
    row.appendChild(column);

    let column2 = document.createElement("td");
    column2.innerHTML = ele.occupation;
    row.appendChild(column2);

    let column3 = document.createElement("td");
    //* reformat date
    let date = new Date(ele.birthday).toLocaleString("de-DE", {
      day: "2-digit",
      month: "long",
      year: "2-digit",
    });
    // console.log("date", date);

    column3.innerHTML = date;

    row.appendChild(column3);
  });
};

//* 4 generate Dropdown options
const createDropDown = (gameList) => {
  const dropdown = document.getElementById("leagueDropdown");
  const competitions = gameList.map((e) => {
    return e.competition;
  });
  // console.log("competitons", competitions);
  const unique = [...new Set(competitions)];
  // console.log("unique >>>", unique);
  unique.forEach((competition) => {
    let option = document.createElement("option");
    option.innerHTML = competition;
    option.value = competition;
    dropdown.appendChild(option);
  });
};

//* 5 make controller function
//main function async await
// const controller = async ()=>{} // function expression
async function controller() {
  //get the data async
  const gameList = await getDataAsync();
  console.log("gamelist controller", gameList);
  // build table with all data
  createHtmlTable(gameList);
  //generate DropDown filter options
  createDropDown(gameList);
  //create filter functions
  //
  // set event listeners
  setEventListeners(gameList);
}

//*6 add event listeners
const setEventListeners = (gameList) => {
  document.querySelector("#date").addEventListener("change", (event) => {
    console.log(event.target.value);
    filterByDate(gameList);
  });
  document
    .querySelector("#leagueDropdown")
    .addEventListener("change", (event) => {
      console.log(event.target.value);
      filterByDropDown(gameList);
    });
};

//* 7 fiter by date
const filterByDate = (gameList) => {
  const datePickerValue = document.querySelector("#date").value;
  console.log(typeof datePickerValue);
  const date = new Date(datePickerValue).setHours(0, 0, 0, 0);
  console.log("date", date);
  const filteredDate = gameList.filter((game) => {
    const gameDate = new Date(game.date).setHours(0, 0, 0, 0);
    // console.log(gameDate);
    return gameDate === date;
  });
  console.log("filteredDate", filteredDate);
  createHtmlTable(filteredDate);
};

//* 8 fiter by dropdown
const filterByDropDown = (gameList) => {
  const dropDownValue = document.querySelector("#leagueDropdown").value;
  // console.log("dropDownValue", dropDownValue);
  const filteredGames = gameList.filter((game) => {
    return game.competition === dropDownValue || dropDownValue === "all";

    // the if/else below works the same as the || above. Remember .filter() returns what matches the condition. the condition dropDownValue === "all" is matched by all the elements (because there is nothing to match, basically)...if you write return "assadas", will also return all the values.
    // if (dropDownValue === "all") {
    //   return dropDownValue === "all";
    // } else {
    //   return game.competition === dropDownValue;
    // }
  });
  console.log("filteredGames", filteredGames);
  createHtmlTable(filteredGames);
};

// getDataAsync();
controller();

//for you guys :
//9 combine filters
