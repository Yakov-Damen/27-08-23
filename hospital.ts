abstract class Person {
    firstName: string
    lastName: string
    age: number
    address: string

    constructor(firstName: string, lastName: string, age: number, address: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
    }
}

class Patient extends Person {
    patientId: number
    phoneNumber: string
    emergencyContact: string
    medicalHistory: Appointment[]

    constructor(patientId: number, firstName: string, lastName: string, age: number, address: string, phoneNumber: string, emergencyContact: string) {
        super(firstName, lastName, age, address);
        this.patientId = patientId;
        this.phoneNumber = phoneNumber;
        this.emergencyContact = emergencyContact;
        this.medicalHistory = [];
    }

    addHistory(history: Appointment) {
        this.medicalHistory.push(history);
    }

    patientDetails(): string {
        return `patient name: ${this.firstName} ${this.lastName} id: ${this.patientId}`;
    }
}

abstract class MedicalStaff extends Person {
    staffId: number;
    position: number;
    department: string;

    constructor(staffId: number, firstName: string, lastName: string, age: number, address: string , position: number, department: string) {
        super(firstName, lastName, age, address);
        this.staffId = staffId;
        this.position = position;
        this.department = department;
    }
}

class Doctor extends MedicalStaff {
    doctorId: number
    specialization: string

    constructor(doctorId: number, firstName: string, lastName: string, age: number, address: string,staffId: number, position: number, department: string, specialization: string) {
        super(staffId, firstName, lastName, age, address, position, department);
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
        patient.addHistory(this);
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

    addPatient(id: number, fName: string, lName: string, age: number, address: string, phoneNumber: string, emergencyContact: string): void {
        this.patients.push(new Patient(id, fName, lName, age, address, phoneNumber, emergencyContact));
    }

    addDoctor(id: number,fName: string, lName: string, age: number, address: string, staffId: number, position: number, department: string ,specialization: string): void {
        this.doctors.push(new Doctor(id, fName, lName, age, address, staffId, position, department, specialization));
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




let Shiba = new Hospital('Tel-Hashomer');
Shiba.addPatient(1, 'John', 'Doe', 25, 'New York', '0123456789', 'father');
Shiba.addPatient(2, 'Mick', 'How', 30, 'istanbul', '0123894589', 'mother');
Shiba.addDoctor(1, 'Mark', 'Nov', 50, 'Israel',10, 2, 'ER', 'Cardiology');
Shiba.addDoctor(2, 'Amit', 'Hagever',56 ,'New York', 15, 5, 'Nr', 'Neurology');
Shiba.addAppointment(1, 2, new Date().toDateString(), new Date().toLocaleTimeString())
Shiba.addAppointment(2, 1, new Date().toDateString(), '12:00')
console.log(Shiba.showAllAppointments());
