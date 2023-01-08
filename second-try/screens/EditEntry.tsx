import React, {useState, useEffect, useContext} from 'react'
import {View, SafeAreaView, Text, TouchableOpacity, ScrollView} from 'react-native'
import AddEntryForm from '../components/AddEntryForm'
import EditEntryForm from '../components/EditEntryForm'
import { AppDataContext } from '../DataMgmt/AppDataContext'

export default ({route, navigation}) => {
    const context = useContext(AppDataContext)

    let {entryIndex} = route.params

    
    const [isLoading, setIsLoading] = useState(true)
    const [schema, setSchema] = useState({})
    const [entry, setEntry] = useState({})
      
    useEffect(() => {
        if(context?.currentCollection != undefined) {
            setIsLoading(false)
            setSchema(context?.currentCollection.entrySchema)
            setTimeout(() => {
                setSchema(context?.currentCollection.entrySchema) //wait for context to update and set the data. This is a hack, and will (hopefully) be fixed later
                setEntry(context?.currentCollection.entries[entryIndex])
            }, 100)
        }
    }, [context?.currentCollection, isLoading])

    if (isLoading) return <Text>Loading....</Text>

    
    console.log(entry)

    
    //TODO REPLACE ADD ENTRY FORM WITH EDIT ENTRY FORM HERE
    return (
        <View>
            <ScrollView>
                <EditEntryForm 
                entrySchema={schema} 
                entry={entry}
                handleInputChange={(updatedText: string, attribute: any) => {
                    let updatedEntry = {...entry}
                    updatedEntry[attribute] = updatedText
                    setEntry(updatedEntry)
                }}
                handleSubmitForm={() => {
                    console.log('=================updating entry=============')
                    context?.updateEntry(entry, entryIndex)
                    context?.loadCurrentCollectionData(context.currentCollection.name)
                    navigation.navigate("ViewRawCollectionData")
                }} />
                <Text>{JSON.stringify(context?.currentCollection.entries[entryIndex])}</Text>
            </ScrollView>
        </View>
    )
}