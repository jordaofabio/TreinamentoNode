const ICrud = require('./../interfaces/intefaceCrud')
const Sequelize = require('sequelize');

class Postgres extends ICrud {
    constructor(_connection, _schema) {
        super();
        this._connection = _connection;
        this._schema = _schema;
    }

    static async connect() {
        const conn = this._connection = new Sequelize(
            'heroes',
            'fabio',
            '12345',
            {
                host: 'localhost',
                dialect: 'postgres',
                // case sensitive
                quoteIdentifiers: false,
                // deprecation warning,
                // operatorsAliases: false,
                logging: false
            }
        );
        return conn;
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        );
        await model.sync();
        return model;
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            return true;
        }
        catch(error) {
            console.log('Não conectou:', error);
            return false;
        }
    }

    async create(item) {
        const { dataValues } = await this._schema.create(item);
        return dataValues;
    }

    async read(item, skip=0, limit=10) {
        return this._schema.findAll({where: item, raw: true})
    }

    async update(id, item, upsert = false) {
        const fn = upsert ? 'upsert' : 'update';
        return  this._schema[fn](item, {where: {id: id}});
    }

    async delete(id) {
        const query = id ? { id } : '';
        return query ? this._schema.destroy({where: query}) : false;
    }

}

module.exports = Postgres;