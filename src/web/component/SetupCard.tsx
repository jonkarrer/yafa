import { Setup } from "../../domain/types";
import ArrowDiagUp from "../asset/icons/arrow-diag-up";

export default function ({ setup }: { setup: Setup }) {
  return (
    <div class="card relative p-2">
      <div class="flex items-center justify-between border-b-4 border-p80">
        <h2 class="text-g70 text-2xl font-bold">{setup.symbol}</h2>
        <h4 class="text-g70 text-lg">{setup.recent_price}</h4>
      </div>

      <h2 class="border-2 rounded-xl border-p80 text-ss px-4 text-center font-semibold text-g70 m-auto my-2 w-fit ">
        {setup.sector.toUpperCase()}
      </h2>

      <div>
        {setup.stats.map((item) => (
          <div class="border-p80 border-b-2 flex items-center font-medium  mt-2 text-g70">
            <span>
              <ArrowDiagUp color="#F5F6FA" size="24px" />
            </span>
            <span class="text-sm">{item}</span>
          </div>
        ))}
      </div>
      <h4 class="absolute left-0 bottom-0 bg-p80 text-center text-g70 w-full rounded-b-md py-2 text-sm font-semibold">
        {setup.signal_trend.toUpperCase()}
      </h4>
    </div>
  );
}
