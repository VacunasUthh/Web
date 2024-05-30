import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Button, Input, TabView } from '@rneui/themed';
import { Link } from '@react-navigation/native';

interface TabLoginProps {
  navigation: any; // Puedes ajustar este tipo según sea necesario
}

const TabLogin: React.FC<TabLoginProps> = ({  }) => {
  return (
    <TabView.Item style={{ flex: 1 }}>
      <ScrollView keyboardDismissMode="interactive">
        <View>
          <Text >Iniciar Sesión</Text>
          <View >
            <Image
              source={require('../image/user.png')}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <Input
            onChangeText={(e) => console.log(e)} // Solo para evitar error de compilación, puedes eliminar esto
            leftIcon={<Image source={require('../image/Icncorreo.png')} style={{ width: 30, height: 30 }} />}
            label="Correo"
          />
          <Input
            onChangeText={(e) => console.log(e)} // Solo para evitar error de compilación, puedes eliminar esto
            leftIcon={<Image source={require('../image/Icncandado.png')} style={{ width: 30, height: 30 }} />}
            label="Contraseña"
            secureTextEntry
          />
          <Link to={{ screen: 'recovery' }} style={{ width: '100%', padding: 0, color: '#48A2E2', fontWeight: 'bold', fontSize: 14, textAlign: 'right', paddingRight: 10 }}>
            Olvide mi contraseña
          </Link>
          <Button
            title="Acceder"
            color="#48A2E2"
            
          />
        </View>
      </ScrollView>
    </TabView.Item>
  );
};

export default TabLogin;
