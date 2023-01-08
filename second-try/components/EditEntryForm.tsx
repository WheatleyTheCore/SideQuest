import React from 'react'
import { Button, Text, TextInput, View, Alert} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import {Picker} from '@react-native-picker/picker';


export default ({entrySchema, entry, handleInputChange, handleSubmitForm}) => {

      const validateInput = () => {
        for (const attribute in entry) {
          if (attribute == "datetime_of_initial_submit") continue
          const attributeSchema = entrySchema.find(schema => schema.name == attribute)
          if (attributeSchema.type == 'number') {
            if (isNaN(entry[attribute])) {
              Alert.alert('invalid input', `${attribute} must be a number`)
              return false
            }
          }
        }
        return true
      }
    
      return (
        <View>
          {
            entrySchema.map((item, index) => {
              return (
                    <View>
                    <Text>{item.name}</Text>
                  {(item.type == 'number' || item.type == 'text') ? <TextInput
                    style={{borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 4}}
                    onChangeText={(text: string) => handleInputChange(text, item.name)}
                    value={entry[item.name]}
                    placeholder="data value"
                    keyboardType={item.type == 'number' ? 'decimal-pad' : 'default'}
                  /> : 
                  <Text>{`${item.type} data will be recorded on submit`}</Text>
                  }
                  </View>
                )}
            )}
            <Button title="Submit" onPress={() => {
              if (validateInput()) handleSubmitForm()
            }} />
        </View>
      );
}