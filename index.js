const mongoose = require("mongoose");
const contactController = require("./src/controllers/contactController");

const question = require("./src/util/question");


async function menu() {
  const crudFunctions = Object.keys(contactController);
  let a = true;
  let b;

  const connection = await mongoose.connect("mongodb://localhost/sample-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  while (a) {
    console.log("-".repeat(20));
    crudFunctions.forEach((key, i) => {
      console.log(`${i} - ${key}.`);
    });
    console.log("Anything else - Exit.\n");

    b = question("Choose an option: ", 'INT');
    console.log("-".repeat(20));

    selectedFunction = contactController[crudFunctions[b]];

    if (selectedFunction) {
      await selectedFunction();
    }
    else
      break;
  }

  await connection.disconnect();
}

menu();
