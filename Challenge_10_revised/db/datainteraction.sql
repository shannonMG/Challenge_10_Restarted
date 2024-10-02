ALTER TABLE role RENAME COLUMN department TO department_id;

SELECT MAX(id) FROM employee;

SELECT setval(pg_get_serial_sequence('employee', 'id'), COALESCE(MAX(id), 0) + 1, false) FROM employee;

