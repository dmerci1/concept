import React from 'React';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MemberThumbnail({
  name,
  phone,
  avatar,
  textColor,
  onPress,
}) {  
  const ImageComponent = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.container}>
      <ImageComponent onPress={onPress}>
        <Image
          source={{
          uri: avatar,
        }}
        style={styles.avatar}
      />
      </ImageComponent>
      {name !== '' &&  (
        <Text style={styles.name}>{name}</Text>
      )}
      {phone !== '' &&  (
        <View style={styles.phoneSection}>
          <Icon name="phone" size={16} style={{ color: textColor}} />
          <Text style={styles.phone}>{phone}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2,
  },
  name: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 2,
    fontWeight: 'bold',
    color: 'white',
  },
  phoneSection: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
