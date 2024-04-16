import { Setup, Trend } from "../../domain/types";
import SetupCard from "./SetupCard";

export default function Setups() {
  let setup: Setup = {
    symbol: "TIC",
    recent_price: 63.45,
    sector: "healthcare",
    signal_trend: Trend.Bullish,
    stats: ["smart sector", "blue chip", "weak finances"],
  };

  let mockData = {
    timeframe: "Daily",
    date: "2024-01-14",
    time: "03:20:21",
    title: "Lorem Ipsum",
    setups: [setup, setup, setup],
  };

  let setups = [mockData, mockData, mockData];

  return (
    <div>
      {setups.map((item) => (
        <section class="mt-12">
          <h2 class="text-g70 text-3xl font-bold">{item.title}</h2>
          <h5 class="text-g90 font-normal">
            {item.timeframe} / {item.date} / {item.time}
          </h5>
          <div class="w-full bg-p80 h-2 mb-6"></div>

          <div class="grid grid-cols-2 gap-4">
            {item.setups.map((item) => (
              <SetupCard setup={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
