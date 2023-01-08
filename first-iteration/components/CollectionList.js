import React, { useState, useEffect } from "react";
import { SafeAreaView, Pressable, Text, StyleSheet } from "react-native";
import { CollectionListItem } from "./CollectionListItem";
import { FlatList, RectButton } from "react-native-gesture-handler";
//TODO use gesture handler like in that youtube video (rewatch and do same thing)

export default ({ collections }) => {
  return (
    <SafeAreaView>
      <FlatList
        data={collections}
        renderItem={(collection) => {
          <RectButton>
            <CollectionListItem collection={collection} />
          </RectButton>;
        }}
        itemSeparatorComponent={() => {
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: "green",
            }}
          />;
        }}
      />
    </SafeAreaView>
  );
};
