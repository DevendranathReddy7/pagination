import React, { useEffect, useState } from "react";
import "./CurrencyConverter.css";
import DropDown from "./DropDown";

const CurrencyConverter = (props) => {
  const [currencies, setCurrencies] = useState();
  const [selectedCurrencies, setSelectedCurrencies] = useState({
    from: "AUD",
    to: "INR",
    convertedValue: "",
  });
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState(null);
  const [currencyError, setCurrencyError] = useState(null);

  useEffect(() => {
    const getCurrencies = async () => {
      const res = await fetch("https://api.frankfurter.app/currencies", {
        method: "GET",
      });
      const data = await res.json();
      setCurrencies(Object.keys(data));
    };
    getCurrencies();
  }, []);

  const convertHandler = async () => {
    if (selectedCurrencies.from === selectedCurrencies.to)
      return setCurrencyError(true);
    if (amount === 0) return setAmountError(true);
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${selectedCurrencies.from}&to=${selectedCurrencies.to}`,
      { method: "GET" }
    );
    const data = await res.json();
    console.log(data.rates);
    setSelectedCurrencies((prev) => ({ ...prev, convertedValue: data.rates }));
  };

  const amountHandler = (e) => {
    const amountValue = e.target.value;
    if (isNaN(amountValue)) return setAmountError(true);
    setAmount(parseInt(amountValue));
    setAmountError(false);
  };

  const swapHandler = () => {
    setSelectedCurrencies((prev) => ({
      ...prev,
      from: selectedCurrencies.to,
      to: selectedCurrencies.from,
      convertedValue: "",
    }));
  };

  const currencyHandler = (curency, type) => {
    setCurrencyError(false);
    switch (type) {
      case "from":
        setSelectedCurrencies((prev) => ({ ...prev, from: curency }));
        break;
      case "to":
        setSelectedCurrencies((prev) => ({ ...prev, to: curency }));
        break;
    }
  };

  return (
    <div className="wrapper">
      <h3 className="heading">Currency Converter</h3>
      <div className="dropdown__wrapper">
        <div className="drpdwnDiv">
          <label className="label">From</label>
          <DropDown
            curList={currencies}
            curType="from"
            selectedCur={currencyHandler}
            defaultCurrency={selectedCurrencies.from}
          />
        </div>
        <div onClick={swapHandler}>
          <p className="swap">🔄️</p>
        </div>
        <div className="drpdwnDiv">
          <label className="label">To</label>
          <DropDown
            curList={currencies}
            curType="to"
            selectedCur={currencyHandler}
            defaultCurrency={selectedCurrencies.to}
          />
        </div>
      </div>
      {currencyError && (
        <p className="errorPara">From & To currency can't be same</p>
      )}
      <div>
        <label className="label">Amount</label>
        <input className="input" onChange={amountHandler} />
        {amountError && <p className="errorPara">Please enter valid amount</p>}
      </div>
      <div className="convertDiv">
        <button
          className={amountError || currencyError ? "disabled" : "convert"}
          onClick={convertHandler}
          disabled={amountError || currencyError}
        >
          Convert
        </button>
        {selectedCurrencies.convertedValue !== "" && (
          <p className="curencyPara">
            Converted currency:{" "}
            {selectedCurrencies?.convertedValue[selectedCurrencies.to]}{" "}
            {selectedCurrencies.to}
          </p>
        )}
      </div>
    </div>
  );
};
export default CurrencyConverter;
