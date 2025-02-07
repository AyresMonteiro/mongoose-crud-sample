const Contact = require("../schemas/Contact");

const question = require("../util/question");

async function addContact() {
  const data = {};

  data["name"] = question("Insert the name: ");
  data["age"] = question("Insert the age: ", 'INT');
  data["address"] = question("Insert the address: ");
  data["organization"] = question("Insert the organization: ");

  const newContact = new Contact(data);

  if (!newContact.validateSync()) {
    await newContact.save()
      .catch(err => {
        if (err)
          console.log("Error on inserting contact");
      })
      .then(doc => console.log("Contact saved!", doc));
  }
  else
    console.log("Error on inserting contact");
}

async function showContacts() {
  await Contact.find({})
    .catch(err => {
      if (err)
        console.log("Error in the query!");
    })
    .then(docs => console.log("Contacts:", docs));
}

async function delContactById() {
  const id = question("Insert id of contact: ");
  await Contact.deleteOne({ _id: id })
    .catch(err => {
      if (err)
        console.log("Error on delete!");
    })
    .then(() => console.log("Success!"));
}

async function delAllContacts() {
  await Contact.deleteMany({})
    .catch(err => {
      if (err)
        console.log("Error on delete!");
    })
    .then(() => console.log("Success!"));
}

async function updateContact() {
  const id = question("Insert id of contact: ");
  const data = {};

  data["name"] = question("Insert the name: ");
  data["age"] = question("Insert the age: ", 'INT');
  data["address"] = question("Insert the address: ");
  data["organization"] = question("Insert the organization: ");

  const contact = await Contact.findOneAndUpdate({ _id: id }, data, {
    useFindAndModify: true
  })
    .catch(err => {
      if (err)
        console.log("Error on update!");
    })
    .then(() => {
      console.log("Success on update!");
    })
}

module.exports = {
  addContact,
  showContacts,
  delContactById,
  delAllContacts,
  updateContact
}
