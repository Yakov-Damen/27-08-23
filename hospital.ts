abstract class Person {
    firstName: string
    lastName: string

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Patient extends Person {
    patientId: number

    constructor(patientId: number, firstName: string, lastName: string) {
        super(firstName, lastName);
        this.patientId = patientId;
    }

    patientDetails(): string {
        return `patient name: ${this.firstName} ${this.lastName} id: ${this.patientId}`;
    }
}

class Doctor extends Person {
    doctorId: number
    specialization: string

    constructor(firstName: string, lastName: string, doctorId: number, specialization: string) {
        super(firstName, lastName);
        this.doctorId = doctorId
        this.specialization = specialization;
    }

    doctorDetails(): string {
        return `doctor name: ${this.firstName} ${this.lastName}, id: ${this.doctorId}, specialization: ${this.specialization}`;
    }
}

class Appointment {
    patient: Patient
    doctor: Doctor
    date: string
    time: string

    constructor(patient: Patient, doctor: Doctor, date: string, time: string) {
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
    }

    appointmentDetails(): string {
        return `appointment details:
        date: ${this.date},
        time: ${this.time},
        patient: ${this.patient.patientDetails()},
        doctor: ${this.doctor.doctorDetails()}`;
    }
}

class Hospital {
    patients: Patient[]
    doctors: Doctor[]
    appointments: Appointment[]
    hospitalName: string

    constructor(hospitalName: string) {
        this.patients = [];
        this.doctors = [];
        this.appointments = [];
        this.hospitalName = hospitalName;
    }

    addPatient(id: number, fName: string, lName: string): void {
        this.patients.push(new Patient(id, fName, lName));
    }
    addDoctor(fName: string, lName: string, id: number, specialization: string): void {
        this.doctors.push(new Doctor(fName, lName, id, specialization));
    }
    addAppointment(patientId: number, doctorId: number, date: string, time: string): void {
        let patient = this.patients.find(p => p.patientId === patientId);
        let doctor = this.doctors.find(d => d.doctorId === doctorId);
        if(patient && doctor) this.appointments.push(new Appointment(patient, doctor, date, time));
        else console.error(`Failed creating appointment: create patient and doctor first`);
    }
    showAllAppointments(): string {
        return this.appointments.map(appointment => appointment.appointmentDetails()).join('\n');
    }
    showAppointmentsBydoctor(doctorId: number): string {
        return this.appointments.filter(appointment => appointment.doctor.doctorId === doctorId).map(appointment => appointment.appointmentDetails()).join('\n');
    }
    showAppointmentsBypatient(patientId: number): string {
        return this.appointments.filter(appointment => appointment.patient.patientId === patientId).map(appointment => appointment.appointmentDetails()).join('\n');
    }
    todaysAppointments(): string {
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
Shiba.addAppointment(1, 2, new Date().toDateString(), new Date().toLocaleTimeString())
Shiba.addAppointment(2, 1, new Date().toDateString(), '12:00')
console.log(Shiba.showAllAppointments());
