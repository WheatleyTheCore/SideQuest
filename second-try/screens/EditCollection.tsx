import React, {useState, useContext, useEffect} from 'react'
import {View, SafeAreaView, Text, TextInput, Button, ScrollView} from 'react-native'
import EditCollectionForm from '../components/EditCollectionForm'
import { AppDataContext } from '../DataMgmt/AppDataContext'
import uuid from 'react-native-uuid'

export default ({route, navigation}) => {
    const context = useContext(AppDataContext)

    //TODO pass collection name as route param
    let {collectionName} = route.params

    const [schema, setSchema] = useState([])
    const [title, setTitle] = useState('')

    const [isLoading, setIsLoading] = useState(true)
      
    useEffect(() => {
        setTimeout(() => {
            setTitle(context.currentCollection.name)
            setSchema(context?.currentCollection.entrySchema) //wait for context to update and set the data. This is a hack, and will (hopefully) be fixed later
            setIsLoading(false)
        }, 1000)
    }, [context?.currentCollection, isLoading])

    if (isLoading) return <Text>Loading....</Text>

    console.log(context?.currentCollection)

    return (
        <View>
            <ScrollView>
                <TextInput
                    style={{borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 4}}
                    onChangeText={setTitle}
                    value={title}
                    placeholder="collection title"
                />
                {/**TODO make edit collection form that takes schema object instead of the object with "Fields " property */}
                <EditCollectionForm entrySchema={schema} 
                    handleTypeChange={(type, index) => {
                        let previousSchema = [...schema]
                        previousSchema[index].type = type
                        console.log(previousSchema)
                        setSchema(previousSchema)
                    }}
                    handleNameChange={(updatedText: string, index: number) => {
                        let previousSchema = [...schema]
                        previousSchema[index].name = updatedText
                        setSchema(previousSchema)
                    }}
                    handleSubmitForm={(data) => {
                        console.log('----------data from the collection screen--------')
                        const newCollection = context?.collectionFactory(title, schema)
                        context?.updateCollection(newCollection, title)
                        navigation.navigate("Home")
                    }}
                    handleDeleteField={(index: number) => {
                        console.log('==================deleting field================')
                        let schemaCopy = [...schema]

                        schemaCopy.splice(index, 1)
                        setSchema(schemaCopy)
                    }} />
                <Button title="add field" onPress={() => {
                    let previousSchema = [...schema]
                    previousSchema.push({
                        id: uuid.v4(),
                        name: '',
                        type:'text',
                        required:{
                            value:true,
                            message:'Employee Last Name is required'
                        },
                    })
                    setSchema(previousSchema)
                }} />
            </ScrollView>
        </View>
    )
}