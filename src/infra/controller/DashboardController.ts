import { SetupClient } from "../../app/clients/river_client";
import Dashboard from "../../app/component/Dashboard";
import { Setup } from "../../domain/types";
import { ENERGY_SECTOR, FINANCE_SECTOR } from "../../domain/watchlists";

export default class HomeController {
  static async invoke(): Promise<JSX.Element> {
    let setups = await HomeController.get_setups();
    let props = { setups: setups };

    return Dashboard(props);
  }

  static async get_setups(): Promise<Array<Setup>> {
    let setup_client = new SetupClient();

    return await setup_client.turtle_soup_multi(FINANCE_SECTOR);
  }
}
