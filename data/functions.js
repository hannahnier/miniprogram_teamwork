/////////////////// Import //////////////////

import readlineSync from "readline-sync";
import { Item } from "./classes.js";
import { colors } from "./colors.js";
import {
  mainMenuTemplate,
  subMenuTemplate,
  sortMenuTemplate,
} from "./templates.js";
import { globalStorage } from "../app.js";

let sortedBy = "in no specific order";

///////////////// Declare functions ///////////////////

// function Display global Storage

export function displayGlobalStorage(storageArr, order) {
  let prioSum = storageArr.reduce((acc, obj) => {
    return acc + Number(obj.priority);
  }, 0);
  console.log(`
  
  ***** Your tasks *****
  
    (${order})
  
  Your team has currently ${storageArr.reduce(
    (acc) => acc + 1,
    0
  )} tasks with an average priority of "${Math.round(
    prioSum / storageArr.length
  )}".
  
  `);

  storageArr.map((obj, index) => {
    console.log(
      colors.blue,
      `
  ${index + 1}.) ${obj.taskName}, 
      Published by ${obj.author} on ${obj.date}.
      Priority: ${obj.priority}
  `,
      colors.reset
    );
  });
}

// function startProgramm

export function startProgramm() {
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

export function startSubMenu() {
  let subMenu = readlineSync.question(subMenuTemplate);
  switch (subMenu.toUpperCase()) {
    case "B":
      console.clear();
      startProgramm();
      break;
    case "S":
      console.clear();
      displayGlobalStorage(globalStorage, sortedBy);
      startSortMenu();
      break;
    default:
      console.clear();
      console.log("Invalid input.");
      startSubMenu();
  }
}

// function startSortMenu

export function startSortMenu() {
  let sortMenu = readlineSync.question(sortMenuTemplate);
  switch (sortMenu.toUpperCase()) {
    case "B":
      console.clear();
      startProgramm();
      break;
    case "A":
      console.clear();
      sortedBy = "sorted by author (A-Z)";
      globalStorage.sort((obj1, obj2) =>
        obj1.author.localeCompare(obj2.author)
      );
      displayGlobalStorage(globalStorage, sortedBy);
      startSubMenu();
      break;
    case "D":
      console.clear();
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
      console.clear();
      sortedBy = "sorted by priority (ascending)";
      globalStorage.sort((obj1, obj2) => obj1.priority - obj2.priority);
      displayGlobalStorage(globalStorage, sortedBy);
      startSubMenu();
      break;
    default:
      console.clear();
      displayGlobalStorage(globalStorage, sortedBy);
      console.log("Invalid input.");
      startSubMenu();
  }
}

// function getDate

export function getDate() {
  let currDate = new Date();
  let year = currDate.getFullYear();
  let month = currDate.getMonth() + 1;
  let date = currDate.getDate();
  let fullDate = `${year}/${month}/${date}`;
  return fullDate;
}

// function makeItem

export function makeItem() {
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

export function updateValue(oldValue, newValue) {
  return newValue != "" ? newValue : oldValue;
}

// Function showItem

export function showItem(obj) {
  return `
    Task: ${obj.taskName}
    Author: ${obj.author}
    Date: ${obj.date}
    Priority: ${obj.priority} `;
}

// Function updateItem

export function updateItem(obj) {
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

// function delete item

export function deleteItem(obj) {
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
