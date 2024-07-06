import React, { useState } from 'react';
import { departments } from '../data/departments';
import { Department } from '../models/Department';
import { Box, List, ListItem, ListItemText, Collapse, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const DepartmentsList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});

  const handleClick = (id: number) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        {departments.map((department) => (
          <div key={department.id}>
            <ListItem>
              <ListItemText primary={department.name} />
              <IconButton onClick={() => handleClick(department.id)}>
                {open[department.id] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            <Collapse in={open[department.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {department.subDepartments.map((subDept) => (
                  <ListItem key={subDept.id} sx={{ pl: 4 }}>
                    <ListItemText primary={subDept.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </Box>
  );
};

export default DepartmentsList;
