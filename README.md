# Basic information:
---
### API Documentation    
Swagger documentation is available at `{{host}}/api/v1/docs`.

---
### Dictionary
- room - 
---
### Calls
First you need to schedule an appointment with given timestamp. Appointment service will invoke call service to create an room. After room was created scheduler service will schedule an socket.io emit signal at the time of appointment. When the time of appointment comes, socket will emit to both users (patient and doctor) room ID to which they have to connect to.

##### Emitting signals  
Everytime someone joins the room or exits the room, signal is being broadcasted to everyone in the room (In case of this app only to other user). 

##### Restarting application after calls have been scheduled  
If there are already scheduled calls and application restarts, all scheduled calls will be lost. To prevent that behaviour, every time after successfull restart of application, scheduler service schedules all appointments from the database (future only).
