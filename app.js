const fs = require('fs');
const argv = require('yargs').argv;

const show = argv.show;
const add = argv.add;
const del = argv.del;

const unParseList = fs.readFileSync('./list.json');
const allListParse = JSON.parse(unParseList);
const list = allListParse.tasks;

function writeFile() {
   fs.writeFile('./list.json', JSON.stringify(allListParse), 'utf8', (error) => {
      if(error) {
         console.log('Write file error');
      }
   });
}

if(show) {
   for(let i = 0; i < allListParse.count; i++) {
      console.log(`${list[i].number}. ${list[i].message}`);
   }
}

if(add) {
   allListParse.count++;
   let task = {number: allListParse.count, message: add};
   allListParse.tasks.push(task);
   try {
      writeFile();
      console.log('Task has been added');

   } catch(error) {
      error.message();
   }
}

if(del <= allListParse.count) {
   allListParse.tasks = allListParse.tasks.filter(function(task) {
      return task.number !== del;
   });
   allListParse.count--;
   for(let i = 0; i < allListParse.count; i++) {
      allListParse.tasks[i].number = i + 1;
   }
   try {
      writeFile();
      console.log(`Task ${del} has been deleted`);
   } catch(error) {
      error.message();
   }
}else{
   console.log(`You have only ${allListParse.count} tasks`);
}
