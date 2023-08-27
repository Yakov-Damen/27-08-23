"use strict";
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
class Patient extends Person {
    constructor(patientId, firstName, lastName) {
        super(firstName, lastName);
        this.patientId = patientId;
    }
    patientDetails() {
        return `patient name: ${this.firstName} ${this.lastName} id: ${this.patientId}`;
    }
}
class Doctor extends Person {
    constructor(firstName, lastName, doctorId, specialization) {
        super(firstName, lastName);
        this.doctorId = doctorId;
        this.specialization = specialization;
    }
    doctorDetails() {
        return `doctor name: ${this.firstName} ${this.lastName}, id: ${this.doctorId}, specialization: ${this.specialization}`;
    }
}
class Appointment {
    constructor(patient, doctor, date, time) {
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
    }
    appointmentDetails() {
        return `appointment details:
        date: ${this.date},
        time: ${this.time},
        patient: ${this.patient.patientDetails()},
        doctor: ${this.doctor.doctorDetails()}`;
    }
}
class Hospital {
    constructor(hospitalName) {
        this.patients = [];
        this.doctors = [];
        this.appointments = [];
        this.hospitalName = hospitalName;
    }
    addPatient(id, fName, lName) {
        this.patients.push(new Patient(id, fName, lName));
    }
    addDoctor(fName, lName, id, specialization) {
        this.doctors.push(new Doctor(fName, lName, id, specialization));
    }
    addAppointment(patientId, doctorId, date, time) {
        let patient = this.patients.find(p => p.patientId === patientId);
        let doctor = this.doctors.find(d => d.doctorId === doctorId);
        if (patient && doctor)
            this.appointments.push(new Appointment(patient, doctor, date, time));
        else
            console.error(`Failed creating appointment: create patient and doctor first`);
    }
    showAllAppointments() {
        return this.appointments.map(appointment => appointment.appointmentDetails()).join('\n');
    }
    showAppointmentsBydoctor(doctorId) {
        return this.appointments.filter(appointment => appointment.doctor.doctorId === doctorId).map(appointment => appointment.appointmentDetails()).join('\n');
    }
    showAppointmentsBypatient(patientId) {
        return this.appointments.filter(appointment => appointment.patient.patientId === patientId).map(appointment => appointment.appointmentDetails()).join('\n');
    }
    todaysAppointments() {
        return this.appointments.filter(appointment => appointment.date === new Date().toDateString()).map(appointment => appointment.appointmentDetails()).join('\n');
    }
}
let patient1 = new Patient(1, 'John', 'Doe');
let patient2 = new Patient(2, 'Mick', 'How');
let doctor1 = new Doctor('Mark', 'Nov', 1, 'Cardiology');
let doctor2 = new Doctor('Amit', 'Hagever', 2, 'Neurology');
let appointment1 = new Appointment(patient1, doctor1, new Date().toDateString(), new Date().toLocaleTimeString());
let appointment2 = new Appointment(patient2, doctor2, new Date().toDateString(), '12:00');
let Shiba = new Hospital('Tel-Hashomer');
Shiba.addPatient(1, 'John', 'Doe');
Shiba.addPatient(2, 'Mick', 'How');
Shiba.addDoctor('Mark', 'Nov', 1, 'Cardiology');
Shiba.addDoctor('Amit', 'Hagever', 2, 'Neurology');
Shiba.addAppointment(1, 2, new Date().toDateString(), new Date().toLocaleTimeString());
Shiba.addAppointment(2, 1, new Date().toDateString(), '12:00');
console.log(Shiba.showAllAppointments());
