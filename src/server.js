const app = require('./app')
const config = require('config');
const port = config.get('server').port || 3000

app.listen(port, () => {
    console.log(`http://localhost:${port}`)})