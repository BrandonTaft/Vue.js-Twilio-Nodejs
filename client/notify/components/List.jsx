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
        <View style={styles.listContainer}>
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
                                <MyText>{reminder.notification}</MyText>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
            <Create
                onSucess={onSucess}
                editable={reminder}
                setEditable={setReminder}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />
            </View>
            <View style={styles.bottomContainer}>
                <RoundButton onPress={() => setModalVisible(true)}>
                    <MyHeader style={{ fontWeight: 'bold' }}>+</MyHeader>
                </RoundButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 4,
        backgroundColor: '#121212',
        marginTop: 16,
        marginBottom: 16,
        borderRadius: 20,
        padding: 14,
        width: '100%'
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 20,
        backgroundColor: '#121212',
        width: '100%',
      }
});
