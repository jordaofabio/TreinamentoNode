const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDb = require('./db/strategies/mongodb/mongodb');
const HeoisSchema = require('./db/strategies/mongodb/schemas/heroisSchemas');
const HeroRoutes = require('./routes/heroRoutes');
const AuthRoutes = require('./routes/authRoutes');

const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');
const JWT_SECRET = 'MEU_SEGREDÃO_123';

const app = new Hapi.Server({
    port: 7000
});

function mapRoutes(instance, methods) {
    // new HeroRoutes()['list']() é igual a new HeroRoutes().list()
    return methods.map(method => instance[method]());

}

async function main() {
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, HeoisSchema));

    const swaggerOptions = {
        info: {
            title: 'API Herois - #CursoNodeBR',
            version: 'v1.0'
        },
        lang: 'pt'
    }
    await app.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
// console.log('mapRoutes', mapRoutes(new HeroRoutes(context), HeroRoutes.methods()))
    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods())
    ]);

    await app.start();
    console.log('Servidor rodando na porta', app.info.port)

    return app;
}


module.exports = main();