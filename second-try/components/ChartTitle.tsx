import React, { useState } from 'react'
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FieldSelector from './FieldSelector';

interface props {
    fields: object[];
    chartType: string;
    setChartType: (type: string) => void;
    dependentVar? : string;
    setDependentVar?: (value: string) => void;
    independentVar? : string;
    setIndependentVar?: (value: string) => void;
  }

  /**-----------------------------------------------------------
   * REPLACE PICKERS WITH ACTION SHEETS, IT'S BETTER FOR IOS
   ------------------------------------------------------------*/

export default ({fields, chartType, setChartType, dependentVar, setDependentVar, independentVar, setIndependentVar}: props) =>  {

    const { showActionSheetWithOptions } = useActionSheet();

    const openActionSheet = () => {
        let options = ['bar', 'pie', 'contribution']
        if (fields.length > 1) options.push('line')
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
                setChartType(options[buttonIndex])
              // Do something here depending on the button index selected
            }
          );
    }
    console.log('FIELDS')
    console.log(fields)
    return (
        <View>
            <TouchableOpacity onPress={() => openActionSheet()} style={{backgroundColor: 'grey'}}>
                      <Text>{chartType}</Text>
                  </TouchableOpacity>
                {
                    chartType == 'line' ? 
                    <View>
                        <Text> of </Text>
                        <FieldSelector fieldsObject={fields} types={["number"]} selectedField={dependentVar} setSelectedField={setDependentVar} />
                        <Text> over </Text>
                        <FieldSelector fieldsObject={[...fields, {
                            name: 'Time and Date Submitted',
                            type: "datetime_of_initial_submit"
                        }]} types={["number", "text", "barometer", "accelerometer", "magnetometer", "gyroscope", "pedometer", "datetime_of_initial_submit"]} selectedField={independentVar} setSelectedField={setIndependentVar}/>
                    </View> :
                    chartType == 'bar' ? 
                    <View>
                        <Text> of the distribution of recorded </Text>
                        <FieldSelector fieldsObject={fields} types={["number", "text", "barometer", "accelerometer", "magnetometer", "gyroscope", "pedometer"]} selectedField={independentVar} setSelectedField={setIndependentVar} />
                    </View> :
                    chartType == 'pie' ? 
                    <View>
                        <Text> of the distribution of recorded </Text>
                        <FieldSelector fieldsObject={fields} types={["number", "text", "barometer", "accelerometer", "magnetometer", "gyroscope", "pedometer"]} selectedField={independentVar} setSelectedField={setIndependentVar} />
                    </View> :
                    <View>
                        <Text>of data recordings over time.</Text>
                    </View>
                }
        </View>
    )
}