import readlineSync from "readline-sync";
import { Item } from "./data/classes.js";
// import { colors } from "./data/colors.js";
import {
  mainMenuTemplate,
  subMenuTemplate,
  displayGlobalStorage,
  sortMenuTemplate,
} from "./data/templates.js";

const globalStorage = [
  {
    taskName: "Update Papers",
    author: "Hannah",
    date: "2024/01/31",
    priority: 3,
  },
  {
    taskName: "Install new software",
    author: "ABC",
    date: "2024/01/28",
    priority: 4,
  },
  {
    taskName: "Call back customer #271",
    author: "Vivi",
    date: "2024/02/05",
    priority: 2,
  },
  {
    taskName: "Answer emails",
    author: "Tom",
    date: "2023/11/18",
    priority: 2,
  },
];

let sortedBy = "in no specific order";
console.clear();

function startProgramm() {
  const mainMenu = readlineSync.question(mainMenuTemplate);

  switch (mainMenu.toUpperCase()) {
    case "C":
      globalStorage.push(makeItem());
      console.log(
        "Created a new task:",
        globalStorage[globalStorage.length - 1]
      );
      startProgramm();
      break;

    case "R":
      console.clear();
      displayGlobalStorage(globalStorage, sortedBy);
      startSubMenu();
      break;

    case "U":
      console.clear();
      displayGlobalStorage(globalStorage, sortedBy);
      let id = readlineSync.question(
        `Please state the number of the task you would like to update (1 - ${globalStorage.length})`
      );
      updateItem(globalStorage[id - 1]);

      break;

    case "D":
      break;

    case "Q":
      console.clear();
      console.log("Good luck with your tasks & goodbye for now!");
      break;

    default:
      console.log("Invalid input");
      startProgramm();
  }
}

function startSubMenu() {
  let subMenu = readlineSync.question(subMenuTemplate);
  switch (subMenu.toUpperCase()) {
    case "B":
      console.clear();
      startProgramm();
      break;
    case "S":
      startSortMenu();
      break;
    default:
      console.log("Invalid input.");
      startSubMenu();
  }
}

function startSortMenu() {
  let sortMenu = readlineSync.question(sortMenuTemplate);
  switch (sortMenu.toUpperCase()) {
    case "B":
      console.clear();
      startProgramm();
      break;
    case "A":
      sortedBy = "sorted by author (A-Z)";
      globalStorage.sort((obj1, obj2) =>
        obj1.author.localeCompare(obj2.author)
      );
      displayGlobalStorage(globalStorage, sortedBy);
      startSubMenu();
      break;
    case "D":
      sortedBy = "sorted by date (ascending)";
      globalStorage.sort((obj1, obj2) => {
        return obj2.date.split("/")[0] != obj1.date.split("/")[0]
          ? obj2.date.split("/")[0] - obj1.date.split("/")[0]
          : obj2.date.split("/")[1] != obj1.date.split("/")[1]
          ? obj2.date.split("/")[1] - obj1.date.split("/")[1]
          : obj2.date.split("/")[2] - obj1.date.split("/")[2];
      });
      displayGlobalStorage(globalStorage, sortedBy);
      startSubMenu();
      break;
    case "P":
      sortedBy = "sorted by priority (ascending)";
      globalStorage.sort((obj1, obj2) => obj1.priority - obj2.priority);
      displayGlobalStorage(globalStorage, sortedBy);
      startSubMenu();
      break;
    default:
      console.log("Invalid input.");
      startSubMenu();
  }
}

function makeItem() {
  // aktuelles Datum speichern:
  let currDate = new Date();
  let year = currDate.getFullYear();
  let month = currDate.getMonth() + 1;
  let date = currDate.getDate();
  let fullDate = `${year}/${month}/${date}`;

  let task = readlineSync.question("Task description: ");
  let auth = readlineSync.question("Author: ");
  let prio = readlineSync.question("Priority (1-4): ");
  while (isNaN(prio) || prio < 1 || prio > 4) {
    console.log("Invalid priority: Please enter a number from 1 to 4.");
    prio = readlineSync.question("Priority (1-4): ");
  }

  let newItem = new Item(task, auth, fullDate, prio);
  return newItem;
}

function updateItem(obj) {
  console.log(`Current item values: 

Author: ${obj.author}
Date: ${obj.date}
Priority: ${obj.priority} 

Please insert the new value(s). Values with no update can be left blank.`);
  obj.taskName = readlineSync.question("Task: ");
  obj.author = readlineSync.question("Author: ");
  obj.date = fullDate;
  obj.priority = readlineSync;
}

startProgramm();

// weiter bei update
