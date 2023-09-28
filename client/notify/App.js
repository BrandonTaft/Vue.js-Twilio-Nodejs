import { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { MyHeader } from './components/GlobalText';
import Loader from './components/Loader';
import List from './components/List';
import useFetch from './components/useFetch';

export default function App() {

  const { isLoading, reminders, setRefresh, refresh } = useFetch();

  return (
    <View style={styles.bodyContainer}>

      <View style={styles.topContainer} >
        <MyHeader>NOTIFY</MyHeader>
      </View>

      <View style={styles.midContainer} >
        {isLoading ? <Loader /> :
          <List
            reminders={reminders}
            onSucess={() => setRefresh(!refresh)}
          />}
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
    width: '100%'
  }
});
