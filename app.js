//////////////// Import /////////////////

import { introTemplate } from "./data/templates.js";
import { startProgramm } from "./data/functions.js";
console.clear();
console.log(introTemplate);

///////////// Prepare default database //////////////

export const globalStorage = [
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

//////////////// Start the Programm ///////////////////

setTimeout(() => {
  console.clear();
  startProgramm();
}, 2000); // after 2 seconds, the menu appears
