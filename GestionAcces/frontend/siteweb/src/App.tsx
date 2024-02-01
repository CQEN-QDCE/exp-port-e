import { LinearProgress, Stack } from '@mui/material';
import Keycloak from 'keycloak-js';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { JsxElement } from 'typescript';
import { keycloakConfig } from './api/KeycloakConst';
import './App.css';
import Loading from './components/Loading';
import Menu from './components/Menu';
import Connexion from './pages/Connexion';
import NotFoundPage from './pages/Page404';
import Page404 from './pages/Page404';
import Page from './pages/PageInterface';

export interface IApp {
  c: any;
}

const kc = new Keycloak(keycloakConfig);
class App extends Page<IApp> {
  constructor(props: any) {
    super(props);
    this.state = {
      c: <></>,
    };
  }

  async openKeycloack() {
    try {
      const res = await kc.init({
        onLoad: 'login-required',
        checkLoginIframe: false
      });
      if (!res) {
        await kc.login();
      }
    }
    catch (e) {
      console.error("error ");
    }

  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {

  }

  componentDidMount(): void {
    if (!kc.authenticated) {
      this.openKeycloack();
    }
  }

  render() {
    /*let component;
    switch (window.location.pathname) {
      case "/":
        component = <Loading></Loading>
        break;
      default:
        component = <NotFoundPage />
        break;
    }
    */
    return (
      <div className='fullHeight'>
        <Menu></Menu>
        <LinearProgress color="inherit" sx={{ color: "#095797", width: '100%' }} className='littleBar' />
        <div className='App-body'>

          <Routes>
            <Route path="/" element={<Loading />}></Route>
            <Route path="/gestion" element={<Loading />} />
            <Route path="/connexion" element={<Connexion />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

      </div>
    )
  }          //{component}
}

export default App;
