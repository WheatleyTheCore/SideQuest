import React, { useState } from "react"
import {Text, FlatList} from 'react-native'
import ListItem from './ListItem'

interface PropInterface {
    listData: string[] | undefined;
    clickHandler: (collectionName: string) => void;
    deleteHandler: (collectionName: string) => void;
    editHandler: (collectionName: string) => void;
    [propName: string]: any;
}

export default (props: PropInterface) =>  {
    return (
        <FlatList data={props.listData} keyExtractor={item => item} renderItem={({index, item}) => {
            return (
            <ListItem index={index} key={index}
                item={item} 
                clickHandler={props.clickHandler} 
                deleteHandler={props.deleteHandler} 
                editHandler={props.editHandler}
                />
            )
        }} />
    )
}