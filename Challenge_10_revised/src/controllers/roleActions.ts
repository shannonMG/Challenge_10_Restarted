//handles logic related to roles//
/* Functions:
viewAllRoles() - DONE
addRole() - DONE
deleteRole() - DONE */

import { pool } from '../connection.js'


export const viewAllRoles = async () => {
    try {
        const result = await pool.query(
            `
            SELECT 
                role.id, 
                role.title, 
                role.salary, 
                departments.name AS department  -- Select department name instead of ID
            FROM 
                role 
            JOIN 
                departments ON role.department_id = departments.id;  -- Join with the departments table
            `
        );
        return result.rows; // Returns the list of roles with department names
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};
 
export const addRole = async(title: string, salary: number, departmentId: number) => {
    try{
        await pool.query(
            'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
            [title, salary, departmentId]
        );
        console.log('Role added successfully');
    } catch (error) {
        console.error('Error adding role:', error);
        throw error;
    }
};


export const deleteRole = async (roleId: number) => {
    try {
        await pool.query('DELETE FROM role WHERE id = $1', [roleId]);
        console.log('Role deleted successfully');
    } catch (error) {
        console.error('Error deleting role:', error);
        throw error;
    }
};


