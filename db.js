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
            const collection = this.db.collection(collection_name)
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

    async getUser(email) {
        return this.getItem('customers', {email: email})
    }

    async checkForDuplicate(collection_name, pattern) {
        const collection = this.db.collection(collection_name)
        let item = await collection.findOne(pattern)
        if (item === null) {
            return false
        } else {
            return true
        }
    }

    async createUser(body) {
        // let isDuplicate = await this.checkForDuplicate('customers', {email: body.email})
        // if (isDuplicate) return false
        let password = await bcrypt.hash(body.password, 10)
        const user = {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: password,
            phone_number: '',
            token: uuid.v4()
        }
        await this.insertItem('customers', user)
        return user
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