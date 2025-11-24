import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const Instapay = () => {
  const navigate = useNavigate();
  const [user] = useState({ name: "Yousef Sheha" });
  const [balance, setBalance] = useState(localStorage.getItem("balance") || 0);
  const [balanceIndex, setBalanceIndex] = useState(false);
  const amountInput = useRef();
  const [transaction, setTransaction] = useState(
    JSON.parse(localStorage.getItem("transaction")) || []
  );
  const [transactionIndex, showTransactionIndex] = useState(false);

  const toggle = () => {
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
    let copy = [...transaction, newTransaction];
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
      let copy = [...transaction, newTransaction];
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
    <div className="min-h-screen w-full bg-gray-900 text-white flex justify-center py-8 px-4">
      <div className="max-w-4xl w-full flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:font-extrabold">Welcome, {user.name}</h1>
          <button
            onClick={handleLogout}
            className="btn btn-error hover:bg-red-500 transition"
          >
            Log Out
          </button>
        </div>

        <div className="text-xl font-semibold">
          Balance:
          <span className="ml-2 text-green-400">
            {balanceIndex ? balance : "****"}
          </span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <button
            className="btn btn-neutral"
            onClick={() => showTransactionIndex(true)}
          >
            Show Transactions
          </button>
          <button
            className={
              !balanceIndex ? "btn btn-primary" : "btn btn-warning"
            }
            onClick={toggle}
          >
            {balanceIndex ? "Hide Balance" : "Show Balance"}
          </button>
          {balanceIndex && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full max-w-md">
              <input
                ref={amountInput}
                className="input w-full sm:w-auto"
                placeholder="Enter Amount"
                type="number"
                min="0"
              />
              <button
                className="btn btn-success mt-2 sm:mt-0"
                onClick={depositAmount}
              >
                Deposit
              </button>
              <button
                className="btn btn-error mt-2 sm:mt-0"
                onClick={withdrawAmount}
              >
                Withdraw
              </button>
            </div>
          )}
        </div>

        {transactionIndex && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Transactions</h2>
            {transaction.length === 0 ? (
              <div className="w-full text-center text-red-500 text-xl font-semibold">
                There are no transactions yet.
              </div>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="table w-full text-sm">
                  <thead>
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Before Balance</th>
                      <th className="p-2">Amount</th>
                      <th className="p-2">Type</th>
                      <th className="p-2">After Balance</th>
                      <th className="p-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.map((el, index) => (
                      <tr
                        key={index}
                        className={
                          el.type === "withdraw"
                            ? "bg-red-600 text-white"
                            : "bg-green-600 text-white"
                        }
                      >
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{el.beforeBalance}</td>
                        <td className="p-2">{el.amount}</td>
                        <td className="p-2 capitalize">{el.type}</td>
                        <td className="p-2">{el.afterBalance}</td>
                        <td className="p-2">{el.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Instapay;
