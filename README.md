## Notes App | Ensolvers Challenge

A note management application built with Spring Boot, React, and MySQL for the Ensolvers Challenge.

#### Description

This project implements a note management system where users can create, archive, edit, and delete notes. Additionally, users can manage tags associated with each note by creating and deleting them.

#### Technologies Used

- **Backend**:
  - Spring Boot
  - Maven

- **Frontend**:
  - React
  - Material UI

- **Database**:
  - MySQL

- **Server Environment**:
  - XAMPP

#### Features

- Create, read, update, and delete (CRUD) operations for notes.
- Archive notes.
- Create and delete tags associated with notes.

#### Required to run

##### Backend
- **Java**: Ensure you have Java installed. The project is built with Java 17.
- **Maven**: Maven is used as a build automation tool. Install Maven 3.6.3 to manage project dependencies.

##### Frontend
- **Node.js and npm**: Node.js and npm are required to run the frontend. Install [Node.js](https://nodejs.org/) and npm to manage frontend dependencies. The project was developed with npm 10.2.4.

#### Database
- **MySQL Server**: The project uses MySQL as the database server. Install and configure MySQL Server. You can use tools like XAMPP or MAMP for local development environments.

#### Getting Started

1. **Clone the Repository**:

```
    git clone https://github.com/ensolvers-github-challenges/Bucciarelli-3a0b06
```

2. **General Setup**:
- Go to the project's root directory and run:
```
  chmod +x setup.sh
 ```

- Run the setup.sh file in order to set-up and run all the necessary things to run the project. The way of executing it in the terminal is:
```
  ./setup.sh <DB_USERNAME> <DB_PASSWORD>
 ```

3. **Usage**:
- Access the application in your browser (http://localhost:3000/).
- First, create a tag before creating a note.
- Create, edit, archive, and delete notes.

#### Contributors

- [Nazareno Bucciarelli](https://github.com/nazabucciarelli)

