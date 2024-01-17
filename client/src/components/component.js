import React from 'react'

import Script from 'dangerous-html/react'

import './component.css'

const AppComponent = (props) => {
  return (
    <div className="app-component-container">
      <div className="app-component-container1">
        <div className="app-component-container2">
          <Script
            html={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crime Reporting DApp</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: rgba(0, 0, 0, 0); /* Transparent background */
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center; /* Center-align text */
        }

        h1 {
            color: white; /* Set heading color to white */
            font-size: 36px; /* Increased font size for heading */
            margin-bottom: 20px; /* Added margin to create distance */
        }

        button {
            background-color: #4caf50;
            color: white;
            border: none;
            padding: 20px 40px; /* Increased padding for the button */
            margin: 15px; /* Increased margin for the button */
            font-size: 20px; /* Increased font size for the button */
            cursor: pointer;
            border-radius: 5px;
        }

        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <h1>Crime Reporting DApp</h1>

    <!-- MetaMask Login -->
    <button onclick="loginWithMetaMask()">Login with MetaMask</button>

    <script src="https://cdn.jsdelivr.net/npm/web3@1.6.1/dist/web3.min.js"></script>
    <script>
        async function loginWithMetaMask() {
            if (typeof window.ethereum === 'undefined') {
                return alert('Please install MetaMask or use a Web3-enabled browser.');
            }

            try {
                // Requesting user accounts and other information from MetaMask
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Use the first account for simplicity in this example
                const userAddress = accounts[0];

                // Your contract interaction logic here, e.g., emit UserLoggedIn event
                // const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
                // await contract.methods.loginUser().send({ from: userAddress });

                console.log('User logged in successfully with MetaMask!');
                alert('User logged in successfully with MetaMask!');
            } catch (error) {
                console.error(error);
                alert('Error logging in with MetaMask. Please try again.');
            }
        }
    </script>
</body>
</html>
`}
          ></Script>
        </div>
      </div>
    </div>
  )
}

export default AppComponent
