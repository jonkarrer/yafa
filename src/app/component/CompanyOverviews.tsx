import { FundamentalClient } from "../clients/alpha_client";
import { CompanyOverview } from "../../domain/types";

function CompanyCard({ overview }: { overview: CompanyOverview }): JSX.Element {
  const container = {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    width: "250px",
    borderRadius: "10px",
    margin: "10px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  };

  const symbol = {
    borderBottom: "1px black solid",
    paddingBottom: "4px",
  };

  return (
    <div style={container}>
      <h3 style={symbol}>{overview.Symbol}</h3>
      <p>EPS: {overview.EPS}</p>
      <p>P/E Ratio: {overview.PERatio}</p>
      <p>P/B Ratio: {overview.PriceToBookRatio}</p>
      <p>P/D Ratio: {overview.DividendPerShare}</p>
    </div>
  );
}

export default async function () {
  let requested_company_symbols: Array<string> = [
    "SO",
    "IBM",
    "BTU",
    "MRO",
    "AAPL",
    "AMZ",
    "NFLX",
    "NVDA",
  ];

  let company_overview_reqs: Array<Promise<CompanyOverview>> =
    requested_company_symbols.map((item) =>
      new FundamentalClient().companyOverview(item)
    );

  let company_overviews: Array<CompanyOverview> = await Promise.all(
    company_overview_reqs
  );

  const style = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: "center",
    maxWidth: "800px",
    margin: "auto",
  };

  return (
    <section style={style}>
      {company_overviews.map((item) => {
        return <CompanyCard overview={item} />;
      })}
    </section>
  );
}
