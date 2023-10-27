import * as React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import {
    Text,
    StyleSheet,
    View,
    Pressable,
    TextInput,
    ScrollView,
    Button,
} from "react-native";

const PaymentUI = () => {
    const navigation = useNavigation();
    const handleNavigate = () => {
        navigation.navigate("SuccessMsgCertificates"); // Replace "OtherScreen" with the name of the screen you want to navigate to
      };
   

    return (
        <View style={styles.container}>
            {/* Back button */}
            <Pressable
                style={styles.backButton}
                onPress={() => {
                    navigation.goBack(); // Navigate back when pressed
                }}
            >
                <Text style={styles.backButtonText}>{"<"}</Text>
            </Pressable>

            <Text style={styles.appointmentText}>Add your card details</Text>
            <Text style={styles.paymentText}>Total Payment Balance : 5800 LKR</Text>
         
            <Image
    source={require("../assets/cardImage.png")}
    style={styles.image} // Replace with the path to your image
    // Apply any additional styles you need
  />

            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Card Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="1234 5678 1234 8900"
                    placeholderTextColor="#AAA6B9"    
                />
                <Text style={styles.sectionTitle}>Name on Card</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Hasith Deminda"
                    placeholderTextColor="#AAA6B9"
                    
                />
                <Text style={styles.sectionTitle}>Expiration Date</Text>
                <TextInput
                    style={styles.input}
                    placeholder="2023/10/11"
                    placeholderTextColor="#AAA6B9"
                    
                />
                <Text style={styles.sectionTitle}>CVV</Text>
                <TextInput
                    style={styles.input}
                    placeholder="cvv"
                    placeholderTextColor="#AAA6B9"
                    
                />

                <Pressable
                    style={styles.addButton}
                >
                    <Text style={styles.buttonText}  onPress={handleNavigate}>Pay</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFD",
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 16,
    },
    backButtonText: {
        color: "#130160",
        fontSize: 16,
    },
    appointmentText: {
        color: "#150B3D",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 24,
        textAlign: "center",
    },
    paymentText: {
        color: "#150B3D",
        fontSize: 18,
        marginTop: 24,
        textAlign: "left",
    },
    image: {
        width:350,
        height:350,
        right:30,
    },
    form: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 16,
        color: "#150B3D",
        marginBottom: 8,
        
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#AAA6B9",
        borderRadius: 8,
        paddingLeft: 16,
        marginBottom: 16,
        color: "#130160",
    },
    descriptionInput: {
        height: 140,
        top:-110,
    },
    picker: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#AAA6B9",
        borderRadius: 8,
        marginBottom: 16,
    },
    addButton: {
        width: "100%",
        height: 60,
        borderRadius: 10,
        backgroundColor: "#130160",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 70,
    },
    upload: {
        width: "70%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "#130160",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginLeft:45,
        marginBottom: 60,
        top:50,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    radioContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
      },
      radioItem: {
        flexDirection: "row",
        alignItems: "center",
      },
});

export default PaymentUI;