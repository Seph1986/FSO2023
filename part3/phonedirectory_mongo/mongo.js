const mongoose = require('mongoose')
const password = process.argv[2]

const url = `mongodb+srv://notes_app:${password}@testingmongo.ksofxdk.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

// PARAMETERS CHECK
if (process.argv.length < 3){
    console.log('Missing password: node mongo.js <password>')
    process.exit(1)
}


if (process.argv.length  === 4 && process.argv.length < 5){
    console.log('Missing number: node mongo.js name <number>')
    process.exit(1)
}

if (process.argv.length > 5){
    console.log('To many arguments')
    process.exit(1)
}


// PERSON SCHEMA
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})


// PERSON MODEL
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3){
    Person.find({}).then(res => {
        res.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
    mongoose.connection.close()
    })
}
else{
    // PERSON MODEL INSTANCE
    const myPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    
    // ADDING myPerson TO THE PHONEBOOK DATABASE
    myPerson.save().then(res =>{
        console.log(`added ${res.name} number ${res.number} to phonebook`)
        mongoose.connection.close()
    })
}
