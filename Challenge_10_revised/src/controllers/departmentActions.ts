//handles the logic department related functions//

/* Functions:
getDepartments() - DONE
viewAllDepartments() - DONE
addDepartment() - DONE
deleteDepartment() - DONE
viewEmployeesByDepartment() -DONE
viewDepartmentBudget() */ 

import { pool } from '../connection.js'

export const getDepartments = async () => {
    try {
        const result = await pool.query('SELECT id, name FROM departments');
        return result.rows; // Return the array of department objects
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error; // Handle the error appropriately
    }
};

export const viewAllDepartments = async () => {
    try {
        const result = await pool.query('SELECT * FROM departments');
        return result.rows;
    } catch(error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

export const addDepartment = async (name: string) => {
    try {
        const existingDepartment = await pool.query(
            'SELECT * FROM departments WHERE name = $1',
            [name]
        );

        if (existingDepartment.rows.length > 0) {
            console.log('Department already exists. Please use a different name.');
            return; 
        }

        // Insert new department if it doesn't exist
        await pool.query(
            'INSERT INTO departments (name) VALUES ($1)',
            [name]
        );
        console.log('Department added successfully');
    } catch (error) {
        console.error('Error adding departments:', error);
        throw error;
    }
};

export const deleteDepartment = async (name: string) => {
    try {
        await pool.query('DELETE FROM departments WHERE name = $1', [name]);
        console.log('Department deleted successfully');
    } catch (error) {
        console.error('Error deleting Department:', error);
        throw error;
    }
};

export const viewDepartmentBudget = async (departmentId: number) => {
    try {
        const result = await pool.query(
            `
            SELECT SUM(role.salary) AS total_budget 
            FROM employee 
            JOIN role ON employee.role_id = role.id
            WHERE role.department_id = $1
            `,
            [departmentId]
        );

        const totalBudget = result.rows[0]?.total_budget || 0; // Default to 0 if no employees found
        console.log(`Total budget for department ID ${departmentId}: $${totalBudget}`);
        return totalBudget;
    } catch (error) {
        console.error('Error retrieving department budget:', error);
        throw error; // Rethrow the error for further handling if needed
    }
};