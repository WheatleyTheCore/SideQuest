import React from 'react'
import { Button, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import {Picker} from '@react-native-picker/picker';
import { Alert } from 'react-native';


export default ({entrySchema, handleSubmitForm}) => {

    const validateInput = (data) => {
      console.log(data)
      for (const attribute in data) {
        if (attribute == "datetime_of_initial_submit") continue
        const attributeSchema = entrySchema.find(schema => schema.name == attribute)
        if (attributeSchema.type == 'number') {
          if (isNaN(data[attribute])) {
            Alert.alert('invalid input', `${attribute} must be a number`)
            return false
          }
        }
      }
      return true
    }


    const { control, handleSubmit, formState: { errors } } = useForm({});
      const onSubmit = data => {

        if (validateInput(data)) handleSubmitForm(data)

        //console.log(data)

      }
    
      return (
        <View>
          {
            entrySchema.map((item, index) => {
              return (
              <Controller
                key={item.id}
                control={control}
                rules={{
                 required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                    <Text>{item.name}</Text>
                  {(item.type == 'number' || item.type == 'text') ? <TextInput
                    style={{borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 4}}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType={item.type == 'number' ? 'decimal-pad' : 'default'}
                  /> : 
                  <Text>{`${item.type} data will be recorded on submit`}</Text>
                  }
                  </View>
                )}
                name={item.name}
              />
            )
          })  
          
        }
          <Button title="Submit" onPress={() => {
            // TODO: stop using the form handler so we can create the object we pass to handlesubmit oursevles,
            //meaning we can add sensor data on the fly.
            console.log(entrySchema)
            // if () {
            //   let dataobject = {
            //     'datetime_of_initial_submit': ''
            //   }

            //   console.log(entrySchema)

            //   handleSubmit(dataobject)
            // } else {
            //   handleSubmit(onSubmit)
            // }
            
          }} />
        </View>
      );
}