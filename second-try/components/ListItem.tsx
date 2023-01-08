
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/EvilIcons";
import { AppDataContext } from "../DataMgmt/AppDataContext";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface ListItemProps {
  index: number;
  item: string;
  clickHandler: (address: string, dataObject?: object) => void;
  deleteHandler: (item: string) => void;
  editHandler: (item: string, dataObject?: object) => void;
}

export default (props:ListItemProps) => {

  const context = useContext(AppDataContext)

  const rightSwipe = (progress:any, dragX:any) => {
    return (
      <>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            console.log("Delete function ran!");
            props.deleteHandler(props.item)
          }}
        >
          <Icon name="trash" color="white" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => {
            console.log("Edit function ran!");
            context?.loadCurrentCollectionData(props.item)
            props.editHandler("EditCollection", { collectionName: props.item });
          }}
        >
          <Icon name="gear" color="white" size={30} />
        </TouchableOpacity>
      </>
    );
  };
  

  return (
    <Swipeable renderRightActions={rightSwipe} key={props.index.toString()}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          context?.loadCurrentCollectionData(props.item)
          props.clickHandler("ViewRawCollectionData", { collectionName: props.item });
          
        }}
      >
        <Text>{props.item}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  delete: {
    backgroundColor: "red",
    maxWidth: 60,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  edit: {
    backgroundColor: "yellow",
    maxWidth: 60,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});