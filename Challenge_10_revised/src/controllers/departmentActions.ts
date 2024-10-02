//handles the logic department related functions//

/* Functions:
getDepartments()
viewAllDepartments()
addDepartment()
deleteDepartment()
viewEmployeesByDepartment()
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

