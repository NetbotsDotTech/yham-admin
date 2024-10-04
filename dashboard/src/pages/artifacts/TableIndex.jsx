/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, IconButton, Menu, MenuItem, Button } from '@mui/material';
import { Visibility as VisibilityIcon, Edit as EditIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import ViewArtifactModal from './ViewArtifact';
import AddArtifact from './AddArtifact/AddArtifact';
import EditArtifact from './Edit/EditArtifact';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Example = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [modalOpen, setModalOpen] = useState({ type: '', open: false });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch data from the backend API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/artifacts', {
        withCredentials: true,  
      });
      setData(response.data.data); // Extract the actual data array
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  // Handle menu open and close
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);  // Set the current row with full row data
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle delete action with toast notifications
  const handleDelete = async () => {
    console.log("currentRow._id",currentRow._id)
    if (currentRow && currentRow._id) {  // Access the _id field directly
      try {
        await axios.delete(`http://localhost:5000/api/artifacts/${currentRow._id}`, {
          withCredentials: true,  
        });
        fetchData(); 
        handleClose(); 
        toast.success('Artifact deleted successfully!'); 
      } catch (error) {
        console.error('Error deleting artifact:', error);
        toast.error('Failed to delete artifact. Please try again.'); 
      }
    } else {
      toast.error('No artifact selected for deletion.'); 
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'action',
        header: 'Actions',
        enableEditing: false,
        size: 100,
        Cell: ({ row }) => (
          <IconButton onClick={(event) => handleClick(event, row.original)}>
            <MoreVertIcon />
          </IconButton>
        )
      },
      {
        accessorKey: '_id',  
        header: 'Id',
        enableEditing: false,
        size: 80
      },
      {
        accessorKey: 'name',
        header: 'Name'
      },
      {
        accessorKey: 'itemNo',
        header: 'Item No'
      },
      {
        accessorKey: 'serialNo',
        header: 'Serial No'
      },
      {
        accessorKey: 'description',
        header: 'Description'
      },
      {
        accessorKey: 'madeOf',
        header: 'Made Of'
      },
      {
        accessorKey: 'age',
        header: 'Age'
      },
      {
        accessorKey: 'shelfNo',
        header: 'Shelf No'
      },
      {
        accessorKey: 'hallNo',
        header: 'Hall No'
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, 
    state: { isLoading: loading } 
  });

  const handleView = () => {
    setModalOpen({ type: 'view', open: true });
    handleClose();
  };

  const handleEdit = () => {
    if (currentRow) {
      setEditModalOpen(true);
    } else {
      console.error('No row selected for editing');
    }
    handleClose();
  };

  const handleCloseModal = () => {
    setModalOpen({ type: '', open: false });
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleSaveEdit = async (updatedArtifact) => {
    try {
      await axios.put(`http://localhost:5000/api/artifacts/${updatedArtifact._id}`, updatedArtifact);  // Use _id for update
      fetchData(); 
      handleCloseEditModal();
    } catch (error) {
      console.error('Error saving edited artifact:', error);
    }
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
          Add New Artifact
        </Button>
      </Box>

      <MaterialReactTable table={table} />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleView}>
          <VisibilityIcon sx={{ marginRight: 1 }} />
          View
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ marginRight: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ marginRight: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* ViewArtifactModal to view details of the selected artifact */}
      <ViewArtifactModal open={modalOpen.open && modalOpen.type === 'view'} handleClose={handleCloseModal} artifact={currentRow} />

      {/* AddArtifactModal to add a new artifact */}
      <AddArtifact open={addModalOpen} handleClose={handleCloseAddModal} onSave={fetchData} />

      {/* EditArtifactModal to edit the selected artifact */}
      <EditArtifact open={editModalOpen} handleClose={handleCloseEditModal} artifact={currentRow} onSave={handleSaveEdit} />

      {/* Toast container for notifications */}
      <ToastContainer />
    </>
  );
};

export default Example;
