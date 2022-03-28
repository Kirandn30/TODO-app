import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./signup.css"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { auth } from "../../config/config"
import { useNavigate } from "react-router-dom"
import { useUserAuth } from "../../context/UserauthContext"


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '} TODO APP {new Date().getFullYear()} {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Signup() {

    let [email, setEmail] = useState<any>("")
    let [password, setPassword] = useState<any>("")
    let [err, setErr] = useState<string | unknown>("")
    let [confirm, setConfirm] = useState<any>("")

    const navigate = useNavigate();

    const context = useUserAuth();
    if (!context) {
        return null;
    }

    const { SignUp } = context;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        if (password !== confirm) { setErr("Please make sure your passwords match.") }

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setEmail(data.get('email'))
        setPassword(data.get('password'))
        setConfirm(data.get("confirm password"))
        setErr("")
        try {
            await SignUp(email, password)
            navigate('/login');
        }
        catch (error) {
            if (err instanceof Error) {
                console.log(error)
                return setErr(error)

            }
        }




        // createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         const user = userCredential.user.email;
        //         console.log(user);
        //         navigate('/login');

        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         setErr(errorCode)

        //     });




    };



    return (
        <div className="signup">
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirm password"
                                        label="Confirm Password"
                                        type="confirm password"
                                        id="confirm password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            {/* <span style={{ color: "red", fontSize: "0.8rem" }}>{err}</span> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </div>
    );
}