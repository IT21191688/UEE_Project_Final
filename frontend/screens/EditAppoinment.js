import * as React from "react";
import { useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    View,
    Pressable,
    TextInput,
    ScrollView,
    Button,
    TouchableOpacity,
    Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import ModernDatePicker from "react-native-modern-datepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EditAppoinment = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("64f0ac2b958ea9baa678eca0");
    const [selectedDate, setSelectedDate] = useState(null);
    const [organizations, setOrganizations] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [description, setDescription] = useState("");

    const [appId, setIDEd] = useState('');
    const [titleEd, setTitleEd] = useState('');
    const [departmentEd, setDepartmentEd] = useState('');
    const [selectedDateEd, setSelectedDateEd] = useState(null);
    const [selectedTimeSlotEd, setSelectedTimeSlotEd] = useState('');
    const [descriptionEd, setDescriptionEd] = useState('');

    const [appointmentDetails, setAppointmentDetails] = useState(null);


    useEffect(() => {



        const fetchOrganizations = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    console.error('Token is missing in AsyncStorage');
                    return;
                }
                const headers = {
                    'Authorization': `Bearer ${token}`,
                };
                const response = await axios.get('https://uee123.onrender.com/api/v1/organization/getAll', { headers });

                if (response.data.isSuccessful) {
                    const organizationsData = response.data.data;
                    const organizationInfo = organizationsData.map(org => ({
                        id: org._id,
                        name: org.orgName,
                    }));
                    setOrganizations(organizationInfo);
                } else {
                    console.error('Failed to fetch organizations:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching organizations:', error);
            }
        };

        fetchAppointmentDetails();
        fetchOrganizations();
    }, []);

    const handleEditAppointment = async () => {

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token is missing in AsyncStorage');
                return;
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            // Create a request body object with the appointment details
            const requestBody = {
                title: titleEd,
                description: descriptionEd, // Replace with your description
                appointmentDate: selectedDateEd,
                appointmentTime: selectedTimeSlotEd, // Make sure selectedTimeSlot is set to a valid value
                organization: department, // Assuming department is the organization ID
            };

            const response = await axios.patch(
                `https://uee123.onrender.com/api/v1/appointment/update/${appId}`,
                requestBody,
                { headers }
            );

            if (response.data.isSuccessful) {
                Alert.alert("Successfully Edit Appointment");
                navigation.navigate("Appointments")
            } else {
                Alert.alert("Failed Try Again: " + response.data.message);
                navigation.navigate("Appointments")
            }
        } catch (error) {
            console.error('Error Edit appointment:', error);
            Alert.alert("Failed to Edit Appointment: " + error.message);
        }
    };


    useEffect(() => {
        if (selectedDate && department) {
            fetchAvailableTimeSlots(selectedDate, department);
        }
    }, [selectedDate, department]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        //fetchAvailableTimeSlots(selectedDate, department); // Use department directly
    };

    const handleDepartmentChange = (value) => {
        setDepartment(value);
        //fetchAvailableTimeSlots(selectedDate, value); // Use selectedDate directly
    };


    const fetchAppointmentDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token is missing in AsyncStorage');
                return;
            }

            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            // Make a GET request to fetch appointment details by ID
            const response = await axios.get(
                `https://uee123.onrender.com/api/v1/appointment/getAppoinmentDetails/${route.params.appointmentId}`,
                { headers }
            );

            if (response.data.isSuccessful) {
                const fetchedAppointment = response.data.data;
                setAppointmentDetails(fetchedAppointment);
                // Pre-fill form fields with fetchedAppointment data
                setIDEd(fetchedAppointment._id);
                setTitleEd(fetchedAppointment.title);
                setDepartmentEd(fetchedAppointment.organization);
                setSelectedDateEd(fetchedAppointment.appointmentDate);
                setSelectedTimeSlotEd(fetchedAppointment.appointmentTime);
                setDescriptionEd(fetchedAppointment.description);
            } else {
                console.error("Failed to fetch appointment:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching appointment:", error);
        }
    };



    const fetchAvailableTimeSlots = async (selectedDate, department) => {
        try {
            const response = await axios.get(
                `https://uee123.onrender.com/api/v1/appointment/getAvailableSlots?date=${selectedDate}&organization=${department}`
            );

            if (response.data.isSuccessful) {
                const timeSlots = response.data.data;
                setAvailableTimeSlots(timeSlots);
            } else {
                console.error('Failed to fetch time slots:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching time slots:', error);
        }
    };

    // Example usage:
    const startDate = new Date("2023-10-12");
    const endDate = new Date("2023-10-20");

    const dateList = generateDateList(startDate, endDate);

    function generateDateList(startDate, endDate) {
        const dateList = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dateList.push(currentDate.toISOString().slice(0, 10));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateList;
    }

    return (
        <View style={styles.container}>
            {/* Back button */}
            <Pressable
                style={styles.backButton}
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Text style={styles.backButtonText}>{"<"}</Text>
            </Pressable>

            <Text style={styles.appointmentText}>Edit An Appointment</Text>

            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Title"
                    placeholderTextColor="#AAA6B9"
                    value={titleEd}
                    onChangeText={(text) => setTitleEd(text)} // Use setTitleEd to update titleEd
                />

                <Text style={styles.sectionTitle}>Department</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={departmentEd}
                    onValueChange={(value) => setDepartmentEd(value)}
                >
                    {organizations.map((org, index) => (
                        <Picker.Item key={org.id} label={org.name} value={org.id} />
                    ))}
                </Picker>

                <Text style={styles.sectionTitle}>Date</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedDateEd}
                    onValueChange={(value) => setSelectedDateEd(value)}
                >
                    {dateList.map((date) => (
                        <Picker.Item key={date} label={date} value={date} />
                    ))}
                </Picker>

                <Text style={styles.sectionTitle}>Time Slot</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedTimeSlotEd}
                    onValueChange={(value) => setSelectedTimeSlotEd(value)}
                >
                    {availableTimeSlots.map((timeSlot) => (
                        <Picker.Item
                            key={timeSlot.id}
                            label={timeSlot.timeSlot}
                            value={timeSlot.id}
                        />
                    ))}
                </Picker>

                <Text style={styles.sectionTitle}>Description</Text>
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Enter Description"
                    placeholderTextColor="#AAA6B9"
                    multiline={true}
                    numberOfLines={4}
                    value={descriptionEd}
                    onChangeText={(text) => setDescriptionEd(text)}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleEditAppointment}
                >
                    <Text style={styles.buttonText}>Edit Appointment</Text>
                </TouchableOpacity>
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

export default EditAppoinment;
