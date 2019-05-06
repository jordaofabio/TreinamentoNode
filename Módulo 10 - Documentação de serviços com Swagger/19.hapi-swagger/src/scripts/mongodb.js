// docker ps
// docker exec -it idDaImagem /
// mongo -u fabio -p 12345 --authenticationDatabase herois6df097cc0462


// docker exec -it 6df097cc0462 mongo -u fabio -p 12345 --authenticationDatabase herois


show dbs

use herois

show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})
for(let i=0; i <= 100; i++) { 
    db.herois.insert({ nome: 'Flash', poder: 'Velocidade', dataNascimento: '1998-01-01'})
}

db.herois.find()
db.herois.findOne()
db.herois.count()
db.herois.find().limit(5).sort({nome: -1}) // ordena decrescente
db.herois.find({}, { poder: 1, _id: 0 }) //traz apenas a coluna poder; {} = where vazio; _id: 0 força que o id não venha

//update
db.herois.update({ _id: ObjectId("5ca944c1aa3a3f92e85ffa88") }, { nome: 'Mulher Maravilha'})
db.herois.find({ _id: ObjectId("5ca944c1aa3a3f92e85ffa88") }) // ficou só com o nome

// *** se errar o nome do campo, ele cria um campo novo!!!
db.herois.update({ _id: ObjectId("5ca944c1aa3a3f92e85ffa8b") },{ $set: { nome: 'Lanterna Verde'}}) // com este set altera somente o nome sem perder o resto
db.herois.find({ _id: ObjectId("5ca944c1aa3a3f92e85ffa8b") })

db.herois.update({ _id: ObjectId("5ca944c1aa3a3f92e85ffa8b") },{ $set: { poder: 'Anel'}})
db.herois.find({ _id: ObjectId("5ca944c1aa3a3f92e85ffa8b") })

db.herois.remove({ nome: 'Mulher Maravilha'})
db.herois.remove({}) // remove toda a base
