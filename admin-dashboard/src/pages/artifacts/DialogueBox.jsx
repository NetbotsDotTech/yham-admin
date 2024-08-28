import { MRT_EditActionButtons } from 'material-react-table';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Typography } from '@mui/material';

// Dialog for creating a new user
export function UserCreateDialog({ table, row, internalEditComponents }) {
  return (
    <>
      <DialogTitle variant="h3">Create New User</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>{internalEditComponents}</DialogContent>
      <DialogActions>
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </DialogActions>
    </>
  );
}

// Dialog for editing a user
export function UserEditDialog({ table, row, internalEditComponents }) {
  return (
    <>
      <DialogTitle variant="h3">Edit User</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>{internalEditComponents}</DialogContent>
      <DialogActions>
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </DialogActions>
    </>
  );
}

// Modal for displaying user details
export function UserDetailsModal({ user, onClose }) {
  return (
    <Dialog open={!!user} onClose={onClose}>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>{/* Display user details here */}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function ArtifactDetailsModal({ artifact, onClose }) {
  return (
    <Dialog open={!!artifact} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Artifact Details</DialogTitle>
      <DialogContent>
        {artifact && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Display basic artifact details */}
            <Typography variant="h6">Name: {artifact.name}</Typography>
            <Typography variant="body1">Item No: {artifact.itemNo}</Typography>
            <Typography variant="body1">Serial No: {artifact.serialNo}</Typography>
            <Typography variant="body1">Description: {artifact.description}</Typography>
            <Typography variant="body1">Made Of: {artifact.madeOf}</Typography>
            <Typography variant="body1">Age: {artifact.age}</Typography>
            <Typography variant="body1">Shelf No: {artifact.shelfNo}</Typography>
            <Typography variant="body1">Hall No: {artifact.hallNo}</Typography>

            {/* Display audio if available */}
            {artifact.audio && (
              <Box>
                <Typography variant="h6">Audio:</Typography>
                <audio controls>
                  <source src={artifact.audio} type="audio/mp4" />
                  Your browser does not support the audio element.
                </audio>
              </Box>
            )}

            {/* Display images if available */}
            {artifact.images && artifact.images.length > 0 && (
              <Box>
                <Typography variant="h6">Images:</Typography>
                <Box sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {artifact.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Artifact Image ${index}`}
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Display QR Code if available */}
            {artifact.qrCode && (
              <Box>
                <Typography variant="h6">QR Code:</Typography>
                <img src={artifact.qrCode} alt="QR Code" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
