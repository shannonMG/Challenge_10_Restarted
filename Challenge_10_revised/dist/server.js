import express from 'express';
import dotenv from 'dotenv';
import { connectToDb } from './connection.js';
import { viewAllRoles, addRole, deleteRole } from './controllers/roleActions.js';
import { startCli } from './index.js';
dotenv.config();
const app = express();
// Middleware for parsing JSON bodies
app.use(express.json());
const startServer = async () => {
    try {
        // Connect to the database
        await connectToDb();
        // Route to view all roles
        app.get('/roles', async (_req, res) => {
            try {
                const roles = await viewAllRoles();
                res.json(roles);
            }
            catch (error) {
                res.status(500).json({ error: 'Error fetching roles' });
            }
        });
        // Route to add a new role
        app.post('/roles', async (req, res) => {
            const { title, salary, departmentId } = req.body;
            try {
                await addRole(title, salary, departmentId);
                res.status(201).json({ message: 'Role added successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error adding role' });
            }
        });
        // Route to delete a role
        app.delete('/roles/:id', async (req, res) => {
            const { id } = req.params;
            try {
                await deleteRole(parseInt(id));
                res.status(200).json({ message: 'Role deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error deleting role' });
            }
        });
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            startCli(); // Call the CLI function after the server starts
        });
    }
    catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1); // Exit if there's an error
    }
};
startServer();
