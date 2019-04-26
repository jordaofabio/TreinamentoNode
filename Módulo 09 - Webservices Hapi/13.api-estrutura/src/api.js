const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDb = require('./db/strategies/mongodb/mongodb');
const HeoisSchema = require('./db/strategies/mongodb/schemas/heroisSchemas');
const HeroRoute = require('./routes/heroRoutes');

const app = new Hapi.Server({
    port: 7000
});

function mapRoutes(instance, methods) {
    // new HeroRoute()['list']() é igual a new HeroRoute().list()
    return methods.map(method => instance[method]());

}

async function main() {
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, HeoisSchema));

    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])

    await app.start();
    console.log('Servidor rodando na porta', app.info.port)

    return app;
}


module.exports = main();