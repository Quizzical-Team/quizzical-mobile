import React, { useState } from 'react';
import { View, Text } from 'react-native'

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <View>
      <Text>Login Screen</Text>
    </View>
  );
};

export default LoginScreen;
