import * as T from "./types";

class AlphaClient {
  API_KEY = "JHHLXJ0VRUUA8U2E";
  BASE_URL = `https://www.alphavantage.co/query?apikey=${this.API_KEY}`;

  async request(
    query: string,
    method = "GET",
    headers = new Headers()
  ): Promise<any> {
    try {
      let req = new Request(`${this.BASE_URL}&${query}`, {
        method: method,
        headers: headers,
      });

      let res = await fetch(req);

      if (!res.ok) {
        throw new Error("Response not ok");
      }

      return res;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  }
}

export class FundamentalClient extends AlphaClient {
  async companyOverview(symbol: string): Promise<T.CompanyOverview> {
    let res = await super.request(`function=OVERVIEW&symbol=${symbol}`);
    return await res.json();
  }

  async incomeStatement(symbol: string): Promise<T.IncomeStatementReport> {
    let res = await super.request(`function=INCOME_STATEMENT&symbol=${symbol}`);
    return await res.json();
  }

  async balanceSheet(symbol: string): Promise<T.BalanceSheetReport> {
    let res = await super.request(`function=BALANCE_SHEET&symbol=${symbol}`);
    return await res.json();
  }

  async cashFlow(symbol: string): Promise<T.CashFlowReport> {
    let res = await super.request(`function=CASH_FLOW&symbol=${symbol}`);
    return await res.json();
  }

  async earnings(symbol: string): Promise<T.EarningsReport> {
    let res = await super.request(`function=EARNINGS&symbol=${symbol}`);
    return await res.json();
  }
}

const symbol = "IBM";
// let companyOverview = await new FundamentalClient().companyOverview(symbol);
// console.log("Company Overview", companyOverview);

// let incomeStatement = await new FundamentalClient().incomeStatement(symbol);
// console.log("Income Statement", incomeStatement);

// let balanceSheet = await new FundamentalClient().balanceSheet(symbol);
// console.log("Balance Statement", balanceSheet);

// let cashFlow = await new FundamentalClient().cashFlow(symbol);
// console.log("Cash Flow", cashFlow);

// let earnings = await new FundamentalClient().earnings(symbol);
// console.log("Earnings", earnings);
