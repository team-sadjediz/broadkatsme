import "./card-content.style.scss";
import { ReactComponent as Exit } from "../../assets/icons/times-solid.svg";
import React from 'react';
// import IconCross from './../Icons/IconCross';
// import './Content.scss';



import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

// const Content = ({ name, tags, thumbnailUrl, onClose }) => (
//   <div className="content">
//     <div className="content__background">
//       <div className="content__background__shadow" />
//       <div
//         className="content__background__image"
//         style={{ 'background-image': `url(${thumbnailUrl})` }}
//       />
//     </div>
//     <div className="content__area">
//       <div className="content__area__container">
//         <div className="content__title">{name}</div>
//         <div className="content__description">
//         </div>
//       </div>
//       <button className="content__close" > 
//         <Exit />
//       </button>
//     </div>
//   </div>
// );



const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Content = ({ name, tags, thumbnailUrl, show }) => {
  const [open, setOpen] = React.useState(show);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {name}
        </DialogTitle>
        
        <DialogContent dividers style={{ 'background-image': `url(${thumbnailUrl})`,'height': '450px', 'width' : '600px' }}>
          <div className="content">
            <div className="content__background">
            <div className="content__background__shadow" />
            <div
                className="content__background__image"
                style={{ 'background-image': `url(${thumbnailUrl})` }}
            />
            </div>
            <div className="content__area">
            <div className="content__area__container">
                <div className="content__title">{name}</div>
                <div className="content__description">
                </div>
            </div>
            </div>
        </div>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
          <div className="content">
            <div className="content__background">
            <div className="content__background__shadow" />
            <div
                className="content__background__image"
                style={{ 'background-image': `url(${thumbnailUrl})` }}
            />
            </div>
            <div className="content__area">
            <div className="content__area__container">
                <div className="content__title">{name}</div>
                <div className="content__description">
                </div>
            </div>
            </div>
        </div> */}
      </Dialog>
    </div>
  );
}
export default Content;