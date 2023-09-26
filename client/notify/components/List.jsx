import { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import Create from './Create';
import { MyText, MyHeader } from './GlobalText';
import { RoundButton } from '../components/Buttons';

export default function List({ reminders, onSucess }) {
 const [reminder, setReminder] = useState({});
 const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
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
                                    setReminder(reminder)
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <MyText>{reminder.name}</MyText>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
            <Create onSucess={onSucess} editable={reminder} setEditable={setReminder} setModalVisible={setModalVisible} modalVisible={modalVisible} />
            <RoundButton onPress={onSucess}>
          <MyHeader>R</MyHeader>
        </RoundButton>

        <RoundButton onPress={() => setModalVisible(true)}>
          <MyHeader style={{ fontWeight: 'bold' }}>+</MyHeader>
        </RoundButton>
            </>  
    );
}

const styles = StyleSheet.create({
    listContainer: {
       
    }
});
