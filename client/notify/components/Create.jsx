import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Modal, Alert } from 'react-native';
import { RoundButton, SquareButton } from './Buttons';
import { MyText, MyHeader } from './GlobalText';
import config from '../config';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


//DateTimePickerAndroid.dismiss(mode: AndroidNativeProps['mode'])

export default function Create({
  onSucess,
  modalVisible,
  setModalVisible,
  editable,
  setEditable
}) {
  const [name, onChangeName] = useState("");
  const [notification, onChangeNotification] = useState("09-10-2020");
  const [action, setAction] = useState('POST');


  const [selectedDate, setSelectedDate] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);



  useEffect(() => {
    if (editable.name) {
      onChangeName(editable.name)
      setAction('PUT')
    }
  }, [editable])

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date.toLocaleString());
    hideDatePicker();
  };


  const resetState = () => {
    onSucess()
    onChangeName("")
    onChangeNotification("")
    setAction('POST')
    setEditable({})
    setModalVisible(!modalVisible)
  }

  const postReminder = () => {
    try {
      fetch(config.BASE_URL, {
        method: action,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editable._id,
          name: name,
          notification: selectedDate
        })
      }).then(response => response.json())
        .then(result => {
          if (result.success) {
            resetState()
          }
        })
    } catch (e) {
      console.error(e);
    }
  }

  const handleDeleteReminder = () => {
    fetch(config.BASE_URL + '/' + editable._id, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
        if (result.success) {
          resetState()
        }
      })
  }


  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <TextInput
              autoFocus={true}
              multiline={true}
              numberOfLines={10}
              placeholderTextColor="#fff"
              style={styles.input}
              onChangeText={onChangeName}
              value={name}
              placeholder="memo"
            />
            <SquareButton onPress={showDatePicker} >
              <MyText style={{ fontWeight: 'bold' }}>ADD TIME</MyText>
            </SquareButton>
            <DateTimePickerModal
              date={new Date()}
              isVisible={datePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

           
            <View style={styles.horizontalView}>
              <SquareButton
                onPress={() => {
                  onChangeName("")
                  setModalVisible(!modalVisible)
                }}
              >
                <MyText style={{ fontWeight: 'bold' }}>cancel</MyText>
              </SquareButton>
              <SquareButton
                onPress={postReminder}
              >
                <MyText style={{ fontWeight: 'bold' }}>submit</MyText>
              </SquareButton>
              <SquareButton onPress={handleDeleteReminder}>
                <MyText style={{ fontWeight: 'bold' }}>Delete</MyText>
              </SquareButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 10
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    padding: 15,
    width: '100%',
    color: '#fff',
    backgroundColor: '#121212',
    borderRadius: 10,
    margin: 5
  }
});