import { Department } from '../models/Department';

export const departments: Department[] = [
  {
    id: 1,
    name: 'Engineering',
    subDepartments: [
      { id: 1, name: 'Platform' },
      { id: 2, name: 'Infrastructure' }
    ]
  },
  {
    id: 2,
    name: 'Human Resources',
    subDepartments: [
      { id: 3, name: 'Recruitment' },
      { id: 4, name: 'Employee Relations' }
    ]
  }
  // Add other departments as needed
];
