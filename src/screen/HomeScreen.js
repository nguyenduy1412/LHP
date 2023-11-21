import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to classes..."
        onPress={() => navigation.navigate('Classes')}
      />
      <Button
        title="Go to studnets..."
        onPress={() => navigation.navigate('Student')}
      />

    </View>
  );
}
export default HomeScreen;