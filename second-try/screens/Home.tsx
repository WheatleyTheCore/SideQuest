import React, {useState, useEffect, useContext} from 'react'
import {View, SafeAreaView, Text, Button, ScrollView} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import {loadAllCollectionNames} from '../DataMgmt/storageUtils'
import List from '../components/List'
import { AppDataContext } from '../DataMgmt/AppDataContext'

export default ({navigation}:any) => {

    const context = useContext(AppDataContext)
    const [didLoadCollectionNames, setDidLoadCollectionNames] = useState(false)


    const clickHandler = (destination: string, params?: object): void => {
        navigation.navigate(destination, params ? params : null)
    }

    const editHandler = (destination: string, params?: object): void => {
        navigation.navigate(destination, params ? params : null)
    }

    const createNewCollectionHandler = (): void => {
        navigation.navigate("AddCollection")
    }

    const newItemHandler = (): void => {
        navigation.navigate("AddEntry")
    }
    

    useEffect(() => {
        if (!didLoadCollectionNames) {
            context.getAllCollectionNames()
            setDidLoadCollectionNames(true)
        }
    }, [didLoadCollectionNames])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (context?.currentCollection != undefined) {
                setTimeout(() => {
                    context.getAllCollectionNames()
                }, 100)
            }
        });
        return unsubscribe;
      }, [navigation]);
    

    //TODO the keys for stuff are now GUIDs, we'll need to load all the collections into memory to get their names. 
    return (
        <SafeAreaView>
            <ScrollView>
                <List listData={context?.collectionNames} clickHandler={clickHandler} deleteHandler={context?.deleteCollection} editHandler={editHandler} />
                <Button title="create new collection" onPress={() => createNewCollectionHandler()} />
            </ScrollView>
        </SafeAreaView>
    )
}