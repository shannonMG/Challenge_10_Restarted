//handles logic for adding employee and updating employee//
/* Functions:
viewAllEmployees()  - DONE
addEmployee() - DONE
updateEmployeeRole() - DONE
deleteEmployee()- DONE
updateEmployeeManger() - DONE */
import { pool } from '../connection.js';
export const viewAllEmployees = async () => {
    try {
        const result = await pool.query('SELECT * FROM employee');
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};
export const addEmployee = async (first_name, last_name, roleId, managerId) => {
    try {
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, roleId, managerId]);
        console.log('Employee added successfully');
    }
    catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
};
export const deleteEmployee = async (first_name, last_name) => {
    try {
        await pool.query('DELETE FROM employee WHERE first_name = $1 AND last_name = $2', [first_name, last_name]);
        console.log('Employee deleted successfully');
    }
    catch (error) {
        console.error('Error deleting Employee:', error);
        throw error;
    }
};
export const updateEmployeeRole = async (employeeId, newRoleId) => {
    try {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
        console.log('Employee role updated successfully');
    }
    catch (error) {
        console.error('Error updating employee role:', error);
        throw error; // Rethrow the error for handling
    }
};
export const updateEmployeeManager = async (employeeId, newManagerId) => {
    try {
        await pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [newManagerId, employeeId]);
        console.log('Employee manager updated successfully');
    }
    catch (error) {
        console.error('Error updating employee manager:', error);
        throw error;
    }
};
export const listEmployeesWithDetails = async () => {
    try {
        const result = await pool.query(`
            SELECT 
                employee.id, 
                employee.first_name, 
                employee.last_name, 
                role.title, 
                departments.name AS department,  -- Select department name
                role.salary, 
                (SELECT CONCAT(m.first_name, ' ', m.last_name) 
                 FROM employee m 
                 WHERE m.id = employee.manager_id) AS manager
            FROM 
                employee 
            JOIN 
                role ON employee.role_id = role.id
            JOIN 
                departments ON role.department_id = departments.id;  -- Join with the departments table
            `);
        return result.rows; // Returns the list of employees with detailed information
    }
    catch (error) {
        console.error('Error retrieving employee details:', error);
        throw error; // Rethrow the error for further handling if needed
    }
};
