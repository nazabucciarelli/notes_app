import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}>
        <DialogTitle>
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.yesNoButtons ?
            <>
              <Button onClick={handleClose}>NO</Button>
              <Button onClick={props.handleYes} autoFocus>
                YES
              </Button>
            </> :
            <>
              <Button onClick={handleClose}>Ok</Button>
            </>}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}