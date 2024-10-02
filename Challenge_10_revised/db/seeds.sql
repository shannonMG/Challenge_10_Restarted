--This file will contain intial data for database tables--

INSERT INTO departments (name)
VALUES ('Human Resources'),
       ('Information Technology');

INSERT INTO role (title, salary, department)
VALUES ('Director', 80000.00, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Shannon', 'MG', 1, 1),
      