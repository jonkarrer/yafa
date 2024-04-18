export default function TwoColumnPanel() {
  let mockData = {
    economy: [
      { unit: "point", value: 310.236, name: "CPI" },
      { unit: "point", value: 2.125, name: "Inflation" },
      { unit: "point", value: 2.125, name: "Treasury" },
      { unit: "percent", value: 3.43, name: "Fed Rate" },
      { unit: "percent", value: 6.43, name: "Unemploy" },
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
        <h6 class="text-xl font-bold py-1 px-2">General Economy</h6>
      </div>
      <div class="flex w-full justify-between h-full">
        <div class="flex flex-col  w-7/12 px-2 py-2">
          {mockData.economy.map((item) => (
            <div class="border-p80 border-b-2 flex items-center justify-between font-semibold mt-1 mb-1">
              <span>{item.name}:</span>
              <span>
                {item.value} <small>%</small>
              </span>
            </div>
          ))}
        </div>
        <div class="w-1 bg-p80"></div>
        <div class="flex flex-col w-5/12 px-2 py-2 ">
          <h2 class="border rounded-xl border-p80 text-sm px-3 mb-2 text-center font-semibold">
            Market
          </h2>
          {mockData.market.map((item) => (
            <div class="border-p80 border-b-2 flex items-center justify-between font-medium mt-2">
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
