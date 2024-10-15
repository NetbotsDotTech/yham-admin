/* eslint-disable prettier/prettier */
import React, { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  IconButton,
  Tooltip,
  Button,
  Modal,
  Box,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import AddBookModal from './UploadForm';
import ViewBookModal from './viewModal';
import 'react-toastify/dist/ReactToastify.css';
import  BASE_URL  from '../baseUrl';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [viewBook, setViewBook] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch books from API on load
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/book/`); // Change this to your API URL
      setBooks(response.data.books); // Adjusted to match response structure
    } catch (error) {
      toast.error('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle book deletion
  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`${BASE_URL}/api/book/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId)); // Use `_id` for deletion
      toast.success('Book deleted successfully!');
    } catch (error) {
      toast.error('Error deleting book');
    }
  };

  // Open the view modal
  const handleView = (book) => {
    setViewBook(book);
  };

  // Close the view modal
  const handleCloseViewModal = () => {
    setViewBook(null);
  };

  // Open the add book modal
  const handleAddBook = () => {
    setOpenAddModal(true);
  };

  // Close the add book modal
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    fetchBooks(); // Refresh the book list after adding
  };

  // Memoized columns
  const columns = useMemo(() => [
    {
      accessorKey: 'actions',
      header: 'Actions',
      size: 100,
      Cell: ({ row }) => (
        <div>
          <Tooltip title="View">
            <IconButton
              color="primary"
              onClick={() => handleView(row.original)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="secondary"
              onClick={() => handleDelete(row.original._id)} // Use `_id` for deletion
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      accessorKey: 'title',
      header: 'Title',
      size: 150,
    },
    {
      accessorKey: 'author',
      header: 'Author',
      size: 150,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      size: 150,
    },
    {
      accessorKey: 'year',
      header: 'Year',
      size: 100,
    }
  ], [books]);

  const table = useMaterialReactTable({
    columns,
    data: books,
  });

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '1rem' }}
        onClick={handleAddBook}
        startIcon={<AddIcon />}
      >
        Add Book
      </Button>

      {/* Material React Table */}
      <MaterialReactTable table={table} />

      {/* Modals for Add and View */}
      <AddBookModal open={openAddModal} onClose={handleCloseAddModal} />
      <ViewBookModal open={!!viewBook} book={viewBook} onClose={handleCloseViewModal} />

      {/* Toast Container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BookTable;