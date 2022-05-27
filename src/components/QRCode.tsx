import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QR from 'react-native-qrcode-svg'

export type Props = {
    value: string;
    size?: number;
    title? : string;
  };

const QRCode = ({
     value = '', 
     title = ''
     }: Props) => {
  return (
    <View style={styles.containerQrCode}>
      <QR 
         value={value}
      />
      {
        title !== '' && (
          <Text style={styles.textQr}>{title}</Text>
        )
      }
    </View>
  )
}

export default QRCode

const styles = StyleSheet.create({
    containerQrCode: {
        backgroundColor: '#e3e3e3',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
    },
      textQr: {
        color: '#6c6c6c',
        fontSize: 17,
        textAlign: 'center',
        paddingVertical: 7,
      },
})