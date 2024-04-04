import { SetupClient } from "../clients/river_client";
import Setups from "../../web/component/Setups";
import { Setup } from "../../domain/types";
import { get_all_unique_stock_symbols } from "../../domain/watchlists";

export default class TurtleSoupController {
  static async invoke(): Promise<JSX.Element> {
    let setups = await TurtleSoupController.get_setups_for_multiple_symbols();
    let props = { setups: setups, title: "Turtle Soup" };

    return Setups(props);
  }

  static async get_setups_for_multiple_symbols(): Promise<Array<Setup>> {
    let setup_client = new SetupClient();
    return await setup_client.turtle_soup_multi(get_all_unique_stock_symbols());
  }
}
