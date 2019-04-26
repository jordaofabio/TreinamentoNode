const BaseRoute = require('./base/baseRoute');

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                // o Hapi.js já resolve promise, então não precisamos de await

                try {
                    const { skip, limit, nome } = request.query;

                    console.log('limit', parseInt(limit))
                    console.log('skip', parseInt(skip))

                    let query = {}
                    if(nome) {
                        query.nome = nome;
                    }
                    return this.db.read(query, parseInt(skip), parseInt(limit))

                }
                catch (error) {
                    console.log('Deu ruim', error)
                    return 'Erro interno no servidor';
                }
            }
        }
    }
}

module.exports = HeroRoutes;