import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import up from "./assets/Group 17.png";
import down from "./assets/Group -1.png";
import money from "./assets/Group -2.png";
import performance from "./assets/Group -3.png";
import deco from "./assets/Mask Group 2.png";

function App() {
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [query, setQuery] = useState("");
  const [databefore, setDataBefore] = useState(null);
  const [largest, setLargest] = useState(0);
  const [largestcurrecy, setLargestCurrency] = useState("");
  const [smallest, setSmallest] = useState(Infinity);
  const [smallestcurrecy, setSmallestCurrency] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://v2.overwatchs.com/api/spread-group-symbols-price/RUBY-Premium"
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(event) {
    setQuery(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setQuery(event.target.value);
  }

  const getProfile = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://reqres.in/api/users/2`,
        withCredentials: false,
      });
      console.log(response.data);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    const interval = setInterval(() => {
      getData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="arrangementblock">
        <div className="block">
          <div className="innerblock">
            <div className="blockword">
              <p>
                Total Traffic
                <br />
                123,456
              </p>
            </div>
            <img src={up} alt="up" className="blockimage"></img>
          </div>
        </div>
        <div className="block">
          <div className="innerblock">
            <div className="blockword">
              <p>
                New Users <br /> 2,345
              </p>
            </div>
            <img src={down} alt="down" className="blockimage"></img>
          </div>
        </div>
        <div className="block">
          <div className="innerblock">
            <div className="blockword">
              <p>
                Sales <br /> 924
              </p>
            </div>
            <img src={money} alt="money" className="blockimage2"></img>
          </div>
        </div>
        <div className="block">
          <div className="innerblock">
            <div className="blockword">
              <p>
                Performance <br /> 48.65%
              </p>
            </div>
            <img
              src={performance}
              alt="performance"
              className="blockimage"
            ></img>
          </div>
        </div>
      </div>
      <div className="arrangementblock2">
        <div className="fdblock">
          <img src={deco} alt="deco" className="decopic"></img>
          {profile ? (
            <div className="innerfdblock">
              <img
                src={profile.data.avatar}
                alt="Avatar"
                className="profilepic"
              ></img>
              <br />
              <p style={{ fontSize: 20 }}>
                {profile.data.first_name} {profile.data.last_name}
              </p>
              <p style={{ fontSize: 10, marginTop: -20 }}>
                {profile.data.email}
              </p>
            </div>
          ) : null}
          <div className="buttoncover">
            <button className="firstbutton">
              <p className="connectbutton">Connect</p>
            </button>
            <button className="secondbutton">
              <p className="messagebutton">Message</p>
            </button>
          </div>
        </div>
        <div className="sdblock">
          <div className="sdupperblock">
            <p className="sdupperblocktext">Instrument</p>
            <form
              onSubmit={handleSubmit}
              style={{ marginLeft: 150, marginTop: 15 }}
            >
              <input
                type="text"
                placeholder="Search by Currency Name"
                value={query}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="sdbottomblock">
            <table className="table">
              <tr>
                <th className="thstyle">Name</th>
                <th className="thstyle">Sell</th>
                <th className="thstyle">Buy</th>
                <th className="thstyle">Changes</th>
              </tr>
              {data &&
                data
                  .filter((results) =>
                    results.Symbol.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((results) => {
                    return (
                      <tr key={results.Symbol}>
                        <td>{results.Symbol}</td>
                        <td>{results.Bid}</td>
                        <td>{results.Ask}</td>
                        <td>{results.Spread}</td>
                      </tr>
                    );
                  })}
            </table>
          </div>
          {/* <div className="sdbottomblock">
            <table>
              <tr>
                <th>Symbol</th>
                <th>Sell</th>
                <th>Buy</th>
                {/* <th>DailyChange</th> */}
          {/* <th>Spread</th> */}
          {/* <th>Changes</th>
              </tr>
              {databefore != null &&
                data &&
                data
                  .filter((results) =>
                    results.Symbol.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((results) => {
                    databefore &&
                      databefore.map((results2) => (
                        <tr key={results2.Symbol}>
                          <td>{results.Symbol}</td>
                          <td
                            style={
                              results.Ask > results2.Ask
                                ? { color: "green" }
                                : { color: "red" }
                            }
                          >
                            {results.Bid}
                          </td>
                          <td
                            style={
                              results.Ask > results2.Ask
                                ? { color: "green" }
                                : { color: "red" }
                            }
                          >
                            {results.Ask}
                          </td>
                          <td
                            style={
                              results.Ask > results2.Ask
                                ? { color: "green" }
                                : { color: "red" }
                            }
                          >
                            {((results.Ask - results2.Ask) / results2.Ask) *
                              100}
                          </td>
                        </tr>
                      ));
                  })}
            </table> */}
          {/* </div> */}
        </div>
        <div className="tdblock">
          <div className="innertdblock">
            <p className="spread">Spread Table</p>
            {data &&
              data.map((item, index) => {
                return (
                  <div key={index}>
                    {item.Spread > largest ? setLargest(item.Spread) : null}
                    {item.Spread > largest
                      ? setLargestCurrency(item.Symbol)
                      : null}
                    {item.Spread < smallest ? setSmallest(item.Spread) : null}
                    {item.Spread < smallest
                      ? setSmallestCurrency(item.Symbol)
                      : null}
                  </div>
                );
              })}
            <p className="title">The highest spread currency pair.</p>
            <p className="text">
              {largestcurrecy}={largest}
            </p>
            <p className="title">The lowest spread currency pair.</p>
            <p className="text">
              {smallestcurrecy}={smallest}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
