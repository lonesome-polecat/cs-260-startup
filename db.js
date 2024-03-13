const { MongoClient } = require('mongodb')
const config = require('./dbConfig.json')

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`

console.log('Starting connection...')

const client = new MongoClient(url)
const db = client.db('arizonuts')

async function run() {
    try {
        console.log('Connecting to database sample_airbnb...')
        const database = client.db('sample_airbnb');
        const listings = database.collection('listingsAndReviews');
        // Query for a movie that has the title 'Back to the Future'
        const query = { summary: '' };
        const listing = await listings.findOne(query);
        console.log(listing);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
//run().catch(console.dir);

async function insertItem(collection_name, item) {
    try {
        const collection = db.collection(collection_name)
        await collection.insertOne(item)
        console.log('Inserted item successfully')
    } catch (e) {
        console.log(e)
    } finally {
        await client.close();
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

insertItem('orders', order)