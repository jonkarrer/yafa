export default function TwoColumnPanel() {
  let mockData = {
    economy: [
      { unit: "point", value: 310.236, name: "CPI" },
      { unit: "point", value: 2.125, name: "Inflation" },
      { unit: "point", value: 2.125, name: "Treasury" },
      { unit: "percent", value: 3.43, name: "Fed Rate" },
      { unit: "percent", value: 6.43, name: "Unemployed" },
    ],
    market: [
      { unit: "percent", value: -3.43, name: "DJI" },
      { unit: "percent", value: 6.43, name: "SPX" },
      { unit: "percent", value: 3.43, name: "DXY" },
      { unit: "percent", value: -6.43, name: "NDX" },
    ],
  };
  return (
    <div class="panel text-g70 flex flex-col mt-24 m-auto">
      <div class="w-full bg-p80 rounded-t-md">
        <h6 class="text-xl py-1 px-4">General Economy</h6>
      </div>
      <div class="flex w-full justify-between h-full">
        <div class="flex flex-col gap-1 w-7/12 px-4 py-4">
          {mockData.economy.map((item) => (
            <div class="border-p80 border-b-2 flex items-center justify-between">
              <span>{item.name}:</span>
              <span>
                {item.value} <small>%</small>
              </span>
            </div>
          ))}
        </div>
        <div class="w-1 bg-p80"></div>
        <div class="flex flex-col gap-1 w-5/12 px-4 py-3">
          <h2 class="border rounded-xl border-p80 text-sm px-3 mb-2 text-center">
            Broad Market
          </h2>
          {mockData.market.map((item) => (
            <div class="border-p80 border-b-2 flex items-center justify-between">
              <span>{item.name}:</span>
              <span>
                {item.value} <small>%</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}