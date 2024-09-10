
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, CircularProgress, Snackbar, Alert, Typography } from '@mui/material';
import { SearchNormal } from 'iconsax-react';

const QRCodeDownloader = () => {
  const [shelfNo, setShelfNo] = useState('');
  const [hallNo, setHallNo] = useState('');
  const [itemNo, setItemNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const handleDownload = async () => {
    setLoading(true);
    setError('');
    setPdfUrl(''); // Reset previous PDF URL
  
    try {
      const response = await axios.get('/api/qr-code', {
        params: { shelfNo, hallNo, itemNo },
      });
  
      console.log('PDF URL:', response);
      if (response.status === 200 && response.data.pdfUrl) {
        setPdfUrl(response.data.pdfUrl);
      } else {
        setError('No artifacts found.');
      }
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to fetch QR codes. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleCloseSnackbar = () => {
    setError('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '2rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            width: '100%',
            marginBottom: '1rem',
          }}
        >
          <TextField
            fullWidth
            label="Shelf No"
            value={shelfNo}
            onChange={(e) => setShelfNo(e.target.value)}
            variant="outlined"
            placeholder="Enter shelf number"
          />
          <TextField
            fullWidth
            label="Hall No"
            value={hallNo}
            onChange={(e) => setHallNo(e.target.value)}
            variant="outlined"
            placeholder="Enter hall number"
          />
          <TextField
            fullWidth
            label="Item No"
            value={itemNo}
            onChange={(e) => setItemNo(e.target.value)}
            variant="outlined"
            placeholder="Enter item number"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
          }}
        >
          <Button variant="contained" color="primary" onClick={handleDownload} disabled={loading}>
            <SearchNormal size="24" />
          </Button>
          {loading && (
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                textAlign: 'center',
                backgroundColor: '#f0f0f0',
                padding: '1rem 0',
              }}
            >
              <CircularProgress size={32} />
              <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
                Fetching QR Code PDF...
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Render the PDF in an iframe if available */}
      {pdfUrl && (
        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            height: '600px',
            marginTop: '2rem',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
          }}
        >
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            title="QR Code PDF"
            style={{ border: 'none' }}
          />
        </Box>
      )}

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QRCodeDownloader;





// /* eslint-disable prettier/prettier */
// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Box, CircularProgress, Snackbar, Alert, Typography } from '@mui/material';
// import { SearchNormal } from 'iconsax-react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';

// const PDF_WORKER_URL = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

// const QRCodeDownloader = () => {
//   const [shelfNo, setShelfNo] = useState('');
//   const [hallNo, setHallNo] = useState('');
//   const [itemNo, setItemNo] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [pdfUrl, setPdfUrl] = useState();

//   const handleDownload = async () => {
//     setLoading(true);
//     setError('');
//     setPdfUrl(''); // Reset previous PDF URL

//     try {
//       const response = await axios.get('/api/qr-code', {
//         params: { shelfNo, hallNo, itemNo },
//       });

//       console.log('PDF URL:', response.data);
//       if (response.status === 200 && response.data.pdfUrl) {
//         setPdfUrl(response.data.pdfUrl);
       
//       } else {
//         setError('No artifacts found.');
//       }
//     } catch (err) {
//       console.error('Download error:', err);
//       setError('Failed to fetch QR codes. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setError('');
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100vh',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: '2rem',
//         backgroundColor: '#f0f0f0',
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           width: '100%',
//           maxWidth: '600px',
//           marginBottom: '2rem',
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             gap: '1rem',
//             width: '100%',
//             marginBottom: '1rem',
//           }}
//         >
//           <TextField
//             fullWidth
//             label="Shelf No"
//             value={shelfNo}
//             onChange={(e) => setShelfNo(e.target.value)}
//             variant="outlined"
//             placeholder="Enter shelf number"
//           />
//           <TextField
//             fullWidth
//             label="Hall No"
//             value={hallNo}
//             onChange={(e) => setHallNo(e.target.value)}
//             variant="outlined"
//             placeholder="Enter hall number"
//           />
//           <TextField
//             fullWidth
//             label="Item No"
//             value={itemNo}
//             onChange={(e) => setItemNo(e.target.value)}
//             variant="outlined"
//             placeholder="Enter item number"
//           />
//         </Box>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '100%',
//             position: 'relative',
//           }}
//         >
//           <Button variant="contained" color="primary" onClick={handleDownload} disabled={loading}>
//             <SearchNormal size="24" />
//           </Button>
//           {loading && (
//             <Box
//               sx={{
//                 position: 'absolute',
//                 width: '100%',
//                 left: 0,
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 textAlign: 'center',
//                 backgroundColor: '#f0f0f0',
//                 padding: '1rem 0',
//               }}
//             >
//               <CircularProgress size={32} />
//               <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
//                 Fetching QR Code PDF...
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </Box>

//       {/* Render the PDF if available */}
//       {pdfUrl && (
//         <Box
//           sx={{
//             width: '100%',
//             maxWidth: '600px',
//             height: '600px',
//             marginTop: '2rem',
//             border: '1px solid #ddd',
//             backgroundColor: '#fff',
//           }}
//         >
//           <Worker workerUrl={PDF_WORKER_URL}>
//             <Viewer fileUrl={pdfUrl} />
//           </Worker>
//         </Box>
//       )}

//       <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
//           {error}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default QRCodeDownloader;
