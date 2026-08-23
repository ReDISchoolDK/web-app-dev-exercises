// =====================================================================
// EXERCISE — The bridge: JavaScript/TypeScript warm-up
//
// This file runs in the browser. Open the console (F12 → Console) at
// http://localhost:5173/bridge/ to see every console.log below.
//
// Read the README — it tells you when to work on which section.
// =====================================================================

// ---------------------------------------------------------------------
// Section 1 — Read and predict
//
// Don't run it yet. Read the code, write down what you think lines
// A, B and C print, THEN check the browser console.
// ---------------------------------------------------------------------

const tasks = [
	{ name: "Water the plants", minutes: 5, isDone: true },
	{ name: "Write the report", minutes: 90, isDone: false },
	{ name: "Reply to Sam", minutes: 10, isDone: false },
	{ name: "Book the flights", minutes: 25, isDone: true },
];

// `(task) => ...` is an arrow function: it takes one input and returns
// the value after the arrow. filter/map call it once per array element.

const shortTasks = tasks.filter((task) => task.minutes <= 15);
console.log("A:", shortTasks.length);

const shoutedNames = tasks.map((task) => task.name.toUpperCase());
console.log("B:", shoutedNames[1]);

const openMinutes = tasks
	.filter((task) => !task.isDone)
	.map((task) => task.minutes);
console.log("C:", openMinutes);

// ---------------------------------------------------------------------
// Section 2 — Translate
//
// Here is the same idea written as pseudocode (not any real language):
//
//   for each task in tasks:
//     if task is done:
//       collect task.name
//   → that collection is doneTaskNames
//
// Write it as one filter(...).map(...) chain.
// ---------------------------------------------------------------------

// TODO: replace the empty array with the chain.
const doneTaskNames: string[] = [];
console.log("Done tasks:", doneTaskNames);

// ---------------------------------------------------------------------
// Section 3 — Type it
//
// 1. Give `minutesPerDay` a type: change `const minutesPerDay =` into
//    `const minutesPerDay: number =`. Nothing visible changes — the
//    value already is a number.
// 2. Now change 30 into "thirty" and watch the editor. Red squiggle.
//    Hover it and read the message — TypeScript caught the bug before
//    the code ever ran.
// 3. Change it back to 30. The squiggle goes away.
// ---------------------------------------------------------------------

const minutesPerDay = 30;
console.log("Minutes free per day:", minutesPerDay);
