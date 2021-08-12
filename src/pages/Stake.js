import React from 'react';
// import '../css/stake.css'
import Layout from "../Layout/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider} from '@material-ui/styles';
import {createTheme} from "@material-ui/core";
import {createStore} from "redux";
import reducer from "../redux/reducer";
import { UseWalletProvider } from 'use-wallet'
import {Provider} from "react-redux";
import rpcInfo from '../Info/rpc.json';

const store = createStore(reducer);

function Stake() {

    function getThemeType() {
        return createTheme({
            palette: {
                type: "light",
                background: {
                    default: '#ffffff',
                },
            },
        });
    }

    return (
        <div id="stake">
        <Provider store={store} >
            <ThemeProvider theme={getThemeType()}>
                <UseWalletProvider
                    chainId={rpcInfo.mainnet.chainId}
                    connectors={{
                      walletconnect: { rpcUrl: rpcInfo.mainnet.rpc },
                    }}
                >
                    <CssBaseline/>
                    <Layout/>
                </UseWalletProvider>
            </ThemeProvider>
        </Provider>
        </div>
    );
}

export default Stake;
