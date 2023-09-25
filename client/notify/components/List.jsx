import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { MyText } from './GlobalText';

export default function List({ reminders, modalVisible, setModalVisible, setEditable }) {
    //const [modalVisible, setModalVisible] = useState(false);
   
    return (
            <ScrollView>
                <View style={styles.listContainer}>
                    {reminders.map((reminder) => {
                        return (
                            <Pressable
                                key={reminder._id}
                                android_ripple={
                                    RippleConfig = {
                                        color: '#fff',
                                        foreground: false
                                    }
                                }
                                onPress={() => {
                                    setEditable(reminder)
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <MyText>{reminder.name}</MyText>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>  
    );
}

const styles = StyleSheet.create({
    listContainer: {
       
    }
});
