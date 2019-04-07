const ICrud = require('./interfaces/intefaceCrud')
const Sequelize = require('sequelize');

class Postgres extends ICrud {
    constructor() {
        super();
        this._driver = null;
        this._herois = null;
        this.connect();
    }

    async defineModel() {
        this._herois = this._driver.define(
            'herois', 
            {
                id: {
                    type: Sequelize.INTEGER,
                    require: true,
                    primaryKey: true,
                    autoIncrement: true,
                },
                nome: {
                    type: Sequelize.STRING,
                    require: true,
                },
                poder: {
                    type: Sequelize.STRING,
                    require: true,
                },
            },
            {
                // opcoes para base existente
                tableName: 'TB_HEROIS',
                freezeTableName: false,
                timestamps: false
            });
        await this._herois.sync()
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'fabio',
            '12345',
            {
                host: '192.168.99.100',
                dialect: 'postgres',
                // case sensitive
                quoteIdentifiers: false,
                // deprecation warning
                // operatorsAliases: false
            }
        );
        this.defineModel();

    }

    async isConnected() {
        try {
            await this._driver.authenticate();
            return true;
        }
        catch(error) {
            console.log('Não conectou:', error);
            return false;
        }
    }

    async create(item) {
        const { dataValues } = await this._herois.create(item);
        return dataValues;
    }

    async read(item, skip=0, limit=10) {
        return this._herois.findAll({where: item, raw: true})
    }

    async update(id, item) {
        return  this._herois.update(item, {where: {id: id}});
    }

    async delete(id) {
        const query = id ? { id } : {};
        return this._herois.destroy({where: query})
    }

}

module.exports = Postgres;