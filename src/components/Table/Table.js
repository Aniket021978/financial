const Table = function (props) {
  // this is js built in currency formatter
  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <table className="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>

      <tbody>
        {props.calculatedData.map((yearData) => {
          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>
                {currencyFormatter.format(yearData.savingsEndOfYear) + "/-"}
              </td>
              <td>
                {currencyFormatter.format(yearData.yearlyInterest) + "/-"}
              </td>
              <td>
                {currencyFormatter.format(
                  yearData.savingsEndOfYear -
                    props.initialInvestment -
                    yearData.yearlyContribution * yearData.year
                ) + "/-"}
              </td>
              <td>
                {currencyFormatter.format(
                  props.initialInvestment +
                    yearData.yearlyContribution * yearData.year
                ) + "/-"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
