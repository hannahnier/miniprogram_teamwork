# My little Programm

## Vorbereitung:

- Installiere das notwendige Package mit `npm install readline-sync`
- Bearbeiten deine package.json:
  - füge in Zeile 2 `"type": "module"` ein.
- Erstelle einen extra Ordner namens `data`
  - Erstelle eine classes.js
  - Erstelle eine templates.js
  - Erstelle eine colors.js
- classes.js
  - Erstelle eine Klasse namens `Items` mit den Parametern:
    - name, id, type, quantity, weight
  - Exportiere die Klasse
- templates.js
  - Importiere die colors
  - erstelle eine Variable mit einem Template String.
  - Exportiere diese Variable
  - Beispiel:

```js
export const mainMenuTemplate = `
0=================___Main Menu___===================0
0                                                   0
0 [${colors.blue}C${colors.reset}]reate - [${colors.green}R${colors.reset}]ead - [${colors.yellow}U${colors.reset}]pdate - [${colors.red}D${colors.reset}]elete - [${colors.magenta}Q${colors.reset}]uit  0
0                                                   0
0===================================================0
`;
```

- colors.js
  - Übenhme den Inhalt des Codes unterhalb.
  - More Info: https://talyian.github.io/ansicolors/

```js
export const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

// Verwendung der Farben
// console.log(colors.red + "Roter Text" + colors.reset);
// console.log(colors.green + "Grüner Text" + colors.reset);
// console.log(colors.blue + "Blauer Text" + colors.reset);
// console.log(colors.yellow + "Gelber Text" + colors.reset);
// console.log(colors.magenta + "Magenta Text" + colors.reset);
// console.log(colors.cyan + "Cyan Text" + colors.reset);
// console.log(colors.white + "Weißer Text" + colors.reset);
```

- Importiere in der app.js:
  - Item von der classes.js
  - colors von der colors.js
  - mainMenuTemplate von der template.js
  - readlineSync von "readline-sync"

## Main Function

- Erstelle ein leeres Array im Global Scope, das ist unser "globalStorage".
- Schreibe eine Function, um das Programm starten zu können.
- Lass dein mainMenuTemplate mit Readline anzeigen.

  - Je nach Input - C R U D oder Q - soll etwas passieren:

#### C - reate

- Erstelle eine neue Instanz mit den Values, die du über Readline-Sync übergibst.
- const name = readlineSync.question("Name des Elements: ")
  - name kriegt den VALUE von eurem INPUT.
- Die erstellte Instanz soll im globalStorage angezeigt werden.
- Lass dir das erstellte Element anzeigen.
- Achte darauf, dass weight und quantity NUR Zahlen akzeptiert.

#### R - ead

- Lass dir dein globalStorage als grafischen template string anzeigen.
- Lass dir jedes Item anzeigen mit: ID, Typ, Anzahl, Gewicht und das Gesamtgewicht dieses Items
  - Anzahl \* Gewicht = Gesamtgewicht.
- Nutze reduce() um JEDES Gesamtgewicht zusammen zu rechnen um ein Gesamtgewicht ALLER Items zu erhalten.
- Erstelle ein weiteres Menü:
- Wenn Input "B" eingegeben wird, dann öffne das Hauptmenü
- Wenn Input "S" eingegeben wird, dann zeige ein neues Template, wonach sortiert werden soll.
  - Sortiere nach [N]ame, [I]d, [T]ype, [Q]uantity, [W]eight
  - Du könntest hierfür einen switch oder ein if-else nutzen

#### U - pdate

- Lass dir dein Lager anzeigen.
- Wähle per ID aus, welches Element geändert werden soll.
- Frage den User mit readline Sync wie die neuen Values lauten sollen.
  - wenn der Input leer bleibt, dann soll er den alten Value behalten.
- Gebe dein bearbeitetes Element in der Console aus.
- Überprüfe, ob das Element im globalStorage geändert wurde.

#### D - elte

- Lass dir dein Lager anzeigen
- Nutze z.B. die ID um das Element zu selektieren.
- Überprüfe, ob die ID im Array exsistiert und entferne diesen Eintrag aus dem Array.

#### Q - uit

- Beende das Programm.
