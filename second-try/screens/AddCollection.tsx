import React, {useState, useContext} from 'react'
import {View, SafeAreaView, Text, TextInput, Button, Alert, ScrollView} from 'react-native'
import CreateCollectionForm from '../components/CreateCollectionForm'
import { AppDataContext } from '../DataMgmt/AppDataContext'
import uuid from 'react-native-uuid'
export default ({navigation}) => {
    const context = useContext(AppDataContext)


    const jsonSchema = {
        title: 'Test Form',
        Fields: [
            {
                id: uuid.v4(),
                name: '',
                type:'text',
                required:{
                    value:true,
                    message:'Employee First Name is required'
                },
                // validation:function(val){
                //     return val.length >=5 || 'Min Length is 5';
                // }
            },
        ]
    };

    const [schema, setSchema] = useState(jsonSchema)
    const [title, setTitle] = useState('')

    // const updateSchemaValue = (schema: object, property: string, value: any) => {
    //     let schemaCopy = {...schema}
    //     schemaCopy.Fields[schemaCopy.Fields.indexOf(schemaCopy.Fields.find(element => element.id == property))].name = data[property]

    // }

    return (
        <View>
            <ScrollView>
                <TextInput
                    style={{borderBottomColor: '#000', borderBottomWidth: 2, marginBottom: 4}}
                    onChangeText={setTitle}
                    value={title}
                    placeholder="collection title"
                />
                <CreateCollectionForm entrySchema={schema} 
                    handleTypeChange={(type, index) => {
                        let previousSchema = {...schema}
                        previousSchema.Fields[index].type = type
                        console.log(previousSchema)
                        setSchema(previousSchema)
                    }}
                    handleNameChange={(updatedText: string, index: number) => {
                        let previousSchema = {...schema}
                        previousSchema.Fields[index].name = updatedText
                        setSchema(previousSchema)
                    }}
                    handleSubmitForm={() => {
                        if (schema.Fields.length == 0) {
                            Alert.alert('Invalid Collection', 'You must have at least one field.')
                            return
                        }
                        const newCollection = context?.collectionFactory(title, schema.Fields)
                        context?.createCollection(newCollection)
                        navigation.navigate("Home")
                    }}
                    handleAddField={() => {
                        let previousSchema = {...schema}
                        previousSchema.Fields.push({
                            id: uuid.v4(),
                            name: '',
                            type:'text',
                            required:{
                                value:true,
                                message:'Employee Last Name is required'
                            },
                        })
                        setSchema(previousSchema)
                    }}
                    handleDeleteField={(index: number) => {
                        console.log('==================deleting field================')
                        let schemaCopy = {...schema}

                        schemaCopy.Fields.splice(index, 1)
                        setSchema(schemaCopy)
                    }} />
            </ScrollView>
        </View>
    )
}