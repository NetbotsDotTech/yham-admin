import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, IconButton, Menu, MenuItem, Button } from '@mui/material';
import { Visibility as VisibilityIcon, Edit as EditIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import ViewStockModal from './ViewAllStock'; // Create this component
import AddStockModal from './AddStock'; // Create this component
import EditStockModal from './UpdateStock'; // Create this component

const StockRegistry = () => {
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
      const response = await axios.get('http://localhost:5000/api/stock'); // Update API endpoint as needed
      console.log('response', response.data); // Assuming response.data is an array of stock registry items
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
    setCurrentRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Define columns for the stock registry table
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
        accessorKey: 'shelfNo',
        header: 'Shelf No'
      },
      {
        accessorKey: 'shelfDetails',
        header: 'Shelf Details'
      },
      {
        accessorKey: 'artifactTypes',
        header: 'Artifact Types'
      },
      {
        accessorKey: 'numberOfArtifacts',
        header: 'Number of Artifacts'
      },
      {
        accessorKey: 'shelfPhoto',
        header: 'Shelf Photo',
        Cell: ({ cell }) => <img src={cell.getValue()} alt="Shelf" style={{ width: '100px', height: 'auto' }} />
      }
    ],
    []
  );

  // Define table instance
  const table = useMaterialReactTable({
    columns,
    data, // Use the fetched data
    state: { isLoading: loading } // Display loading indicator while fetching data
  });

  // Handle view, edit, delete actions
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

  const handleDelete = async () => {
    if (currentRow && currentRow.id) {
      try {
        await axios.delete(`http://localhost:5000/api/stock/${currentRow.id}`); // Update API endpoint as needed
        fetchData(); // Refresh the data after deletion
        handleClose();
      } catch (error) {
        console.error('Error deleting stock registry item:', error);
      }
    }
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

  // Save edited stock item
  const handleSaveEdit = async (updatedStock) => {
    try {
      await axios.put(`http://localhost:5000/api/stock/${updatedStock.id}`, updatedStock); // Update API endpoint as needed
      fetchData(); // Refresh the data after editing
      handleCloseEditModal();
    } catch (error) {
      console.error('Error saving edited stock item:', error);
    }
  };

  return (
    <>
      {/* Button to add a new stock item */}
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
          Add New Stock Item
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

      {/* ViewStockModal to view details of the selected stock item */}
      <ViewStockModal open={modalOpen.open && modalOpen.type === 'view'} handleClose={handleCloseModal} stock={currentRow} />

      {/* AddStockModal to add a new stock item */}
      <AddStockModal open={addModalOpen} handleClose={handleCloseAddModal} onSave={fetchData} />

      {/* EditStockModal to edit the selected stock item */}
      <EditStockModal open={editModalOpen} handleClose={handleCloseEditModal} stock={currentRow} onSave={handleSaveEdit} />
    </>
  );
};

export default StockRegistry;
