import * as Interface from "./interface";

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
  async companyOverview(symbol: string): Promise<Interface.CompanyOverview> {
    let res = await super.request(`function=OVERVIEW&symbol=${symbol}`);
    return await res.json();
  }

  async incomeStatement(symbol: string): Promise<Interface.CompanyOverview> {
    let res = await super.request(`function=INCOME_STATEMENT&symbol=${symbol}`);
    return await res.json();
  }
}

const symbol = "IBM";
let data = await new FundamentalClient().companyOverview(symbol);
console.log("Overview", data);
