import readlineSync from "readline-sync";
import { Item } from "./data/classes.js";
import { colors } from "./data/colors.js";
import {
  mainMenuTemplate,
  subMenuTemplate,
  displayGlobalStorage,
  sortMenuTemplate,
  introTemplate,
} from "./data/templates.js";

const globalStorage = [
  {
    taskName: "Update Papers",
    author: "Hannah",
    date: "2024/1/31",
    priority: 3,
  },
  {
    taskName: "Install new software",
    author: "Agathe",
    date: "2024/1/28",
    priority: 4,
  },
  {
    taskName: "Call back customer #271",
    author: "Vivi",
    date: "2024/2/5",
    priority: 2,
  },
  {
    taskName: "Answer emails",
    author: "Jupp",
    date: "2023/11/18",
    priority: 2,
  },
];

let sortedBy = "in no specific order";

// function startProgramm
function startProgramm() {
  const mainMenu = readlineSync.question(mainMenuTemplate);

  switch (mainMenu.toUpperCase()) {
    case "C":
      globalStorage.push(makeItem());
      console.clear();
      console.log("Created a new task:");
      console.log(
        colors.blue,
        showItem(globalStorage[globalStorage.length - 1]),
        colors.reset
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
        `Please state the number of the task you would like to update (1 - ${globalStorage.length}): `
      );
      while (!globalStorage[id - 1]) {
        id = readlineSync.question(
          `Invalid number. Please state the number of the task you would like to update (1 - ${globalStorage.length}): `
        );
      }
      updateItem(globalStorage[id - 1]);
      // hier noch machen, dass keine ungültige Zahl eingegeben werden kann
      startProgramm();
      break;

    case "D":
      console.clear();
      displayGlobalStorage(globalStorage, sortedBy);
      let idDelete = readlineSync.question(
        `Please state the number of the task you would like to delete (1 - ${globalStorage.length}): `
      );
      deleteItem(globalStorage[idDelete - 1]);
      startProgramm();
      break;

    case "Q":
      console.clear();
      console.log("Good luck with your tasks & goodbye for now!");
      break;

    default:
      console.clear();
      console.log("Invalid input");
      startProgramm();
  }
}

// function startSubMenu
function startSubMenu() {
  let subMenu = readlineSync.question(subMenuTemplate);
  switch (subMenu.toUpperCase()) {
    case "B":
      console.clear();
      startProgramm();
      break;
    case "S":
      displayGlobalStorage(globalStorage, sortedBy);
      console.clear();
      startSortMenu();
      break;
    default:
      console.clear();
      console.log("Invalid input.");
      startSubMenu();
  }
}

// function startSortMenu
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

// function getDate
function getDate() {
  let currDate = new Date();
  let year = currDate.getFullYear();
  let month = currDate.getMonth() + 1;
  let date = currDate.getDate();
  let fullDate = `${year}/${month}/${date}`;
  return fullDate;
}

// function makeItem
function makeItem() {
  console.clear();
  let date = getDate();

  console.log(`Create new task: 
  `);
  let task = readlineSync.question("Task description: ");
  let auth = readlineSync.question("Author: ");
  let prio = readlineSync.question("Priority (1-4): ");
  while (isNaN(prio) || prio < 1 || prio > 4) {
    console.log(
      colors.red,
      "Invalid priority: Please enter a number from 1 to 4.",
      colors.reset
    );
    prio = readlineSync.question("Priority (1-4): ");
  }
  let newItem = new Item(task, auth, date, prio);
  return newItem;
}

// function updateValue
function updateValue(oldValue, newValue) {
  return newValue != "" ? newValue : oldValue;
}

// Function showItem
function showItem(obj) {
  return `
  Task: ${obj.taskName}
  Author: ${obj.author}
  Date: ${obj.date}
  Priority: ${obj.priority} `;
}

// Function updateItem
function updateItem(obj) {
  console.clear();
  console.log(`Current item values: `);

  console.log(showItem(obj));

  console.log(
    `
Please insert the new value(s). Values that remain the same can be left blank. The date will be set automatically. 
    `
  );
  let taskNameNew = readlineSync.question("Task: ");
  let authorNew = readlineSync.question("Author: ");
  let prioNew = readlineSync.question("Priority: ");
  while ((isNaN(prioNew) || prioNew < 1 || prioNew > 4) && prioNew != "") {
    console.log(
      colors.red,
      "Invalid priority: Please enter a number from 1 to 4 or leave it blank.",
      colors.reset
    );
    prioNew = readlineSync.question("Priority (1-4): ");
  }
  obj.taskName = updateValue(obj.taskName, taskNameNew);
  obj.author = updateValue(obj.author, authorNew);
  obj.priority = updateValue(obj.priority, prioNew);
  obj.date = getDate();

  console.clear();
  console.log(`
  Task "${obj.taskName}" has been updated: 
  `);

  console.log(colors.blue, showItem(obj), colors.reset);
}

function deleteItem(obj) {
  console.clear();
  console.log(`Delete task: `);

  console.log(colors.blue, showItem(obj), colors.reset);

  console.log(colors.red);
  let deleteConfirm = readlineSync.question(
    "Are you sure you want to delete this task? (y/n): "
  );
  console.log(colors.reset);
  if (deleteConfirm.toLowerCase() === "y") {
    console.clear();
    let temp = obj.taskName;
    globalStorage.splice(globalStorage.indexOf(obj), 1);
    console.log(`Task "${temp}" has successfully been deleted.`);
  } else if (deleteConfirm.toLowerCase() === "n") {
    console.clear();
    console.log(`No tasks were deleted.`);
  } else {
    ("Your entry was invalid. Let's return to the main menu.");
  }
}

// start the Programm
console.clear();
console.log(introTemplate);

startProgramm();
