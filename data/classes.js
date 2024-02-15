export class Item {
  // constructor(name, id, type, quantity, weight) {
  //   this.name = name;
  //   this.id = id;
  //   this.type = type;
  //   this.quantity = quantity;
  //   this.weight = weight;}
  constructor(taskName, author, date, priority) {
    (this.taskName = taskName),
      (this.author = author),
      (this.date = date),
      (this.priority = priority);
  }
}

// priority
// urgency
// who made this entry
// date of entry
