/* eslint-disable prettier/prettier */
import { useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, IconButton, Menu, MenuItem, Button } from '@mui/material';
import { Visibility as VisibilityIcon, Edit as EditIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import ViewArtifactModal from './ViewArtifact';
import AddArtifact from './AddArtifact/AddArtifact'; // Ensure this import is correct
import EditArtifact from './Edit/EditArtifact'; // Ensure this import is correct

// Sample data for the table
const data = [
  {
    name: 'Ancient Pottery Vase',
    itemNo: 'GB-001',
    serialNo: 'SN-001',
    description: 'An ancient pottery vase from the 2nd century, discovered in the Hunza Valley.',
    madeOf: 'Clay',
    particulars: {
      width: 15,
      depth: 20,
      circumference: 50,
      diameters: 25,
      weight: 2.5
    },
    age: '2000 years',
    shelfNo: 'S-01',
    hallNo: 'H-01',
    audio: '../../../public/audio.m4a',
    images: ['../../../public/img1.png', '../../../public/img2.png', '../../../public/img3.png'],
    qrCode: '../../../public/qrcode.png'
  }
];

const Example = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [modalOpen, setModalOpen] = useState({ type: '', open: false });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Handle menu open and close
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'action',
        header: 'Actions',
        enableEditing: false,
        size: 100,
        // Custom cell renderer for actions column
        Cell: ({ row }) => (
          <IconButton onClick={(event) => handleClick(event, row.original)}>
            <MoreVertIcon />
          </IconButton>
        )
      },
      {
        accessorKey: 'id',
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

  // Define table instance
  const table = useMaterialReactTable({
    columns,
    data // Ensure data is memoized or stable
  });

  // Handle view, edit, delete actions
  const handleView = () => {
    setModalOpen({ type: 'view', open: true });
    handleClose();
  };

  const handleEdit = () => {
    // Handle edit action
    handleClose();
  };

  const handleDelete = () => {
    alert('Deleting:', currentRow);
    handleClose();
  };

  const handleCloseModal = () => {
    setModalOpen({ type: '', open: false });
  };

  // Handle opening and closing the AddArtifactModal
  const handleOpenAddModal = () => {
    console.log('handleOpenAddModal Function Trgiggered');
    setAddModalOpen(true);
    console.log(addModalOpen);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  return (
    <>
      {/* Button to add a new artifact */}
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
      <AddArtifact open={addModalOpen} handleClose={handleCloseAddModal} />
            {/* EditArtifactModal to edit the selected artifact */}
            <EditArtifact open={editModalOpen} handleClose={handleCloseEditModal} artifact={currentRow} onSave={handleSaveEdit} />

    </>
  );
};

export default Example;
