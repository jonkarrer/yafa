import { FundamentalClient } from "./app/alpha_client";
import { CompanyOverview } from "./domain/types";

export default async function Home(query = ""): Promise<JSX.Element> {
  let requested_company_symbols: Array<string> = [];

  if (query.length > 0) {
    requested_company_symbols = query.split(",");
  }

  let company_overview_reqs: Array<Promise<CompanyOverview>> =
    requested_company_symbols.map((item) =>
      new FundamentalClient().companyOverview(item)
    );

  let company_overviews: Array<CompanyOverview> = await Promise.all(
    company_overview_reqs
  );
  console.log(company_overviews);

  return (
    <ol style={style}>
      {company_overviews.map((item) => {
        return (
          <li>
            <h3>{item.Symbol}</h3>
            <p>EPS: {item.EPS}</p>
            <p>P/E Ratio: {item.PERatio}</p>
            <p>P/B Ratio: {item.PriceToBookRatio}</p>
            <p>P/D Ratio: {item.DividendPerShare}</p>
          </li>
        );
      })}
    </ol>
  );
}

const style = {
  background: "wheat",
};

// http://localhost:3000/?companies=TSLA,IBM,SO
