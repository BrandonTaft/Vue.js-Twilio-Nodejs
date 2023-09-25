import { StyleSheet, View } from 'react-native';
import { MyHeader } from './GlobalText';

export default function Loader() {

    return (
      <View  style={styles.container}>
        <MyHeader style={{ color: '#fff', fontSize: 28 }}>THINKING.....</MyHeader> 
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
      height: 300
    }
  });
