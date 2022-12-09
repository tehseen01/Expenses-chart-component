import "../SASS/index.scss";
import logo from "../assets/images/logo.svg";
import Chart from "./Chart";

const index = () => {
  return (
    <>
      <header>
        <h2>My balance</h2>
        <p>$921.48</p>
        <img src={logo} alt="" />
      </header>
      <main>
        <h1>Spending - Last 7 days</h1>
        <Chart />
        <hr />
        <div className="expenses">
          <h3>Total this month</h3>
          <span className="expense-amount">$478.33</span>

          <p>
            <span>+2.4%</span> from last month
          </p>
        </div>
      </main>
    </>
  );
};

export default index;
