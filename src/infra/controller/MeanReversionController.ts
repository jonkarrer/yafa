import { SetupClient } from "../../app/clients/river_client";
import Setups from "../../app/component/Setups";
import { Setup } from "../../domain/types";
import { get_all_unique_stock_symbols } from "../../domain/watchlists";

export default class MeanReversionController {
  static async invoke(): Promise<JSX.Element> {
    let setups =
      await MeanReversionController.get_setups_for_multiple_symbols();
    let props = { setups: setups, title: "Mean Reversion" };

    return Setups(props);
  }

  static async get_setups_for_multiple_symbols(): Promise<Array<Setup>> {
    let setup_client = new SetupClient();
    return await setup_client.mean_reversion_multi(
      get_all_unique_stock_symbols()
    );
  }
}
