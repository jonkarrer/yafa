import { Setup } from "../../domain/types";

class RiverClient {
  API_KEY = Bun.env.ALPHA_VANTAGE_API_KEY;
  BASE_URL = `http://0.0.0.0:3000`;

  async request(
    path: String,
    method = "GET",
    headers = new Headers(),
    body: any = ""
  ): Promise<Response> {
    try {
      let req = new Request(`${this.BASE_URL}${path}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });

      let res = await fetch(req);

      if (!res.ok) {
        throw new Error("Response not ok");
      }

      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export class SetupClient extends RiverClient {
  async turtle_soup_single(symbol: String) {
    let res = await super.request(`/setup/turtle_soup/${symbol}`, "GET");
    return await res.json();
  }

  async turtle_soup_multi(symbols: Array<String>): Promise<Array<Setup>> {
    let h = new Headers({
      "Content-Type": "application/json",
    });

    let b = {
      symbols: symbols,
    };

    let res = await super.request("/setup/turtle_soup_multi", "POST", h, b);

    if (res.status != 200) {
      return [];
    }

    return await res.json();
  }

  async mean_reversion_multi(symbols: Array<String>): Promise<Array<Setup>> {
    let h = new Headers({
      "Content-Type": "application/json",
    });

    let b = {
      symbols: symbols,
    };

    let res = await super.request("/setup/mean_reversion_multi", "POST", h, b);

    if (res.status != 200) {
      return [];
    }

    return await res.json();
  }

  async mean_reversion_single(symbol: String) {
    let res = await super.request(`/setup/mean_reversion/${symbol}`, "GET");
    return await res.json();
  }
}
