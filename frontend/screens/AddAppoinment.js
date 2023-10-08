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

const AddAppointments = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState(""); // State to store title
    const [department, setDepartment] = useState("option1"); // State to store department
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleSave = () => {
        if (selectedDate) {
            // Handle the selected date here
            console.log("Selected Date:", selectedDate);
        } else {
            // Handle the case where no date is selected
            console.log("Please select a date.");
        }
    };

    const handleAddAppointment = () => {
        // Handle the button press to add the appointment
        console.log("Title:", title);
        console.log("Department:", department);
        console.log("Selected Date:", selectedDate);
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

            <Text style={styles.appointmentText}>Create An Appointment</Text>

            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Title"
                    placeholderTextColor="#AAA6B9"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />

                <Text style={styles.sectionTitle}>Department</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={department}
                    onValueChange={(value) => setDepartment(value)}
                >
                    <Picker.Item label="Option 1" value="option1" />
                    <Picker.Item label="Option 2" value="option2" />
                </Picker>

                <Text style={styles.sectionTitle}>Date</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={department}
                    onValueChange={(value) => setDepartment(value)}
                >
                    <Picker.Item label="Option 1" value="option1" />
                    <Picker.Item label="Option 2" value="option2" />
                </Picker>

                <Text style={styles.sectionTitle}>Time Slot</Text>
                <Picker style={styles.picker}>
                    {/* Add time slot options here */}
                </Picker>

                <Text style={styles.sectionTitle}>Description</Text>
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Enter Description"
                    placeholderTextColor="#AAA6B9"
                    multiline={true}
                    numberOfLines={4}
                />

                <Pressable
                    style={styles.addButton}
                    onPress={handleAddAppointment}
                >
                    <Text style={styles.buttonText}>Add Appointment</Text>
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
        height: 80,
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
        marginBottom: 60,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AddAppointments;
