import  mongoose  from 'mongoose';
const ClientSchema = new mongoose.Schema({//construtor que cria a entidade
  name: String,
  email: String,
  createAt:{
      type: Date,
      default: new Date()
  }  
})

const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema)
export default Client
