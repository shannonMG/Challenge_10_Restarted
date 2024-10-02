//handle logic related to managers//

/* Functions:
viewEmployeesByManager() */


import { pool } from '../connection.js'

export const viewEmployeesByManager = async () => {
    try {
        const result = await pool.query('SELECT * FROM employee'); // Retrieve all employees
        const allEmployees = result.rows;

        // Group employees by manager
        const employeesByManager: { [key: string]: { managerName: string, employees: any[] } } = {};

        allEmployees.forEach(employee => {
            const managerId = employee.manager_id;

            // Initialize the manager's entry if it doesn't exist
            if (!employeesByManager[managerId]) {
                employeesByManager[managerId] = {
                    managerName: managerId ? `${employee.first_name} ${employee.last_name}` : 'No Manager', // Get manager's full name or 'No Manager'
                    employees: []
                };
            }

            // Add employee to their manager's list
            employeesByManager[managerId].employees.push({
                id: employee.id,
                name: `${employee.first_name} ${employee.last_name}`
            });
        });

        return employeesByManager; // Return the grouped data
    } catch (error) {
        console.error('Error fetching employees by manager:', error);
        throw error; // Rethrow the error for handling
    }
};