import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab'; 
import { signupUser } from '../../redux/actions/uiActions'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignUp = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const msg = useSelector(state=>state.ui.message,()=>{})
  const errors = useSelector(state=>state.ui.errors,()=>{})
  const [form, setForm] = useState({email: '', password: '', name: ''})

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value })
    if(form[event.target.name] !== '') errors[event.target.name] = null
  }
  
  const registerHandler = () => {
    dispatch(signupUser({...form}, history))  
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {msg ? 
        (<Alert variant="outlined" severity="warning" style={{marginTop: "2rem"}}>
          {msg}
        </Alert>) : null}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                label={errors.name?errors.name:"Name"}
                error={errors.name?true:false}
                autoFocus
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label={errors.email?errors.email:"Email Address"}
                error={errors.email?true:false}
                name="email"
                autoComplete="email"
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label={errors.password?errors.password:"Password"}
                error={errors.password?true:false}
                type="password"
                autoComplete="current-password"
                onChange={changeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={registerHandler}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}