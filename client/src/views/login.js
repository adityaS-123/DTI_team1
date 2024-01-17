import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'
import { useState,useEffect } from 'react'
import abi from "./contractJson/Report.json"
import {ethers} from "ethers"

import AppComponent from '../components/component'
import './login.css'

const Login = (props) => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xe02445AF352Fed47b69Cfbd50308b04177160c5D";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  console.log(state);
  return (
    <div className="login-container">
      <Helmet>
        <title>login - BinaryShadows</title>
        <meta property="og:title" content="login - BinaryShadows" />
      </Helmet>
      <Link to="/dashboard" className="login-navlink">
        <AppComponent className="login-component"></AppComponent>
      </Link>
    </div>
  )
}

export default Login
