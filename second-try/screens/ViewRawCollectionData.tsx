import React, {useState, useEffect, useContext} from 'react'
import {View, SafeAreaView, Text, Button, ScrollView} from 'react-native'
import EntryListItem from '../components/EntryListItem'
import List from '../components/List'
import { AppDataContext } from '../DataMgmt/AppDataContext'

//this might need new list components
export default ({navigation}) => {
    const context = useContext(AppDataContext)
    
    const [entries, setEntries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [navigatedAwayFlag, setNavigatedAwayFlag] = useState(false)

    //TODO update entries when one is added

    useEffect(() => {
        if(context?.currentCollection != undefined) {
            setIsLoading(false)
            setTimeout(() => {
                setEntries(context.currentCollection.entries)
            }, 100)
        }
    }, [context?.currentCollection, isLoading])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (context?.currentCollection != undefined) {
                setTimeout(() => {
                    setEntries(context.currentCollection.entries)
                }, 500)
            }
        });
        return unsubscribe;
      }, [navigation]);

    if (isLoading) {
        return (
            <Text>Loading...</Text>
        )
    }


    const clickHandler = (destination: string, params?: object): void => {
        navigation.navigate(destination, params ? params : null)
    }

    const createNewEntryHandler = (): void => {
        setNavigatedAwayFlag(true)
        navigation.navigate("AddEntry")
    }  

    return (
        <SafeAreaView>
            <ScrollView>
                {entries.map((entry, index) => {
                    let now = new Date(entry.datetime_of_initial_submit)
                    let entryDate = now.toLocaleDateString()
                    let entryTime = now.toTimeString()
                    return (
                        <EntryListItem 
                        key={index}
                        item={`${entryDate}, at ${entryTime}`} 
                        index={index} 
                        deleteHandler={(index) => {
                            context?.deleteEntry(entry.datetime_of_initial_submit)
                            setTimeout(() => {
                                //console.log('updating state!')
                                setEntries([...context?.currentCollection.entries]) //wait for context to update and set the data. This is a hack, and will (hopefully) be fixed later
                            }, 100) //not triggering update... for some reason
                        }}
                        clickHandler={clickHandler}
                        />
                    )
                })}
                <Button title="add entry" onPress={() => createNewEntryHandler()} />
                <Button title="View Graphed Data" onPress={() => {
                    navigation.navigate("ViewGraphedCollectionData")
                }} />
            </ScrollView>
        </SafeAreaView>
    )
}