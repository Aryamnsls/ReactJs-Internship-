import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Post } from './models/Post';
import { Department } from './models/Department';

const departmentData: Department[] = [
  {
    id: 1,
    name: "Agriculture & Fishing",
    subDepartments: [
      { id: 1, name: "Agriculture" },
      { id: 2, name: "Crops" },
      { id: 3, name: "Farming Animals & Livestock" },
      { id: 4, name: "Fishery & Aquaculture" },
      { id: 5, name: "Ranching" },
    ],
  },
  {
    id: 2,
    name: "Business Services",
    subDepartments: [
      { id: 6, name: "Accounting & Accounting Services" },
      { id: 7, name: "Auctions" },
      { id: 8, name: "Business Services - General" },
      { id: 9, name: "Call Centers & Business Centers" },
      { id: 10, name: "Career Planning" },
      { id: 11, name: "Career" },
      { id: 12, name: "Commercial Printing" },
      { id: 13, name: "Debt Collection" },
    ],
  },
];

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      alert('You must enter your details before accessing this page.');
      navigate('/');
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Post[] = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, height: '90vh', width: '100%' }}>
      <Typography variant="h4" gutterBottom>Posts</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <DataGrid rows={posts} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
      )}
      <DepartmentList departments={departmentData} />
    </Box>
  );
};

const DepartmentList: React.FC<{ departments: Department[] }> = ({ departments }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Box sx={{ mt: 4, width: '80%' }}>
      {departments.map(department => (
        <Box key={department.id} sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            onClick={() => handleExpand(department.id)}
          >
            {department.name}
            {expanded === department.id ? '-' : '+'}
          </Typography>
          {expanded === department.id && (
            <Box sx={{ ml: 4 }}>
              {department.subDepartments.map(sub => (
                <Typography key={sub.id} variant="body1">
                  {sub.name}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SecondPage;
