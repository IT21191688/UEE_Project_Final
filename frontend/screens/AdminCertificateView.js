import * as React from "react";
import { useState } from "react";
import {
    Text,
    StyleSheet,
    View,
    Pressable,
    TextInput,
    ScrollView,
    Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import ModernDatePicker from "react-native-modern-datepicker";
import { RadioButton } from "react-native-paper";

const AdminCertificateView = () => {
    const navigation = useNavigation();
    
      const handleNavigateApprove = () => {
        navigation.navigate("ApprovedMsg"); // Replace "OtherScreen" with the name of the screen you want to navigate to
      };

      const handleNavigateReject = () => {
        navigation.navigate("RejectMsg"); // Replace "OtherScreen" with the name of the screen you want to navigate to
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

            <Text style={styles.appointmentText}>Driving Licences </Text>

            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Full name"
                    placeholderTextColor="#AAA6B9"
                    
                />
                <Text style={styles.sectionTitle}>NIC</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter NIC"
                    placeholderTextColor="#AAA6B9"
                    
                />
                <Text style={styles.sectionTitle}>Email address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email address"
                    placeholderTextColor="#AAA6B9"
                    
                />
                <Text style={styles.sectionTitle}>Home Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Home Addres"
                    placeholderTextColor="#AAA6B9"
                    
                />
                <Text style={styles.sectionTitle}>Phone number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="+94 00 000 0000"
                    placeholderTextColor="#AAA6B9"
                    
                />

                <Text style={styles.sectionTitle}>Required Certificate type</Text>
                <Picker
                    style={styles.picker}  
                >
                    <Picker.Item label="Birth Certificates" value="option1" />
                    <Picker.Item label="Death Certificates" value="option2" />
                    <Picker.Item label="Educational Certificates" value="option3" />
                    <Picker.Item label="Licences" value="option4" />
                </Picker>

                <Text style={styles.sectionTitle}>Required Certificate type</Text>
                <View style={styles.radioContainer}>
                
                <View style={styles.radioItem}>
                    <Text>General</Text>
                <RadioButton value="urgent" />
                </View>
                <View style={styles.radioItem}>
                    <Text>Urgent</Text>
                <RadioButton value="normal" />
                </View>
            </View>

                
                <Text style={styles.sectionTitle}>Upload Additional Documents</Text>
                
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Upload your file"
                    placeholderTextColor="#AAA6B9"
                    multiline={true}
                    numberOfLines={4}
                   
                    
                />

<View style={styles.buttonRow}>
  <View style={styles.buttonColumn}>
    <Pressable
      style={[styles.addButton, styles.approveButton]}
      onPress={handleNavigateApprove}
    >
      <Text style={styles.buttonText}>Approve</Text>
    </Pressable>
  </View>

  <View style={styles.buttonColumn}>
    <Pressable
      style={[styles.addButton, styles.rejectButton]}
      onPress={handleNavigateReject}
      
    >
      <Text style={[styles.buttonText]}>Reject</Text>
    </Pressable>
  </View>
</View>

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
    form: {
        marginTop: 32,
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
        top:-0,
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
        width: "45%",
        height: 50,
        top:60,
        borderRadius: 10,
        backgroundColor: "#130160",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -60,
        marginBottom: 70,
    },
    rejectButton:{
        left:180,
        top:-3,
        backgroundColor: "#CED2E1",
        
    },
    buttonText:{
        
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

export default AdminCertificateView;