export class Item {
  constructor(taskName, author, date, priority) {
    (this.taskName = taskName),
      (this.author = author),
      (this.date = date),
      (this.priority = priority);
  }
}
