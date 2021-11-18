import mongoose from 'mongoose'
const connection = {}

async function dbConnect (){

    if(connection.isConnected){ //verificar se já esta conectado
        return
    }
    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI,{ //padrão de conexão do mongo db
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    connection.isConnected = db.connections[0].readyState

}

export default dbConnect