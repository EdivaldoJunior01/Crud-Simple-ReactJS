import Client from '../../../models/Clients'
import dbConnect from '../../../services/db' //conexao de bd

dbConnect()

export default async function handler(req, res) { //requisição e resposta
    const { method } = req//extrair o metodo de dentro da req
    const { ClientID } = req.query
    res.json({ ClientID })


    switch (method) {
        case 'PUT':
            try {
                const {name, email} = req.body
                
                if(!name && !email) throw 'invalid data'
                 await Client.updateOne({ _id: ClientID}, {name, email}) //atualizar um cliente, onde o id dele seja = ClientId é {name, email} são os dados que vou atualizar 
                res.status(200).json({ success: true })
            } catch (err) {
                console.log(err)
                res.status(500).json({ success: false, err })//status de erro

            }
            break;

        case 'DELETE':
            try {
                await Client.deleteOne({ _id: ClientID })//quero deletar um cliente cujo id dele seja = ClientID

                res.status(201).json({ success: true})
            } catch (err) {
                console.log(err)
                res.status(500).json({ success: false, err })//status de erro
            }
            break;
    }
}
