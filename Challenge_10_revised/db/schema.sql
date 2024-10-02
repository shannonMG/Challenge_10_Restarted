--This file will set up our three data tables--
DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

\c employeeTracker_db;

--department table--
CREATE TABLE departments(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
--role table--
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department
        FOREIGN KEY(department_id)
        REFERENCES departments(id)
);
--employee table--

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    CONSTRAINT fk_role
        FOREIGN KEY(role_id)
        REFERENCES role(id),
    CONSTRAINT fk_manager
        FOREIGN KEY (manager_id)
        REFERENCES employee(id)
);
