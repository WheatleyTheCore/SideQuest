import React, { useEffect, useState } from 'react'
import { View, Dimensions, Text } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FieldSelector from './FieldSelector';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {min, max, sum, mean, median, mode, variance, standardDeviation} from 'simple-statistics'

interface props {
    fields: object[];
    entries: any;
  }

export default ({fields, entries}: props) =>  {
    const { showActionSheetWithOptions } = useActionSheet();
    const [metric, setMetric] = useState();
    const [field, setField] = useState();
    const [numberList, setNumberList] = useState([])

    useEffect(() => {
        let list = []
        entries.map((entry: any) => {
            list.push(parseInt(entry[field]))
        })
        setNumberList(list)
    }, [metric, field])

    const openActionSheet = (options: string[], handleSelect: (value: string) => void) => {
        const destructiveButtonIndex = -1;
        const cancelButtonIndex = options.length;
        showActionSheetWithOptions(
            {
              options,
              destructiveButtonIndex,
              cancelButtonIndex,
            },
            (buttonIndex) => {
                handleSelect(options[buttonIndex])
            }
          );
    }
    const renderStatistic = (metric: string) => {
        switch (metric) {
            case 'Min':
                return min(numberList)
                break;
            case 'Max':
                return max(numberList)
                break;
            case 'Sum':
                return sum(numberList)
                break;
            case 'Mean':
                return mean(numberList)
                break;
            case 'Median':
                return median(numberList)
                break;
            case 'Mode':
                return mode(numberList)
                break;
            case 'Variance':
                return variance(numberList)
                break;
            case 'Standard Deviation':
                return standardDeviation(numberList)
                break;
        }

        return 'please select one'
    }
    return (
        <View>
            <TouchableOpacity onPress={() => openActionSheet(['Min', 'Max', 'Sum', 'Mean', 'Median', 'Mode', 'Variance', 'Standard Deviation'], (value: string) => setMetric(value))} style={{backgroundColor: 'grey'}}>
                {metric == -1 ? <Text>Please Select</Text> : <Text>{metric}</Text>}
            </TouchableOpacity>
            <Text> of </Text>
            <FieldSelector fieldsObject={fields} types={["number"]} selectedField={field} setSelectedField={setField} />
            <Text>
                : {
                    renderStatistic(metric)
                }
            </Text>
        </View>
    )
}