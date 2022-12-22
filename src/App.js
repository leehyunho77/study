import logo from "./logo.svg";
import "./App.css";
import { memo, useEffect, useState } from "react";
import Button from "./Button";

const MemorizedBtn = memo(Button);

function App() {
  const [loading, setLodaing] = useState(true);
  const [coins, setCoins] = useState([]);
  const [input, setInput] = useState(1);
  const [cost, setCost] = useState(1);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLodaing(false);
      });
  }, []);

  const onChange = (event) => {
    setInput(event.target.value);
  };

  const seletOnCange = (event) => {
    setCost(event.target.value);
  };

  return (
    <div className="App">
      <h1>the coinse! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        "loading..."
      ) : (
        <select onChange={seletOnCange}>
          {coins?.map((coin) => (
            <option value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}

      <br />
      <input value={input} onChange={onChange} />
      <h1>개수 {input / cost}</h1>
    </div>
  );
}

export default App;
