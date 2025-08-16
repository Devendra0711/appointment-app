import { Component } from '@angular/core';
import { Appointment } from '../models/appointment'; // Importing the Appointment interface from models what we created.
import { OnInit } from '@angular/core'; // Importing OnInit interface for component initialization (taking data from db and show/loading the data when loading component)

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
// here "class" is typescript class, we have to use necessarily
export class AppointmentListComponent implements OnInit {
  // appointment: string => denotion that it has a string property
  // appointment: string = "Take dog for a walk";

  // appointment: Appointment => denotion that it has a Appointment property from models/appointment.ts
  // appointment: Appointment = {
  //   id: 1,
  //   title: "Take dog for a walk",
  //   date: new Date()
  // };

  // appointments: Appointment[] => denotion that it has a Appointment array property
  // appointments ==> It is a property
  newAddAppointmentTitle: string = ''; // for adding new appointment
  newAddAppointmentDate: Date = new Date(); // for adding new appointment Date
  newAddAppointmentTime: string = ''; // for adding new appointment Time
  newAddAppointmentDescription: string = ''; // for adding new appointment Description
  newAddAppointmentContact: string = '';

  appointments: Appointment[] = []; // to store all appointments

  // This method will be used to add a new appointment to the appointments array
  // Why we use "this" here:-
  // In an Angular component class, this refers to the current instance of the component.
  // If a property is defined like:
  // newAddAppointmentTitle: string = 'Dentist Visit';
  // then you must use this.newAddAppointmentTitle inside methods to access it, because it belongs to the instance, not just the local function.

  ngOnInit(): void {
    // console.log('Appointments Loaded');
    // throw new Error ('Method not implemented.');
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      this.appointments = JSON.parse(storedAppointments);
    } else {
      this.appointments = []; // create a new empty array
    }
  }
  addAppointment() {
    // Create a new appointment object
    if (
      this.newAddAppointmentTitle.trim().length &&
      this.newAddAppointmentDate
    ) {
      const combinedDateTime = new Date(`${this.newAddAppointmentDate}T${this.newAddAppointmentTime}`);
      const newAppointment: Appointment = {
        id: this.appointments.length + 1, // Assign a new ID based on the current length of the appointments array
        title: this.newAddAppointmentTitle,
        dateTime: combinedDateTime,
        description: this.newAddAppointmentDescription,
        contact: this.newAddAppointmentContact
      };
      this.appointments.push(newAppointment); // Add the new appointment to the appointments array
      this.newAddAppointmentTitle = ''; // Clear the input field after adding
      this.newAddAppointmentDate = new Date(); // Clear the date field after adding
      this.newAddAppointmentTime = ''; // Clear the time field after adding
      this.newAddAppointmentDescription = ''; // Clear the description field after adding
      this.newAddAppointmentContact ='';
    }
    // alert("New Appointment Added:" + " " + this.newAddAppointmentTitle + " " + this.newAddAppointmentDate);
    localStorage.setItem('appointments', JSON.stringify(this.appointments)); // Save appointments to local storage
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(this.appointments)); // Update local storage after deleting
  }
   editAppointment(index: number) {
   const editableAppointment = this.appointments[index];
   this.newAddAppointmentTitle = editableAppointment.title;
   this.newAddAppointmentDate = editableAppointment.dateTime;
   this.newAddAppointmentDescription = editableAppointment.description;
   this.newAddAppointmentContact = editableAppointment.contact;
}
 
}