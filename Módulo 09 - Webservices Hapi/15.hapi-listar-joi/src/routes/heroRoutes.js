const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    failAction: (request, headers, erro) => {
                        throw erro;
                    },
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                // o Hapi.js já resolve promise, então não precisamos de await

                try {
                    let { skip, limit, nome } = request.query;

                    // if (skip != undefined && isNaN(skip)) {
                    //     throw Error('O tipo do skip deve ser number.');
                    // } else if (skip != undefined) {
                    //     skip = parseInt(skip);
                    // }
                    
                    // if (limit != undefined && isNaN(limit)) {
                    //     throw Error('O tipo do limit deve ser number.');
                    // } else if (limit != undefined) {
                    //     limit = parseInt(limit);
                    // }

                    // let query = {}
                    // if(nome) {
                    //     query.nome = nome;
                    // }

                    const query = nome ? { nome: {$regex: `.*${nome}*.`} } : {};


                    return this.db.read(query, skip, limit)

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