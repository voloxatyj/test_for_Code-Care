import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DIALOG } from '../../redux/types'
import { addEvent } from '../../redux/actions/dataActions'
import useCalendar from '../../hooks/useCalendar'
import { useHistory } from 'react-router-dom';
import moment from 'moment'
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {	
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Event = () => {
	const classes = useStyles();
	const { selectedDate } = useCalendar()
	const date = moment(selectedDate).format('YYYY-MM-DD')
	const history = useHistory()
	const openDialog = useSelector(state => state.ui.openDialog,()=>{})
	const id = useSelector(state => state.data.user.id,()=>{})
	const dispatch = useDispatch()
	const [form, setForm] = useState({title: '', start: '', duration: ''})

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value })
    // if(form[event.target.name] !== '') errors[event.target.name] = null
	}

	const sendFormData = () => {
    dispatch(addEvent({...form, date, id}, history))
  }
	
  return (
    <>
      <Dialog fullScreen open={openDialog} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
						<IconButton
						 edge="start" 
						 color="inherit" 
						 aria-label="close"
						 onClick={()=>dispatch({type: CLOSE_DIALOG})}
						 >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Event
            </Typography>
            <Button autoFocus color="inherit" onClick={sendFormData}>
              SAVE
            </Button>
          </Toolbar>
        </AppBar>
					<form className={classes.form} noValidate style={{marginTop: '5rem'}}>
						<Grid container spacing={4} direction="column" justify="center" alignItems="center">
							<Grid item xs={12}>
								<TextField
									name="title"
									variant="outlined"
									required
									fullWidth
									type="text"
									placeholder="Title"
									// label={errors.name?errors.name:"Name"}
									// error={errors.name?true:false}
									autoFocus
									onChange={changeHandler}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									name="start"
									variant="outlined"
									required
									fullWidth
									type="text"
									placeholder="type like this 08:00"
									// label={errors.name?errors.name:"Name"}
									// error={errors.name?true:false}
									autoFocus
									onChange={changeHandler}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									name="duration"
									variant="outlined"
									required
									fullWidth
									type="number"
									placeholder="how much min you need"
									// label={errors.name?errors.name:"Name"}
									// error={errors.name?true:false}
									autoFocus
									onChange={changeHandler}
								/>
							</Grid>
						</Grid>
					</form>
      </Dialog>
    </>
  );
}
