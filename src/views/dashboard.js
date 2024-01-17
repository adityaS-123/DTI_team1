import React from 'react'

import { Helmet } from 'react-helmet'
import { useState,useEffect } from 'react'
import abi from "./contractJson/Report.json"
import {ethers} from "ethers"

import './dashboard.css'

const Dashboard = (props) => {
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

  const ReportCrime = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const Description = document.querySelector("#description").value;
    console.log(Description, contract);
    const transaction = await contract.ReportCrime(Description);
    await transaction.wait();
    console.log("Transaction is done");
  };

  const [report, setreport] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const reportsMessage = async () => {
      const memos = await contract.viewReports();
      setreport(memos);
    };
    contract && reportsMessage();
  }, [contract]);

  return (
    <div className="dashboard-container">
      <Helmet>
        <title>dashboard - BinaryShadows</title>
        <meta property="og:title" content="dashboard - BinaryShadows" />
      </Helmet>
      <div className="dashboard-container1">
        <div className="dashboard-container2">
          {/* Your existing HTML structure */}
          <header>
            <h1>Crime Reporting Dashboard</h1>
            {/* Add user information and logout button here */}
          </header>

          <nav>
            <a href="#incident-overview">Chat With Authority</a>
            <a href="#reported-incidents">Reported Incidents</a>
            <a href="#incident-map">Incident Map</a>
            <a href="#submit-report">Submit Report</a>
          </nav>

          <main>
            <section id="incident-overview">
              <h2>Chat With Authority</h2>
              
            </section>

            <section id="reported-incidents">
              <h2>Reported Incidents</h2>
              {report.map((memo) => {
        return (
          <div
            className="container-fluid"
            style={{ width: "100%" }}
            key={Math.random()}
          >
            <table
              style={{
                marginBottom: "10px",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "800px",
                    }}
                  >
                    {new Date(memo.timestamp * 1000).toLocaleString()}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                    }}
                  >
                    {memo.message}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "400px",
                    }}
                  >
                    {memo.from}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
            </section>

            <section id="incident-map">
              <h2>Incident Map</h2>
              {/* Add content for incident map */}
            </section>

            {/* Updated Submit Report section using React */}
            <section id="submit-report">
              <h2>Submit Report</h2>
              <form onSubmit={ReportCrime}>
                <label htmlFor="incident-type">Incident Type:</label>
                <input
                  type="text"
                  id="incident-type"
                  name="incident-type"
                  
                />

                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  
                />

                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  
                ></textarea>

                <button type="submit" disabled={!state.contract}>Submit Report</button>
              </form>
            </section>
          </main>

          <footer>
            <p>&copy; 2024 Crime Reporting DApp</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
