import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const MessagePop = (pop, message, severity) => {
    const [open, setOpen] = React.useState(false);
    if (pop) {
        setOpen(true);
    }
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            '& > * + *': {
            marginTop: theme.spacing(2),
            },
        },
        }));
        
        
        const classes = useStyles();
        
        const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setOpen(false);
        };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {/* <Alert onClose={handleClose} severity={severity}> */}
            {message}
        {/* </Alert> */}
    </Snackbar>
  );
}

export default MessagePop;
