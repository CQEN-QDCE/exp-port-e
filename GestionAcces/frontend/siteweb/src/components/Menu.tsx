import React from 'react';
import logo from '../logo.svg';
import Page from '../pages/PageInterface';
import '../App.css';
import { Avatar, Box, Button, Divider, Grid, Paper, Stack } from '@mui/material';
import { url } from 'inspector';
import { Link } from 'react-router-dom';

export interface IMenu {

}

export default class Menu extends Page<IMenu>{
    render() {
        return <header className="App-header">
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={8}
                className=""
            >
                <div><Link to={'/'}><img className={"logo"} src={require('../QUEBEC_blanc.png')}></img></Link></div>
                <Button className='MenuButton white' href='/'> <h2 className='white'>accueil</h2></Button>
                <Button className='MenuButton white' href='/test'> <h2 className='white'>tests</h2></Button>
                <Button className='MenuButton white' href='/gestion'> <h2 className='white'>administration</h2> </Button>
                <Button name='ButtonMenuAvatar' href='/connexion' className='center' sx={{ fontSize: 40 }}><Avatar src="/broken-image.jpg" /></Button>
            </Stack>

        </header>
    }
}