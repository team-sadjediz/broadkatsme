import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// const MessagePop = (pop, message, severity) => {
//     const [open, setOpen] = React.useState(pop);
//     // const useStyles = makeStyles(theme => ({
//     //     root: {
//     //         width: '100%',
//     //         '& > * + *': {
//     //         marginTop: theme.spacing(2),
//     //         },
//     //     },
//     //     }));

//     //     const classes = useStyles();

//         const handleClose = (event, reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }

//         setOpen(false);
//         };

//   return (
//     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity={severity}>
//             {message}
//         </Alert>
//     </Snackbar>
//   );
// }

// export default MessagePop;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MessagePop(props) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(props.pop);
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };

  return (
    <div
      className={`${classes.root} ${props.className ? props.className : null} `}
    >
      <Snackbar open={props.pop} autoHideDuration={6000}>
        <Alert severity="success">{props.message}</Alert>
      </Snackbar>
    </div>
  );
}
