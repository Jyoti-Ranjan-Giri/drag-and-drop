let tasks = ['t1', 't2', 't3', 't4'];
let removed2 = tasks.splice(0, 1);
console.log(tasks);
console.log(removed2);

tasks.splice(1, 0, ...removed2);
console.log(tasks);
