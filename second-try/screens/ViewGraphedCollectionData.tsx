import React, {useState, useEffect, useContext} from 'react'
import {View, SafeAreaView, Text, Dimensions, ScrollView} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { AppDataContext } from '../DataMgmt/AppDataContext';
import { flingGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler';
import DynamicGraph from '../components/DynamicGraph';
import ChartTitle from '../components/ChartTitle';
import FieldStats from '../components/FieldStats';

//this page only really works if there's numeric data, otherwise a contribution graph is the only thing that works.

export default ({navigation}) => {

    const context = useContext(AppDataContext)

    const [chartType, setChartType] = useState('contribution')
    const [dependentVar, setDependentVar] = useState(-1) //have this be set automatically somehow
    const [independentVar, setIndependentVar] = useState(-1)

    
    
    const [schema, setSchema] = useState()
    const [entries, setEntries] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    //TODO update entries when one is added

    useEffect(() => {
        setTimeout(() => {
            setSchema([...context?.currentCollection.entrySchema])
            setEntries([...context?.currentCollection.entries]) //wait for context to update and set the data. This is a hack, and will (hopefully) be fixed later
            // if (context?.currentCollection.entrySchema.length >= 2) {
            //   setDependentVar(context?.currentCollection.entrySchema[0].name)
            //   setIndependentVar(context?.currentCollection.entrySchema[1].name)
            // } else {
            //   setIndependentVar(context?.currentCollection.entrySchema[0].name)
            // }
            setIsLoading(false)
        }, 300)
      
  }, [isLoading])

    if (isLoading) {
        return (
            <Text>Loading...</Text>
        )
    }

    



    console.log(schema)
    //todo: there isn't an attribute with type number, have line chart say "there must be a number"
    return (
        <View>
            <ScrollView>
                <ChartTitle 
                    fields={schema} 
                    chartType={chartType} 
                    setChartType={setChartType} 
                    dependentVar={dependentVar} 
                    setDependentVar={setDependentVar}
                    independentVar={independentVar}
                    setIndependentVar={setIndependentVar}
                />
                <DynamicGraph chartType={chartType} entries={entries} dependentVar={dependentVar} independentVar={independentVar == 'Time and Date Submitted' ? 'datetime_of_initial_submit' : independentVar} />

                {/* ONLY RENDER STATS IF THERE IS A ATTRIBUTE THAT'S A NUMBER */}
                <FieldStats fields={schema} entries={entries}/>
            </ScrollView>
        </View>
    )
}