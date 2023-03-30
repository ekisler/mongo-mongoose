require('dotenv').config();
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI);


const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
})

const createAndSavePerson = function(done) {
  const emiKis = new Person({ name: "Emi Kis", age: 35, favoriteFoods: ["Pasta", "Arepa"] })

  emiKis.save(function(err, data) {
    if (err)
      return console.log(err)
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.log(err)
    done(null, personFound); // personFound es una variable que contiene la persona encontrada
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, footFindOne) => {
    if (err) return console.log(err)
    done(null, footFindOne); // footFindOne busca la comida favorita de una persona indicada
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personToId) => {
    if (err) return console.log(err);
    done(null, personToId);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd)
    person.save((err, updatedPersonFood) => {
      if (err) return console.log(err)
      done(null, updatedPersonFood);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedDoc) => {
    if (err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPersonId) => {
    if (err) return console.log(err);
    done(null, removedPersonId);
  }
  )
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, respuesta) => {
    if (err) return console.log(err)
    done(null, respuesta);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select({ age:0 })
    .exec((err, data) => {
  if (err) 
    done(err)
  done(null, data);
})

};


const Person = mongoose.model("Person", personSchema);

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
