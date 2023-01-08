import React, { useState } from 'react'
import { Dimensions, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface props {
    fieldsObject: object[];
    types: string[];
    selectedField: any;
    setSelectedField : (type: string) => void;
  }

  //TODO store selectedField outside and pass in "onchange" prop

export default ({fieldsObject, types, selectedField, setSelectedField}: props) =>  {
    const { showActionSheetWithOptions } = useActionSheet();

    const openActionSheet = () => {
        let options = []
        fieldsObject.filter((field: any) => types.indexOf(field.type) >= 0 || types.indexOf('any') >= 0).map(i => options.push(i.name))
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = options.length;
        showActionSheetWithOptions(
            {
              options,
              destructiveButtonIndex,
              cancelButtonIndex,
            },
            (buttonIndex) => {
              //TODO don't change thing if user cancels
                setSelectedField(options[buttonIndex])
              // Do something here depending on the button index selected
            }
          );
    }

    return (
        <TouchableOpacity onPress={() => openActionSheet()} style={{backgroundColor: 'grey'}}>
            {selectedField == -1 ? <Text>Please Select</Text> : <Text>{selectedField}</Text>}
        </TouchableOpacity>
        // <Picker
        //     selectedValue={selectedField}
        //     onValueChange={(value: any) => {
        //         setSelectedField(value)
        //     }}>
        //         {selectedField == -1 && <Picker.Item label="Please Select" value={-1} />}
        //        {fieldsObject.filter((field: any) => types.indexOf(field.type) >= 0).map((field: any) => {
        //            return (
        //                <Picker.Item label={field.name} value={field.name} />
        //            )
        //        })} 
        //     </Picker>
    )
}