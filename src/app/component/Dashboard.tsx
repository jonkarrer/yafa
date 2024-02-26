import { Setup } from "../../domain/types";
import CompanyOverviews from "./CompanyOverviews";
import Setups from "./Setups";

export default function ({ setups }: { setups: Array<Setup> }) {
  return (
    <main>
      <CompanyOverviews />
      <Setups setups={setups} />
    </main>
  );
}
