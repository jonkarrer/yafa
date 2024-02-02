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

  let company_overviews = await Promise.all(company_overview_reqs);
  console.log(company_overviews);

  return (
    <ol style={style}>
      {requested_company_symbols.map((item) => {
        return <li>{item}</li>;
      })}
    </ol>
  );
}

const style = {
  background: "red",
};
