import React, {useState, useContext, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {View, SafeAreaView, Text, ScrollView} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import AddEntryForm from '../components/AddEntryForm'

import { AppDataContext } from '../DataMgmt/AppDataContext'


export default ({navigation}) => {

    const context = useContext(AppDataContext)

    //TODO replace all of the useForm stuff

    
    const [isLoading, setIsLoading] = useState(true)
    const [schema, setSchema] = useState({})


    const { control, handleSubmit, formState: { errors } } = useForm({});
      const onSubmit = (data: any) => {
        console.log(data)
        data['datetime_of_initial_submit'] = new Date()
        context?.addEntry(data)
        context?.loadCurrentCollectionData(context.currentCollection.name)
        navigation.navigate("ViewRawCollectionData")
      }
      
    useEffect(() => {
        if(context?.currentCollection != undefined) {
            setIsLoading(false)
            setSchema(context?.currentCollection.entrySchema)
            setTimeout(() => {
                setSchema(context?.currentCollection.entrySchema) //wait for context to update and set the data. This is a hack, and will (hopefully) be fixed later
            }, 10)
        }

        
    
        

        
    }, [context?.currentCollection, isLoading])

    if (isLoading) return <Text>Loading....</Text>


    //console.log(context?.currentCollection)

    

    return (
        <View>
            <ScrollView>
                <AddEntryForm entrySchema={schema} handleSubmitForm={onSubmit}/>
            </ScrollView>
        </View>
    )
}