import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { Navigate, useNavigate } from "react-router-dom";
const Instapay = () => {
  const navigate = useNavigate();
  const [user] = useState({ name: "Yousef Sheha" });
  const [balance, setBalance] = useState(
    localStorage.getItem("balance") || 5000
  );
  const [balanceIndex, setBalanceIndex] = useState(false);
  const amountInput = useRef();
  const [transaction, setTransaction] = useState(
    JSON.parse(localStorage.getItem("transaction")) || []
  );
  const [transactionIndex, showTransactionIndex] = useState(false);

  const toggle = () => {
    //    setBalanceIndex(!balanceIndex)
    balanceIndex ? setBalanceIndex(false) : setBalanceIndex(true);
  };

  const depositAmount = () => {
    let amount = +amountInput.current.value;
    let newBalance = balance + amount;
    let time = moment().format("YYYY-MM-DD , hh:mm:ss A");
    let newTransaction = {
      beforeBalance: balance,
      amount: amount,
      afterBalance: newBalance,
      type: "deposit",
      date: time,
    };
    let copy = [...transaction, newTransaction]; // = copy.push(newTransaction)
    localStorage.setItem("balance", newBalance);
    localStorage.setItem("transaction", JSON.stringify(copy));
    setTransaction(copy);
    setBalance(newBalance);

    amountInput.current.value = "";
  };
  const withdrawAmount = () => {
    let amount = +amountInput.current.value;
    if (balance >= amount) {
      let newBalance = balance - amount;

      let time = moment().format("YYYY-MM-DD , hh:mm:ss A");
      let newTransaction = {
        beforeBalance: balance,
        amount: amount,
        afterBalance: newBalance,
        type: "withdraw",
        date: time,
      };
      let copy = [...transaction, newTransaction]; // = copy.push(newTransaction)
      localStorage.setItem("balance", newBalance);
      localStorage.setItem("transaction", JSON.stringify(copy));
      setTransaction(copy);
      setBalance(newBalance);
      amountInput.current.value = "";
    } else {
      alert("ركز مش هينفع يعم");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hasLogged") ||
      sessionStorage.removeItem("hasLogged");
    navigate("/login");
  };

  useEffect(() => {
    let hasLogged =
      sessionStorage.getItem("hasLogged") || localStorage.getItem("hasLogged");
    if (hasLogged !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="h-dvh w-full flex justify-center overflow-auto bg-gray-900 text-white">
      <div className="container flex flex-col gap-3 p-4">
        <h1>Welcome , {user.name}</h1>
        <button onClick={handleLogout} className="btn btn-error">
          Log Out
        </button>
        <p>balance : {balanceIndex ? balance : "****"}</p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="btn btn-neutral"
            onClick={() => showTransactionIndex(true)}
          >
            show transactions
          </button>
          <button
            className={!balanceIndex ? "btn btn-primary" : "btn btn-warning"}
            onClick={toggle}
          >
            {balanceIndex ? "Hide Balance" : "Show Balance"}
          </button>
          {balanceIndex && (
            <div className="w-full flex gap-4">
              <input
                ref={amountInput}
                className="input"
                placeholder="Enter Amount"
              />
              <button className="btn btn-error" onClick={depositAmount}>
                deposit
              </button>
              <button className="btn btn-success" onClick={withdrawAmount}>
                withdraw
              </button>
            </div>
          )}

          {transactionIndex &&
            (transaction.length == 0 ? (
              <div className="w-full text-center text-red-500 text-2xl">
                there are no transactions yet
              </div>
            ) : (
              <table className="table mt-5">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Before Balance</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>After Balance</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transaction.map((el, index) => {
                    return (
                      <tr
                        key={index}
                        className={
                          el.type == "withdraw" ? "bg-red-500" : "bg-green-500"
                        }
                      >
                        <td>{index + 1}</td>
                        <td>{el.beforeBalance}</td>
                        <td>{el.amount}</td>
                        <td>{el.type}</td>
                        <td>{el.afterBalance}</td>
                        <td>{el.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Instapay;
