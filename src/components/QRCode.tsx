import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QR from 'react-native-qrcode-svg'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export type Props = {
    value: string;
    size?: number;
    title? : string;
  };

const QRCode = ({
     value = '', 
     size = hp( '25%' ), 
     title = ''
     }: Props) => {
  return (
    <View style={styles.containerQrCode}>
      <QR 
         value={value}
         size={size}
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
        height: hp( '30%' ),
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        marginTop: hp( '3%' )
    },
      textQr: {
        color: '#6c6c6c',
        fontSize: 17,
        textAlign: 'center',
        paddingVertical: 7,
      },
})