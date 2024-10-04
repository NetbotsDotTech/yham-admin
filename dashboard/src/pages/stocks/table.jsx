/* eslint-disable prettier/prettier */
import React, { useState, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Edit, Delete, MoreVert as MoreVertIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

// Mock Data
const stockData = [
  { shelfNo: 'A1', hallNo: '1', numberOfArtifacts: 10, shelfImage: 'shelf_image_url_1.jpg' },
  { shelfNo: 'A2', hallNo: '2', numberOfArtifacts: 5, shelfImage: 'shelf_image_url_2.jpg' },
  { shelfNo: 'B1', hallNo: '3', numberOfArtifacts: 7, shelfImage: 'shelf_image_url_3.jpg' },
];

const StocksView = () => {
  const [anchorEl, setAnchorEl] = useState(null); // For action menu
  const [currentRow, setCurrentRow] = useState(null); // Store the selected row data
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // To control the edit modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // To control the add modal
  const [formData, setFormData] = useState({}); // For storing form data for edit
  const [previewImage, setPreviewImage] = useState(null); // For viewing image lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); // Control image lightbox

  // Handle click of three dots menu
  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row.original);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle Add Stock
  const handleAddClick = () => {
    setFormData({}); // Clear form data
    setIsAddModalOpen(true);
  };

  // Handle Edit Stock
  const handleEditClick = () => {
    setFormData(currentRow); // Set form data for the modal
    setIsEditModalOpen(true);
    handleMenuClose();
  };

  // Handle Delete Stock
  const handleDeleteClick = () => {
    alert('Deleting stock for ' + currentRow.shelfNo);
    handleMenuClose();
  };

  // Handle View Stock
  const handleViewClick = () => {
    setPreviewImage(currentRow.shelfImage); // Set image for lightbox
    setIsLightboxOpen(true); // Open the lightbox
    handleMenuClose();
  };

  // Handle close of the Modals
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  // Handle form change
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleFormSubmit = () => {
    alert('Updated stock for ' + formData.shelfNo);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  // Dropzone for file input
  const onDrop = (acceptedFiles) => {
    setFormData({
      ...formData,
      shelfImage: URL.createObjectURL(acceptedFiles[0]),
    });
  };
  
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const columns = useMemo(() => [
    {
      accessorKey: 'action',
      header: 'Actions',
      size: 50,
      Cell: ({ row }) => (
        <IconButton onClick={(event) => handleMenuClick(event, row)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
    {
      accessorKey: 'shelfNo',
      header: 'Shelf No',
      size: 150,
    },
    {
      accessorKey: 'hallNo',
      header: 'Hall No',
      size: 150,
    },
    {
      accessorKey: 'numberOfArtifacts',
      header: 'Number of Artifacts',
      size: 200,
    },
    {
      accessorKey: 'shelfImage',
      header: 'Shelf Image',
      size: 200,
      Cell: ({ cell }) => (
        <img
          alt="shelf"
          height={50}
          src={cell.getValue()}
          loading="lazy"
          style={{ borderRadius: '8px' }}
        />
      ),
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data: stockData,
    enableRowSelection: false, // Disable row selection (hide checkboxes)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
  });

  return (
    <>
      {/* Add Stock Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <Button onClick={handleAddClick} variant="contained" color="primary">
          Add New Stock
        </Button>
      </Box>

      <MaterialReactTable table={table} />

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>
          <Edit fontSize="small" /> Edit Stock
        </MenuItem>
        <MenuItem onClick={handleViewClick}>
          <ViewIcon fontSize="small" /> View Stock
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <Delete fontSize="small" /> Delete Stock
        </MenuItem>
      </Menu>

      {/* Edit Stock Modal */}
      <Dialog open={isEditModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>Edit Stock</DialogTitle>
        <DialogContent>
          <TextField
            label="Shelf No"
            name="shelfNo"
            value={formData.shelfNo || ''}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Hall No"
            name="hallNo"
            value={formData.hallNo || ''}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Number of Artifacts"
            name="numberOfArtifacts"
            value={formData.numberOfArtifacts || ''}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <Box {...getRootProps()} sx={{ border: '1px dashed gray', padding: 2, textAlign: 'center', mt: 2 }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a new image here, or click to select one</p>
            {formData.shelfImage && (
              <img src={formData.shelfImage} alt="Preview" height={100} />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditModalClose}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Stock Modal */}
      <Dialog open={isAddModalOpen} onClose={handleAddModalClose}>
        <DialogTitle>Add New Stock</DialogTitle>
        <DialogContent>
          <TextField
            label="Shelf No"
            name="shelfNo"
            value={formData.shelfNo || ''}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Hall No"
            name="hallNo"
            value={formData.hallNo || ''}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Number of Artifacts"
            name="numberOfArtifacts"
            value={formData.numberOfArtifacts || ''}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <Box {...getRootProps()} sx={{ border: '1px dashed gray', padding: 2, textAlign: 'center', mt: 2 }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop an image here, or click to select one</p>
            {formData.shelfImage && (
              <img src={formData.shelfImage} alt="Preview" height={100} />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddModalClose}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Image Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          mainSrc={previewImage}
          onCloseRequest={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
};

// Date Picker Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const AdvancedTableView = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <StocksView />
  </LocalizationProvider>
);

export default AdvancedTableView;
