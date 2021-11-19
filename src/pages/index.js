import { useEffect, useState } from 'react'
import { InputForm } from '../components/input'
import api from '../services/api'
import {
  Button, Flex, Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useToast 
} from '@chakra-ui/react'
export default function Home() {
  const toast = useToast()
  const [name, SetName] = useState('')
  const [email, SetEmail] = useState('')
  const [clients, setClients] = useState([])//array de clientes
  const [id, SetId] = useState(null)
  const [isFormOpen, SetIsFormOpen] = useState(false) //para chamar o form apenas se estiver true ou seja so quando clicar no +

  const [errors, setErrors] = useState({ name: null, email: null })

  const [isLoading, SetIsLoading] = useState(false)
  
  const isValidFormData = () => {
    if (!name) {
      setErrors({ name: 'Name is required' })
      return false
    }

    if (!email) {
      setErrors({ email: 'Email is required' })
      return false
    }

    if (clients.some(client => client.email === email && client._id !== id)) {
      setErrors({ email: "Email already in use" })
      return
    }

    setErrors({})
    return true
  }
  const handleSubmitCreateClient = async (e) => {
    e.preventDefault()//previne que o form seja enviado e atualize a pag
    SetIsLoading(true)
    if (!isValidFormData()) return //se os dados n estiverem validos
    try {
      
      const { data } = await api.post('/clients', { name, email })

      setClients(clients.concat(data.data))

      SetName('')//limpa os campos
      SetEmail('')
      toggleFormState()//fechar o form apos adc  
      SetIsLoading(false)

      toast({
        title: "Client created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      console.log(err)
      SetIsLoading(false)
    }

  }
  const handleChangeName = (text) => { //armazeno o valor que for digitado no campo nome e adc na variavel definida
    SetName(text)
  }
  const handleChangeEmail = (text) => { //armazeno o valor que for digitado no campo email e adc na variavel definida
    SetEmail(text)
  }

  const handleDeleteClient = async (_id) => { //function delete
    try {
      await api.delete(`/clients/${_id}`)
      setClients(clients.filter(client => client._id !== _id))
      //filtrando todos os clientes que o id seja diferente do id que quero remover
      toast({
        title: "Client Deleted.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      console.log(err)
    }

  }
  const handleSubmitUpdateClient = async (e) => { //function update
    e.preventDefault()

    if (!isValidFormData()) return //se os dados n estiverem validos

    try {
      SetIsLoading(true)
      await api.put(`/clients/${id}`, {name, email})
      setClients(clients.map(client => client._id === id ? { name, email, _id: id } : client))
      //quando clicar em editar vou setar nome, email e o id, vou substituir os dados por novos dados, senão eu apenas retorno o valor dele original

      SetName('')//limpa os campos
      SetEmail('')
      SetId(null)
      toggleFormState()//fechar o form apos atualizar
      SetIsLoading(false)
    } catch (err) {
      console.log(err)
      SetIsLoading(false)
    }

  }
  const handleShowUpadateClientForm = (client) => { //seta o valor dos campos para update
    SetId(client._id)
    SetName(client.name)
    SetEmail(client.email)
    SetIsFormOpen(true)
  }
  const toggleFormState = () => {//trocar o form de acordo com o clique no +
    SetIsFormOpen(!isFormOpen)//se o form for true 

  }
  useEffect(() => { //function pega os dados de todos os clientes
    api.get('/clients').then(({ data }) => {
      //console.log(data) denntro de data está todos os meus clientes
      setClients(data.data)
    })

  }, []);
  return (
    <Box margin="4">
      <Flex color="white" justifyContent="space-between">
        <Text color="black" fontSize="2xl">Lista de Clientes</Text>
        <Button colorScheme="blue" onClick={toggleFormState}>{isFormOpen ? '-' : '+'}</Button>
      </Flex>

      {isFormOpen && //se o form for true ele abre 
        <VStack marginY="1rem" as="form" onSubmit={id ? handleSubmitUpdateClient : handleSubmitCreateClient}>
          {/*se tiver um id que dizer q esta atualizando um cliente senão tiver estará criando um novo */}
          <InputForm
            label="Nome"
            name="name"
            value={name}/* useState */
            onChange={e => handleChangeName(e.target.value)}
            error={errors.name}
          />

          <InputForm
            label="Email"
            name="email"
            type="email"
            value={email}/* useState */
            onChange={e => handleChangeEmail(e.target.value)}
            error={errors.email}
          />

          <Button fontSize="sm" alignSelf="flex-end" colorScheme="blue" isLoading={isLoading}/* alinhar a direita */ type="submit">{id ? 'Atualizar' : 'Cadastro'}</Button>

        </VStack>
      }

      <Table variant="simple" marginY="10">
        <Thead bgColor="blue.500">
          <Tr>
            <Th textColor="white">Name</Th>
            <Th textColor="white">Email</Th>
            <Th textColor="white">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clients.map(client => (
            <Tr key={client.email}>
              <Td>{client.name}</Td>
              <Td>{client.email}</Td>
              <Td>
                <Flex justifyContent="space-between">
                  <Button size="sm" fontSize="smaller" colorScheme="yellow" mr="2" onClick={() => handleShowUpadateClientForm(client)}>Editar</Button>
                  <Button size="sm" fontSize="smaller" colorScheme="red" onClick={() => handleDeleteClient(client._id)}>Remover</Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>


  )
}
