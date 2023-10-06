import * as React from "react";
import { Text, StyleSheet, View, Pressable, TextInput, DatePickerIOS, ScrollView, DatePickerIOSBase } from "react-native";
import { Image } from "expo-image";
import SeniorManagementAppointmentCon2 from "../components/SeniorManagementAppointmentCon2";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import Property1Primary from "../components/Property1Primary";
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';


//hello
const AddAppointments = () => {

    const date = 0;
    return (
        <View style={styles.appointmentView}>
            {/* Back button*/}
            <Image
                style={styles.backButton}
                source={require('../assets/akariconschevronleft.png')}
                contentFit="cover"
            />
            <Text style={styles.appointmentText}>
                Create An Appoinment
            </Text>


            <ScrollView style={styles.form}>
                <View>
                    <Text style={styles.titleText}>Your Title Here</Text>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Enter Title"
                        placeholderTextColor="#AAA6B9"
                    />

                    <Text style={styles.titleText}>Department</Text>
                    <Picker style={styles.picker}>
                        {/* Add department options here */}
                        <Picker.Item label="Option 1" value="option1" />
                        <Picker.Item label="Option 2" value="option2" />
                        {/* Add more options as needed */}
                    </Picker>

                    <Text style={styles.titleText}>Date</Text>
                    <Picker style={styles.picker}>
                        {/* Add time slot options here */}
                        <Picker.Item label="Morning" value="morning" />
                        <Picker.Item label="Afternoon" value="afternoon" />
                        {/* Add more options as needed */}
                    </Picker>

                    <Text style={styles.titleText}>Time Slot</Text>
                    <Picker style={styles.picker}>
                        {/* Add time slot options here */}
                        <Picker.Item label="Morning" value="morning" />
                        <Picker.Item label="Afternoon" value="afternoon" />
                        {/* Add more options as needed */}
                    </Picker>

                    <Text style={styles.titleText}>Description</Text>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="Enter Description"
                        placeholderTextColor="#AAA6B9"
                        multiline={true}
                        numberOfLines={4}
                    />

                    <Pressable
                        style={{
                            width: 317,
                            height: 60,
                            borderRadius: 10,
                            backgroundColor: '#130160',
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: 10,


                        }}
                        onPress={() => {
                            // Handle button press here
                        }}
                    >
                        <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>
                            Add Appointment
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    appointmentView: {
        alignItems: 'center', // Center align the content vertically
    },
    backButton: {
        height: 24,
        width: 24,
        marginBottom: 8,
        height: 24,
        width: 24,
        position: "absolute",
        top: 60,
        left: 18,
        overflow: "hidden",// Spacing between the image and text
    },
    appointmentText: {
        color: '#150B3D',
        fontSize: 20,
        fontWeight: '700',
        top: "20%",
        right: '10%'
    },
    titleInput: {
        width: 295,
        height: 71,
        flexShrink: 0,
        color: '#AAA6B9',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        borderWidth: 1, // Add a border
        borderColor: '#AAA6B9', // Border color
        borderRadius: 8, // Add some border radius for rounded corners
        paddingLeft: 16, // Left padding for input text
    },
    form: {
        top: "30%",
        backgroundColor: '#FAFAFD',
        alignContent: 'center',
        height: 500
    },
    picker: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#AAA6B9',
        borderRadius: 8,
        marginBottom: 16,
    },
    datePicker: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#AAA6B9',
        borderRadius: 8,
        marginBottom: 16,
    },
    titleText: {
        fontSize: 20,
        color: '#150B3D',
    }


});

export default AddAppointments;
