import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserauthContext';
import { Alert } from '@mui/material';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '} TODO APP {new Date().getFullYear()} {'.'}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export function Login() {

    let [email, setEmail] = React.useState<any>("")
    let [password, setPassword] = useState<any>("")
    let [err, setErr] = useState<string>("")

    const navigate = useNavigate();

    const context = useUserAuth();
    if (!context) {
        return null;
    }

    const { LogIn } = context;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setEmail(data.get('email'))
        setPassword(data.get('password'))
        setErr("")
        try {
            await LogIn(email, password)
            navigate("/profile")

        }
        catch (error: any) {
            setErr(error.message)

        }
    };

    return (
        <div className="login">
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {err && <Alert severity="error">{err}</Alert>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Log In
                            </Button>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </div>
    );
}