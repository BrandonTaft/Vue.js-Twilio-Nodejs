import { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import config from './config';
import { MyHeader } from './components/GlobalText';
import { RoundButton } from './components/Buttons';
import Loader from './components/Loader';
import List from './components/List';

import Create from './components/Create';


export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [editable, setEditable] = useState({})
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    setLoading(true);
    fetch(config.BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setReminders(data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);
  
  return (
    <View style={styles.bodyContainer}>

      <View style={styles.topContainer} >
        <MyHeader>NOTIFY</MyHeader>
      </View>

      <View style={styles.midContainer} >
        {loading ? <Loader /> : 
        <List
          reminders={reminders}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setEditable={setEditable} 
        />}
      </View>

      <View style={styles.bottomContainer} >
        <Create
          onSucess={() => setRefresh(!refresh)}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          editable={editable}
          setEditable={setEditable}
        />
       
        <RoundButton onPress={() => setRefresh(!refresh)}>
          <MyHeader>R</MyHeader>
        </RoundButton>
       
      </View>

      <StatusBar style="light" />

    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: '#000000',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#121212',
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  midContainer: {
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
    width: '100%'
  }
});
