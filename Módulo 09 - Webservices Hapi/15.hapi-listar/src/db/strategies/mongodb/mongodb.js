const ICrud = require('../interfaces/intefaceCrud');
const Mongoose = require('mongoose');
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}
class MongoDb extends ICrud {
    constructor(connection, schema) {
        super();
        this._schema = schema;
        this._connection = connection;
    }
    async isConnected() {
            const state = STATUS[this._connection.readyState];
            if (state === 'Conectato') return state;
            if (state !== 'Conectando') {
                await new Promise(resolve => setTimeout(resolve, 1000))
            };
            return STATUS[this._connection.readyState]
    }

    static connect() {
        Mongoose.connect('mongodb://fabio:12345@localhost:27017/herois', { 
            useNewUrlParser: true }, function (error) {
            if (!error) return;
            console.log('Falha na conexão!', error);
        });
        const connection = Mongoose.connection;

        connection.once('open', () => console.log('Database rodando!!!'));

        return connection;
    }

    read(item, skip=0, limit=100) {
        return this._schema.find(item).skip(skip).limit(limit);
    }
    

    async update(id, item) {
        return this._schema.updateOne({ _id: id }, { $set: item })
    }

    async create(item) {
        return this._schema.create(item);
    }

    async delete(id) {
        return this._schema.deleteOne({_id: id})
    }

}

module.exports = MongoDb;