import { FormControl, FormLabel,Input, FormErrorMessage} from '@chakra-ui/react'
export const InputForm = ({label, name, error = null, ...rest}) =>{
    /* qualquer parametro depois adiciondo que n seja nem label nem name
    sera adc em rest */
    return (
      <FormControl marginY="1rem" isInvalid={!!error}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input name={name} id={name} {...rest} />
  
          {!!error && <FormErrorMessage>{error}</FormErrorMessage>}{/* se tiver erro */}
          
      </FormControl>
      )
  }

