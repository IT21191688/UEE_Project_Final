import constants from "../constant";
import appointmentService from "./appointment.service";

const timeSlots = [
  {
    id: 1,
    timeSlot: "9:00 AM - 09:30 AM",
  },
  {
    id: 2,
    timeSlot: "09:30 AM - 10:00 AM",
  },
  {
    id: 3,
    timeSlot: "10:00 AM - 10:30 AM",
  },
  {
    id: 4,
    timeSlot: "10:30 AM - 11:00 AM",
  },
  {
    id: 5,
    timeSlot: "11:00 AM - 11:30 AM",
  },
  {
    id: 6,
    timeSlot: "11:30 AM - 12:00 PM",
  },
  {
    id: 7,
    timeSlot: "12:00 PM - 12:30 PM",
  },
  {
    id: 8,
    timeSlot: "12:30 PM - 1:00 PM",
  },
  {
    id: 9,
    timeSlot: "01:00 PM - 1:30 PM",
  },
  {
    id: 10,
    timeSlot: "01:30 PM - 2:00 PM",
  },
  {
    id: 11,
    timeSlot: "03:00 PM - 3:30 PM",
  },
  {
    id: 12,
    timeSlot: "03:30 PM - 4:00 PM",
  },
  {
    id: 13,
    timeSlot: "04:00 PM - 4:30 PM",
  },
  {
    id: 14,
    timeSlot: "04:30 PM - 5:00 PM",
  },
];

const disableExpiredAppointments = async () => {
  let appointments = await appointmentService.findExpiredAppointments();

  appointments.forEach(async (appointment: any) => {
    appointment.status = constants.WELLKNOWNSTATUS.DISABLED;
    await appointment.save();
  });
};

export { timeSlots, disableExpiredAppointments };
