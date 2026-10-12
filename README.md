# Assignment 4 - Task Dashboard

Talha Yılmaz - Web Programming, Fall 2026

Open `index.html` in a browser and click **Load Tasks**. No server or build step is needed.

## File organization

```
index.html       page structure: heading, Load Tasks button, status message, task list
styles.css       minimal styling, line-through for completed tasks
taskManager.js   Task and TaskManager classes
api.js           fetchTasks() - returns a Promise that resolves after 1500ms
main.js          button handler, rendering, toggle/delete events, error handling
```

The scripts are loaded in this order at the bottom of `index.html`: taskManager.js, api.js,
main.js. main.js uses the classes and the function from the other two, so it has to come last.

## Challenges I faced

**Modules vs plain scripts.** I wanted to use import/export, but Chrome blocks ES modules when the
page is opened from the file system (file://), so the page would only work through a local
server. I used three normal script tags instead so the page works by double-clicking index.html.

**Not mutating the array.** My first idea for toggleTask was to find the task and flip
`completed` on it, but that changes the object that is already in the array. Instead
toggleTask uses `map` and returns `task.toggle()`, which creates a new Task, for the matching id.
removeTask uses `filter`, addTask and setTasks use the spread operator, so every update creates a
new array.

**Events on elements that get re-rendered.** After every toggle or delete the whole list is
redrawn, so listeners attached to the old buttons disappear with them. I put one click listener on
the `#taskList` container and used `closest()` to find which button and which task was clicked,
reading the id from `data-id`.

**Git history.** At one point I committed main.js before TaskManager was committed, and the page
did not work in that commit because main.js needed a class that was not there yet. I fixed it with
two follow-up commits instead of rewriting history that was already pushed.
