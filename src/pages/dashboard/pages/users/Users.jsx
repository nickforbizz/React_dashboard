import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Modal,
  Typography,
} from '@mui/material';
import React from 'react';
import Appbreadcrumb from '../../../../components/breadcrumb/Appbreadcrumb';
import Datatable from '../../../../components/datatable/Datatable';
import Appform from '../../../../components/formcomponents/Appform';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 12,
  p: 4,
};

function Users() {
  const breadcrumbs = [
    <Link href="/admin/" key="1" underline="hover">
      Dashboard
    </Link>,

    <Typography key="2" color="text.primary">
      Users
    </Typography>,
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="page_header">
        <Typography variant={'h5'} component={'h5'} className="pagetitle">
          Users Page
        </Typography>
        <Appbreadcrumb breadcrumbs={breadcrumbs} />
      </div>

      <Divider light sx={{ mb: 2 }} className="divider" />

      <Grid container>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            sx={{ borderRadius: 28 }}
            onClick={handleOpen}
          >
            Add User <Add fontSize="small" />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Appform/>

          <Datatable />
        </Grid>

        <Grid item xs={12}>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </>
  );
}

export default Users;
