import mongoose from 'mongoose';

const connection: any = {} /* creating connection object*/

async function dbConnect() {
    /* check if we have connection to our databse*/
    if (connection.isConnected) {
        return
    }

    /* connecting to our database */
    const db = await mongoose.connect(String(process.env.MONGODB_URI), {})
    await mongoose.connection.syncIndexes()

    connection.isConnected = db.connections[0].readyState
    if (db) {
        return db.connection
    }
}

export default dbConnect
