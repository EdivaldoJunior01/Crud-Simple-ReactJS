import Client from '../../models/Clients'
import dbConnect from '../../services/db' //conexao de bd

dbConnect()

export default async function handler(req, res) { //requisição e resposta
    const { method } = req//extrair o metodo de dentro da req

    switch(method) {
        case 'GET':
            try {
                const clients = await Client.find({}) //pegar todos os clientes q estão cadastrado, await pq esta buscando dados fora da aplicação e lembrar de colocar async para funções assincronas
                res.status(200).json({success: true, data: clients})
            } catch(err) {
                console.log(err)
                res.status(500).json({success: false, err})//status de erro

            }
        break;

        case 'POST':
            try{
                const {name, email} = req.body//dados que vem pelo body

                if(!name && !email) throw 'invalid data'

                const client = await Client.create({name, email})

                res.status(201).json({success: true, data: client})
            } catch(err) {
                console.log(err)
                res.status(500).json({success: false, err})//status de erro
            }
        break;
    }
}
