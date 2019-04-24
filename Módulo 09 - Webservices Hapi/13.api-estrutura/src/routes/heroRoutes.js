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
                return this.db.read()
            }
       } 
    }
}

module.exports = HeroRoutes;