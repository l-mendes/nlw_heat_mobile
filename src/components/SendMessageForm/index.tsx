import React, {FormEvent, useState} from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const formatedMessage = message.trim();

    if (formatedMessage.length === 0) {
      Alert.alert('Escreva a mensagem para enviar');
      return;
    }

    try {
      setSendingMessage(true);
      await api.post('/messages', {message: formatedMessage});
      setMessage('');
      Keyboard.dismiss();
      Alert.alert('Mensagem enviado com sucesso!');
    } catch (error) {
      console.log(error);
      Alert.alert('Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.');
    } finally {
      setSendingMessage(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        style={styles.input}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />

      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  )
}
