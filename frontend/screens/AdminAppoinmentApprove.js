import * as React from "react";
import { Text, StyleSheet, View, Pressable, TextInput, DatePickerIOS, ScrollView, DatePickerIOSBase, Image } from "react-native";


//hello
const AdminAppoinmentApprove = () => {

    const date = 0;
    return (
        <View style={styles.appointmentView}>

            <Image
                style={styles.successImage}
                contentFit="cover"
                source={require("../assets/AppoinmentSuccessfull.png")}
            />
            <Text style={styles.successText}>Approve Success</Text>

            <View style={styles.okButton}>
                <Text>OK</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    appointmentView: {
        alignItems: 'center', // Center align the content vertically
    },
    successImage: {
        width: 254,
        height: 254,
        flexShrink: 0,
        top: 220
    },
    successText: {
        color: '#0D0D26', // Default color
        textAlign: 'center',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 28.8, // Line height in React Native is a number, not a percentage
        letterSpacing: -0.36,
        top: 200
    },
    contentText: {
        color: '#95969D', // Default color
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 24, // Line height in React Native is a number, not a percentage
        letterSpacing: -0.16,
        top: 200
    },

    okButton: {
        display: 'flex',
        width: 327,
        paddingVertical: 16,
        paddingHorizontal: 48,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // React Native uses flexDirection to control alignment
        gap: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#356899',
        top: 240
    },

});

export default AdminAppoinmentApprove;
