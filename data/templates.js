import { colors } from "./colors.js";

export const mainMenuTemplate = `
0=================___Main Menu___===================0
0                                                   0
0 [${colors.blue}C${colors.reset}]reate - [${colors.green}R${colors.reset}]ead - [${colors.yellow}U${colors.reset}]pdate - [${colors.red}D${colors.reset}]elete - [${colors.magenta}Q${colors.reset}]uit  0
0                                                   0
0===================================================0
`;

export const subMenuTemplate = `
0=================___Sub Menu___====================0
0                                                   0
0          [${colors.blue}B${colors.reset}]ack to Main Menu - [${colors.green}S${colors.reset}]ort             0
0                                                   0
0===================================================0
`;

export const sortMenuTemplate = `
0================___Sort Menu___====================0
0                                                   0
0       How would you like to sort the tasks?       0
0
0  Sort by: [${colors.yellow}A${colors.reset}]uthor - [${colors.red}D${colors.reset}]ate - [${colors.magenta}P${colors.reset}]riority           0
0                                                   0
0===================================================0
`;

// den globalen Storage grafisch ausgeben lassen:

export function displayGlobalStorage(storageArr, order) {
  let prioSum = storageArr.reduce((acc, obj) => {
    return acc + Number(obj.priority);
  }, 0);
  console.log(`

******** Current task list ********
        (${order})

Tasks total: ${storageArr.reduce((acc) => acc + 1, 0)}
Average Priority: ${Math.round(prioSum / storageArr.length)}

----------------- `);

  storageArr.map((obj, index) => {
    console.log(
      `
${index + 1}.) ${obj.taskName}

Author: ${obj.author}
Date: ${obj.date}
Priority: ${obj.priority}

-----------------
`
    );
  });
}
