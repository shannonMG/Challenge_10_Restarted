import inquirer from 'inquirer';
import { viewAllRoles, addRole, deleteRole } from './controllers/roleActions.js'; 
import { getDepartments, viewAllDepartments, addDepartment, deleteDepartment, viewDepartmentBudget } from './controllers/departmentActions.js';
import { connectToDb } from './connection.js';  // Ensure you're connecting to the DB
import { addEmployee, viewAllEmployees, deleteEmployee, updateEmployeeRole, listEmployeesWithDetails } from './controllers/employeeActions.js';

// Function to handle the user's input
export const startCli = async () => {
    await connectToDb();

    while (true) {
        const departments = await getDepartments();
        const departmentChoices = departments.map(department => ({
            name: department.name,  
            value: department.id     
        }));

        const employees = await viewAllEmployees(); 
        const managerChoices = employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`, 
            value: employee.id 
        }));
      
        const role = await viewAllRoles();
        const roleChoices = role.map(role => ({
            name: role.title,
            value: role.id 
        }))

        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: [
                    'View All Employees', 
                    'Add Employee', 
                    'Update Employee Role', 
                    "Update Employee Manager",
                    'Delete Employee',
                    'View All Roles', 
                    'Add Role', 
                    'Delete Role', 
                    'View All Departments', 
                    'Add Department', 
                    'Delete Department', 
                    'View Department Budget',
                    'Exit'
                ]
            }
        ]);

        switch (answer.action) {
            case 'Add Role':
                const roleInfo = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Enter the role title:'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the role salary:',
                        validate: (input) => {
                            const num = parseFloat(input);
                            return !isNaN(num) && num > 0 || 'Please enter a valid salary.';
                        }
                    },
                    {
                        type: 'list', 
                        name: 'departmentId',
                        message: 'Select the department:',
                        choices: departmentChoices  
                    }
                ]);
                try {
                    await addRole(roleInfo.title, parseFloat(roleInfo.salary), parseInt(roleInfo.departmentId));
                    console.log('Role added successfully!'); // Success message
                } catch (error) {
                    console.error('Failed to add role:', error);
                }
                break;

            case 'View All Roles':
                try {
                    const allRoles = await viewAllRoles();
                    if (allRoles.length > 0) {
                        console.log('List of Roles:');
                        console.table(allRoles);
                    } else {
                        console.log('No roles found.');
                    }
                } catch (error) {
                    console.error('Failed to retrieve roles:', error);
                }
                break;
          
            case 'Delete Role':
                  try {
                      const allRoles = await viewAllRoles();
                      if (allRoles.length > 0) {
                          const roleChoices = allRoles.map(role => ({
                              name: `${role.title} (ID: ${role.id})`, // Display title and ID
                              value: role.id // Use ID for deletion
                          }));
  
                          const deleteAnswer = await inquirer.prompt([
                              {
                                  type: 'list',
                                  name: 'roleId',
                                  message: 'Select the role to delete:',
                                  choices: roleChoices
                              }
                          ]);
  
                          // Call deleteRole function
                          await deleteRole(deleteAnswer.roleId);
                      } else {
                          console.log('No roles found to delete.');
                      }
                  } catch (error) {
                      console.error('Failed to retrieve roles for deletion:', error);
                  }
                  break;    
 
            case 'Exit':
                console.log('Exiting the application.'); // Optional exit message
                return; // Exit the CLI loop

            case 'View All Employees':
                const allEmployees = await listEmployeesWithDetails();
                if (allEmployees.length > 0) {
                    console.log('List of Employees:');
                    console.table(allEmployees);
                } else {
                    console.log('No Employees found.');
                }
            break;
            
            case 'Add Employee':
              
              const EmployeeInfo = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "Enter employee's first name:",
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "Enter employee's last name:",
                },
                {
                    type: 'list', 
                    name: 'roleId',
                    message: "Select employee' role",
                    choices: roleChoices,
                },
                
                {
                    type: 'list',
                    name: 'managerId',
                    message: 'Select the employee manager:',
                    choices: managerChoices,
                    
                }
            ]);
            
              
            await addEmployee(EmployeeInfo.first_name, EmployeeInfo.last_name, EmployeeInfo.roleId, EmployeeInfo.managerId);
            break;
        
            case 'Delete Employee':
            //console.log('Reached Delete Employee case'); // Log for debugging

            const deleteAnswer = await inquirer.prompt([
            {
            type: 'list',
            name: 'employeeId', // Use employeeId for clarity
            message: 'Select the employee to delete:',
            choices: managerChoices, // Use managerChoices here
            }
            ]);

            const selectedEmployee = managerChoices.find(employee => employee.value === deleteAnswer.employeeId);
            if (selectedEmployee) {
            await deleteEmployee(selectedEmployee.name.split(' ')[0], selectedEmployee.name.split(' ')[1]); // Split the name to get first and last name
            } else {
            console.log('Employee not found.');
            }
            console.log('Employee deleted successfully!'); // Confirmation message
            break;
          
            case 'Update Employee Role':
              const updateInfo = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Select the employee to update:',
                    choices: managerChoices,
                },
                {
                    type: 'list',
                    name: 'newRoleId',
                    message: 'Select the new role:',
                    choices: roleChoices,
                }
            ]);
        
            // Call updateEmployeeRole function
            await updateEmployeeRole(updateInfo.employeeId, updateInfo.newRoleId);
            break;  
          
            case "Update Employee Manager":
              const updateManager = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Select the employee to update:',
                    choices: managerChoices,
                },
                {
                    type: 'list',
                    name: 'newManagerId',
                    message: 'Select the new manager:',
                    choices: managerChoices,
                }
            ]);
        
            // Call updateEmployeeRole function
            await updateEmployeeRole(updateManager.employeeId, updateManager.newManagerId);
            break;  

            case 'View All Departments':
            const allDepartments = await viewAllDepartments();
            if (allDepartments.length > 0) {
                console.log('List of Departments:');
                console.table(allDepartments);
            } else {
                console.log('No Departments found.');
            }
            break;

            case 'Add Department' :
            const departmentInfo = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter the department name:'
                },
                ]);
                await addDepartment(departmentInfo.name,);
                break;
                
            case 'Delete Department':
  
            const deleteResponse = await inquirer.prompt([
             {
                 type: 'list',
                 name: 'departmentId', // Use departmentId for clarity
                 message: 'Select the department to delete:',
                 choices: departmentChoices, 
             }
            ]);
                const selectedDepartment = departmentChoices.find(department => department.value === deleteResponse.departmentId);
                if (selectedDepartment) {
                await deleteDepartment(selectedDepartment.name); 
                console.log('Department deleted successfully!'); // Confirmation message
                } else {
                console.log('Department not found.');
                }
                break;
          
            case 'View Department Budget':
            const selectedDepartmentResponse = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'Select a department to view the budget:',
                    choices: departmentChoices,
                },
            ]);
            const budget = await viewDepartmentBudget(selectedDepartmentResponse.departmentId);
            console.log(`The total budget for the selected department is: $${budget}`);
            break;
        }
    }
};