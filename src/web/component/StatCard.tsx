export default function StatCard() {
  let mockData = {
    name: "Q2",
    value: "March 2, 2024",
    unit: "date",
    category: "General",
  };
  return (
    <div class="card relative flex flex-col justify-center gap-4 px-4 pb-6">
      <h1 class="text-g70 text-6xl font-bold text-center">{mockData.name}</h1>
      <div class="h-1 bg-p80"></div>
      <h3 class="text-g70 text-xl text-center font-bold">{mockData.value}</h3>
      <h4 class="absolute left-0 bottom-0 bg-p80 text-center text-g70 w-full rounded-b-md py-2 text-sm font-semibold">
        {mockData.category.toUpperCase()}
      </h4>
    </div>
  );
}
