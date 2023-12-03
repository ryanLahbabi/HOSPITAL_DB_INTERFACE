# Hospital Management Web Application

This project is a web application built upon the `hopital_bd` database, designed to manage a list of medical practitioners within a hospital setting. The application provides a user-friendly interface for viewing, adding, modifying, and deleting doctor records.

## Features

- **View Doctors**: A page dedicated to displaying all fields and entries of the `Medecin` table.
- **Manage Doctors**: Modal-driven interfaces to add (INSERT), modify (UPDATE), and delete (DELETE) doctor records within the database.
- **Error Handling**: The application robustly handles database errors, such as foreign key reference issues, and provides user-friendly error descriptions through modals.
- **Dedicated Management Pages**: Separate pages for adding, modifying, and deleting doctor records.
  - **Add Doctor**: Includes a form with default values for quick testing and dropdown lists for selecting values like specialties and service IDs fetched from the database.
  - **Modify Doctor**: Allows for loading and editing of existing doctor information from the database.
  - **Delete Doctor**: Facilitates the removal of doctor records with proper confirmations and error handling.
- **Homepage**: Contains direct links to the aforementioned features for easy navigation.

## Getting Started

To get started with this application:

1. Clone the repository to your local machine.
2. Ensure you have [Node.js](https://nodejs.org/) and [Angular CLI](https://angular.io/cli) installed.
3. Install the dependencies by running `npm install` in the project root.
4. Serve the application locally with `ng serve`. Navigate to `http://localhost:4200/` to view it in the browser.

## Usage

The application is straightforward to use:

- Navigate to the **homepage** to find links to all the functionalities.
- Use the **View Doctors** page to see all current doctor records.
- To **add** a new doctor, click the add button and fill in the form details.
- To **modify** a doctor, click the edit button next to their record, update the information in the form, and submit.
- To **delete** a doctor, use the delete button next to their record and confirm the action.

## Built With

- [Angular](https://angular.io/) - A platform for building mobile and desktop web applications.
- [Angular Material](https://material.angular.io/) - Material Design components for Angular.

## Resources

- The application guide is available on Moodle: [Web Application Tutorial](#).

## Contributing

Please read [CONTRIBUTING.md](#) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Your Name** - *Initial work* - [YourGithubProfile](#)

See also the list of [contributors](#) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](#) file for details.

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

