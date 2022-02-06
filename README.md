# Interview Scheduler - Stella Maris


## About

Interviewer Scheduler is a single page application (SPA) built using React that allows user to book, edit and cancel an interview appointment.  To book an interview appointment, a user can choose an available appointment slot, provide a student name and choose an interviewer.  

#### Functional Requirements
* Data is persisted by the API server using a PostgreSQL database.
* The client application communicates with an API server over HTTP, using the JSON format.
* Jest tests are used through the development of the project.
* Cypress is used for integration testing.

#### Behavioural Requirements
* Interviews can be booked between Monday and Friday.
* A user can switch between weekdays.
* A user can book an interview in an empty appointment slot.
* Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
* A user can cancel an existing interview.
* A user can edit the details of an existing interview.
* The list of days informs the user how many slots are available for each day.
* The expected day updates the number of spots available when an interview is booked or canceled.
* A user is presented with a confirmation when they attempt to cancel an interview.
* A user is shown an error if an interview cannot be saved or deleted.
* A user is shown a status indicator while asynchronous operations are in progress.
* When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
* The application makes API requests to load and persist data. We do not lose data after a browser refresh.


## Setup

Install dependencies with `npm install`.

### Dependancies
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

Fork and clone the [scheduler-api] (https://github.com/lighthouse-labs/scheduler-api) into a new directory, NOT within our current scheduler directory, and follow the README.md instructions to configure and run the API server.


## Running Webpack Development Server

```sh
npm start
```

Visit, http://localhost:8000/


## Running Jest Test Framework

```sh
npm test
```


## Running Storybook Visual Testbed

```sh
npm run storybook
```
Visit, http://localhost:9009/ 


## Scheduler Project Breakdown

![Components Map](docs/COMPONENT_MAP.png)

![State](docs/STATE.png)

![Boilerplate](docs/Boilerplate.png)


## Technical Specifications
* React
* Webpack, Babel
* Axios, WebSockets
* Axios
* Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application created using Create React App. 
Express is the basis for the Scheduler API server application.  Both servers run concurrently; requests are proxied from the Webpack development server to the API server.


## Final Product

![Screenshot of Appointment Form](https://github.com/goodWishesEveryone/scheduler/blob/master/docs/screenhots/appointment-form.png?raw=true)

![Screenshot when Booking an Interview](https://github.com/goodWishesEveryone/scheduler/blob/master/docs/screenhots/book_an_appointment.png?raw=true)

![Screenshot when Editing an Interview](https://github.com/goodWishesEveryone/scheduler/blob/master/docs/screenhots/edit_an_appointment.png?raw=true)

![Screenshot when Deleting an Interview](https://github.com/goodWishesEveryone/scheduler/blob/master/docs/screenhots/delete_an_appointment.png?raw=true)