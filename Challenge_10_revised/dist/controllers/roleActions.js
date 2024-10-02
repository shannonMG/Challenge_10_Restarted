//handles logic related to roles//
/* Functions:
viewAllRoles()
addRole()
deleteRole() */
import { pool } from '../connection.js';
export const viewAllRoles = async () => {
    try {
        const result = await pool.query('SELECT * FROM role');
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching role:', error);
        throw error;
    }
};
export const addRole = async (title, salary, departmentId) => {
    try {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
        console.log('Role added successfully');
    }
    catch (error) {
        console.error('Error adding role:', error);
        throw error;
    }
};
export const deleteRole = async (roleId) => {
    try {
        await pool.query('DELETE FROM role WHERE id = $1', [roleId]);
        console.log('Role deleted successfully');
    }
    catch (error) {
        console.error('Error deleting role:', error);
        throw error;
    }
};
