import { createContext, ReactElement, useState } from "react";
import * as utils from './DatabaseUtils'

// import dehydrated schemas
let questSchema = require('./QuestSchema.json')
let taskSchema = require('./TaskSchema.json')

export const AppDataContext = createContext<AppContextInterface | null>(null)

export const AppDataContextProvider = (props) => {
    const [questTitles, setQuestTitles] = useState([])
    const [currentQuestData, setCurrentQuestData] = useState()
    const [allQuestData, setAllQuestData] = useState([]);

    const database = getDBConnection();

    utils.createTableIfNotExists(database)

    const generateEmptyQuest = () => {
        return Object.create(questSchema)
    }

    const generateEmptyTask = () => {
        return Object.create(taskSchema)
    }

    const getAllQuestTitles = () => {
        let collectionNames = [];
        database.transaction(tx => {
            tx.executeSql("select * from quests", [], (_, data) => {
                data.rows._array.forEach(item => {
                    let parsedQuestData = JSON.parse(item['quest_data'])
                    collectionNames.push(parsedQuestData.questName)
                })
                setCollectionNames(collectionNames)
            }, (_, err)=>{
                console.log(err)
            })
        })
    }

    const loadQuestData = () => {
        let allQuestData = []
        database.transaction(tx => {
            tx.executeSql("select * from quests", [], (_, data) => {
                data.rows._array.forEach(item => {
                    let parsedQuestData = JSON.parse(item['quest_data'])
                    parsedQuestData['index'] = parseInt(item['id'])      // because id is not stored in quest_data
                    collectionNames.push(parsedQuestData.questName)
                })

            }, (_, err)=>{
                console.log(err)
            })
        })
    }

    const createQuest = (questToSave, id = null) => {
        let name = collectionToSave.name;
        let entrySchema = JSON.stringify(collectionToSave.entrySchema);
        let entries = JSON.stringify([]);

        database.transaction(tx => {
            tx.executeSql("insert into collections (name, entry_schema, entries) values (?, ?, ?)", [name, entrySchema, entries], () => {
                //direct user to the collection page
                getAllCollectionNames() //update collection list
            }, (_, err)=>{
                console.log(err)
            })
        })
    }

    // TODO left off here.,

    //updates name and entrySchema
    const updateCollection = (collectionToSave: Collection, name: string) => {
        let updatedName = collectionToSave.name;
        let updatedEntrySchema = JSON.stringify(collectionToSave.entrySchema);
        let updatedEntries = JSON.stringify(collectionToSave.entries);

        database.transaction(tx => {
            tx.executeSql("update collections set name = ?, entry_schema = ?, entries = ?  where name = ?", [updatedName, updatedEntrySchema, updatedEntries, name], () => {
                //direct user to the collection page
                getAllCollectionNames() //update collection list
            }, (_, err)=>{
                console.log(err)
            })
        })
    }

    const deleteCollection = (name: string) => {
        database.transaction(tx => {
            tx.executeSql("delete from collections where name = ?", [name], () => {
                //direct user to the collection page
                getAllCollectionNames() //update collection list
            }, (_, err)=>{
                console.log(err)
            })
        })
    }

    const addEntry = (entry: Entry) => {
        database.transaction(tx => {
            tx.executeSql("select entries from collections where name = ?", [currentCollection.name], (t, data) => {
                let entryObject = data.rows._array[0]
                let entryArray = JSON.parse(entryObject.entries)
                entryArray.push(entry)
                tx.executeSql('update collections set entries = ? where name = ?', [JSON.stringify(entryArray), currentCollection.name])
            }, (_, err)=>{
                console.log(err)
            })
        })
        loadCurrentCollectionData(currentCollection?.name)

    }

    const updateEntry = (entry: Entry, index: number) => {
        database.transaction(tx => {
            tx.executeSql("select entries from collections where name = ?", [currentCollection.name], (t, data) => {
                let entryObject = data.rows._array[0]
                let entryArray = JSON.parse(entryObject.entries)
                if (index < entryArray.length) {
                    entryArray[index] = entry
                }
                tx.executeSql('update collections set entries = ? where name = ?', [JSON.stringify(entryArray), currentCollection.name])
            }, (_, err)=>{
                console.log(err)
            })
        })
        loadCurrentCollectionData(currentCollection?.name)
    }

    

    const deleteEntry = (dateTime: string) => {
        database.transaction(tx => {
            tx.executeSql("select entries from collections where name = ?", [currentCollection.name], (t, data) => {
                let entryObject = data.rows._array[0]
                let entryArray = JSON.parse(entryObject.entries)
                let EntryToDelete = entryArray.find(entry => entry.datetime_of_initial_submit == dateTime)
                console.log(EntryToDelete)
                let indexOfEntryToDelete = entryArray.indexOf(EntryToDelete)
                entryArray.splice(indexOfEntryToDelete, 1)
                tx.executeSql('update collections set entries = ? where name = ?', [JSON.stringify(entryArray), currentCollection.name])
            }, (_, err)=>{
                console.log(err)
            })
            loadCurrentCollectionData(currentCollection?.name)
        })
    }

    const collectionFactory = (name: string, entrySchema: Object) => {
        let newCollection: Collection = new Object(defaultCollection)
        newCollection.name = name
        newCollection.entrySchema=entrySchema
        return newCollection
    }
    

    return (
        <AppDataContext.Provider value={{
            collectionNames,
            getAllCollectionNames,
            collectionFactory,
            currentCollection,
            loadCurrentCollectionData,
            createCollection,
            updateCollection,
            deleteCollection,
            addEntry,
            updateEntry,
            deleteEntry
        }}>
            {props.children}
            {/* <Button onPress={() => {
                let collection = {
                    name: 'test collection',
                    entrySchema: {
                        time: 'number',
                        place: 'text'
                    },
                    entries: []
                }
                createCollection(collection);
            }} title="add some data" />
            <Button onPress={() => {
                loadCurrentCollectionData("test")
            }} title="load test collection" />
            <Button onPress={() => {
                let collection = {
                    name: 'updated!',
                    entrySchema: {
                        time: 'AAAAA',
                        place: 'EEEEEEE'
                    },
                    entries: []
                }
                updateCollection(collection, 'test collection');
            }} title="update some data" />
            <Button onPress={() => {
                database.transaction(tx => {
                    tx.executeSql('select * from collections', [], (_, data) => {console.log(data)})
                })
            }} title="LOG ALL THE DATA" /> */}
        </AppDataContext.Provider>
    )
}