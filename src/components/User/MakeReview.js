import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit() {
      const uid=document.getElementById("uid").value
      const title=document.getElementById("title").value
      const message=document.getElementById("message").value
      const review_score=rating
      var params = window.location.search
      params = new URLSearchParams(params)
      const tid = params.get('id')

      const pathname = 'http://localhost:3000/user/toilet/info'
      const data = {
          "uid": uid,
          "tid": tid,
          "review_score": review_score,
          "title": title,
          "body": message
      }
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    setOpen(false)
    return fetch(pathname, options)
    .then(data => data.json())
  }

  const handleReview = (e) => {
    setRating(e.target.value)
  }

  return (
    <div>
      <Button style={{marginTop:'10px'}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Make a Review
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Publish a Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter details and choose a review score below .
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="uid"
            label="Display Name"
            defaultValue={Object.values(sessionStorage.getItem("usertoken")[9])==1 ? JSON.parse(sessionStorage.getItem("usertoken")).username : ""}
            type="uid"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="title"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            type="message"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
          />
        <br/>
        <Rating onChange={handleReview} name="rating" style={{ marginTop:'10px', left:'210px'}}
        name="customized-color"
        defaultValue={0}
        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
        precision={0.1}
        // icon={<FavoriteIcon fontSize="inherit" />}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
