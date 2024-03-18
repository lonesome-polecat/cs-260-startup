const { MongoClient } = require('mongodb')
const config = require('./dbConfig.json')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

class dbClient {
    constructor() {
        console.log('Starting connection...')

        const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`
        const client = new MongoClient(url)
        this.db = client.db('arizonuts')
    }

    async testConnection() {
        try {
            await this.db.command({command: "ping"})
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    // async run() {
    //     try {
    //         console.log('Connecting to database sample_airbnb...')
    //         const database = client.db('sample_airbnb');
    //         const listings = database.collection('listingsAndReviews');
    //         // Query for a movie that has the title 'Back to the Future'
    //         const query = { summary: '' };
    //         const listing = await listings.findOne(query);
    //         console.log(listing);
    //     } finally {
    //         // Ensures that the client will close when you finish/error
    //         await client.close();
    //     }
    // }
//run().catch(console.dir);

    async insertItem(collection_name, item) {
        try {
            const collection = this.db.collection(collection_name)
            await collection.insertOne(item)
            console.log('Inserted item successfully')
        } catch (e) {
            console.log(e)
        }
    }

    async getItem(collection_name, pattern) {
        try {
            const collection = db.collection(collection_name)
            // If it cannot find the item based on the pattern, it returns null
            let item = await collection.findOne(pattern)
            console.log(item)
            return item
        } catch (e) {
            console.log(e)
        }
    }

    async getUserByToken(token) {
        return this.getItem('customers', {token: token})
    }

    async getUser(username) {
        return this.getItem('customers', {username: username})
    }

    async checkForDuplicate(collection_name, pattern) {
        try {
            const collection = db.collection(collection_name)
            let item = await collection.findOne()
            if (item === null) {
                return false
            } else {
                return true
            }
        } catch (e) {
            console.log(e)
        }
    }

    async createUser(body) {
        let isDuplicate = await this.checkForDuplicate('customers', {email: body.email})
        if (isDuplicate) return false
        let password = bcrypt.hash(body.password, 10)
        const user = {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: password,
            phone_number: '',
            token: uuid.v4()
        }
        try {
            await this.insertItem('customers', user)
            return user
        } catch (e) {
            console.log(e)
            return false
        }
    }
}


let order = {
    id: 'helam_1',
    name_on_order: 'helam',
    time: '12:53:23',
    pickup_time: '12 Mar 2024 12:50',
    items: [
        {
            id: 'keylime',
            price: 6.00,
            amt: 2
        }
    ]
}

//insertItem('orders', order)
//getItem('orders', {id: 'helam_1'})
module.exports = {
    dbClient
}