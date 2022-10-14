import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import styles from './appmodal.module.scss';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: '100% !important'
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    width: '100% !important'
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AppModal(props) {
  const { title='Modal title' } = props;

  return (
    <>
     
      <BootstrapDialog
        onClose={props.close}
        open={props.show}
        className={styles.modal_box}
        sx={{
          maxWidth: '100%',
        }}
        aria-labelledby="customized-dialog-title">
        <BootstrapDialogTitle
        sx={{
          maxWidth: '100%',
        }}
          id="customized-dialog-title"
          onClose={props.close}>
          {title}
        </BootstrapDialogTitle>
          <DialogContent dividers>
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: '60vw',
            }}
          >

            
             {props.children}

             
          </Box>
          </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.close}> Close </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
