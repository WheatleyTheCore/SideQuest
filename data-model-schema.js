//----------------------old-------------------
collection: {
    key: "" //uuid
    name: "" //collection name
    entrySchema: {
        //dehydrated version of an entry.
    }
    notes: // short description of  model any other notes that the user might need
    entries: [
     //array of entries 
     //each entry must contain an ID
    ]
}

//----------------------new-----------------------

/**
 *  |id (int autoincrement)|name (text)|entry_schema (text or blob)|entries (text or blob)|
 *  | 1                    | example   | {name: string, num: int}  |[entry 1, entry 2]    |          
 */