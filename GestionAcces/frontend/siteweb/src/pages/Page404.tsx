import React from 'react';
import Page from '../pages/PageInterface';
import '../App.css';
import '../utils/styles.css';
import { Box, Divider, Grid, Paper, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export interface INotFound {

}

export default class NotFoundPage extends Page<INotFound>{

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {

    }

    render() {
        return <div className="App-header">
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={8}
                className="bar"
            >
                <div><img className={"logo"} src={require('../QUEBEC_blanc.png')}></img></div>
                <Stack className='center'>
                    <CircularProgress color="inherit" />
                </Stack>
            </Stack>
            <h1> 404 Page Introuvable! </h1>
        </div>
    }
}