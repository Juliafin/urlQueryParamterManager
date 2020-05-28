import React from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmationDialog = (props) => {

  const {open, handleCloseOnCancel, handleCloseOnConfirm } = props;

  return (
    <div>
      <Dialog open={open} onClose={handleCloseOnCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Configurations</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to proceed? Clicking OK will permanently delete all configurations!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOnCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCloseOnConfirm} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationDialog;