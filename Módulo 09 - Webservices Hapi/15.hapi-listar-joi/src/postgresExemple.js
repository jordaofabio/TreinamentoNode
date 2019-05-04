// npm install sequelize
// npm i pg-hstore pg
const Sequelize = require('sequelize');
const driver = new Sequelize(
    'heroes',
    'fabio',
    '12345',
    {
        host: '192.168.99.100',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorAliases: false
    }
);

async function main() {
    const Herois = driver.define('herois', {
        id: {
            type: Sequelize.INTEGER,
            require: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            require: true
        },
        poder: {
            type: Sequelize.STRING,
            require: true
        }
    }, {
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false
    });
    await Herois.sync()
    // await Herois.create({
    //     nome: 'Lanterna Verde',
    //     poder: 'Anel'
    // })
    const result = await Herois.findAll({
        raw: true,
        // attributes: ['nome']
    });
    console.log('result', result);

}

main();