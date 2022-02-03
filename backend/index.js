import app from "./server.js"
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import RestaurantsDAO from "./api/dao/restaurantsDAO.js"

dotenv.config()
const mongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000

mongoClient.connect(process.env.ATLAS_URI, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    // useNewUrlPars    e: true,
    sslKey: process.env.TLS_FILE,
    sslCert: process.env.TLS_FILE
})
    .catch(err => {
        console.error(err.stack);
        process.exit(1)
    })
    .then(async client => {
        await RestaurantsDAO.injectDB(client) // Get initial reference to the restaurants collections in the database
        console.log(`MongoDB database connection established successfully`);
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    })
