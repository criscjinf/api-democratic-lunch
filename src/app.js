const  express = require('express')
// const faker = require('./lib/fakerData')

class AppController {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }
  
    middlewares() {
        this.express.use(express.json());
    }
  
    routes() {
        this.express.use(require("./routes/routes"));
    }
}

module.exports = new AppController().express;