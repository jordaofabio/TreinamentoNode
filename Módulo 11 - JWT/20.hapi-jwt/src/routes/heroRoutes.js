const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('boom');

const failAction = (request, headers, erro) => {
        throw erro;
    };

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown();

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
                tags: ['api'],
                description: 'Deve listar heróis',
                notes: 'Pode paginar resultados pelo nome',
                validate: {
                    failAction,
                    headers,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    },
                    headers
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
                    return Boom.internal();
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Deve cadastrar heróis por nome e poder',
                notes: 'Pode criar um heroi',
                validate: {
                    failAction,
                    headers,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    },
                    
                }
            },
            handler: async (request) => {
                try {
                    const {nome, poder} = request.payload;
                    const result = await this.db.create({nome, poder});
                    return {
                        message: 'Herói cadastrado com sucesso!',
                        _id: result._id
                    }
                }
                catch(error) {
                    console.log('DEU RUIM', error);
                    return Boom.internal();
                }
            }
        }
    }
    
    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'Deve atualizar as informações do heróis pelo id',
                notes: 'Pode atualizar qualquer campo',
                validate: {
                    failAction,
                    headers,
                    params: {
                        id: Joi.string().required(),
                    },
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    },
                    
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params;
                    const payload = request.payload;

                    const dadosString = JSON.stringify(payload);
                    const dados = JSON.parse(dadosString); // dessa forma dados não terá as chaves com undefined
                    console.log('teste', dados)

                    const result = await this.db.update(id, dados);
                    console.log('result', result)
                    if(result.nModified < 1)
                        return Boom.preconditionFailed('Não foi possível atualizar')

                    return {
                        message: 'Herói atualizado com sucesso!',
                    }
                }
                catch(error) {
                    console.log('DEU RUIM', error);
                    return 'Internal Error!'
                }
            }
        }
    }

    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Deve remove o herói por id',
                notes: 'O id tem que ser válido',
                validate: {
                    failAction,
                    headers,
                    params: {
                        id: Joi.string().required(),
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params;
                    const result = await this.db.delete(id);
                    if(result.deletedCount < 1)
                        return Boom.preconditionFailed('Não foi possível deletar')

                    return {
                        message: 'Herói deletado com sucesso!',
                    }
                }
                catch(error) {
                    console.log('DEU RUIM', error);
                    return Boom.internal();
                }
            }
        }
    }
}

module.exports = HeroRoutes;