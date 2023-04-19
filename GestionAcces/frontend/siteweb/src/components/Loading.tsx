import React from 'react';
import logo from '../logo.svg';
import Page from '../pages/PageInterface';
import '../App.css';
import '../utils/styles.css';
import { Box, Divider, Grid, Paper, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export interface ILoad {

}

export default class Chargement extends Page<ILoad>{

    render() {
        return <Box component={'span'} sx={{ justifyContent: 'center' }} className='App-error'>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={5}
                className="center"
            >
                <Stack className='center title'>
                    <CircularProgress color="inherit" />
                </Stack>
                <h1 className='center title'> Une erreur est survenue! </h1>
            </Stack>

        </Box>
    }
}