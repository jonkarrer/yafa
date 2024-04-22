export default function HalfCard() {
  let mockData = {
    name: "Q2",
    value: "March 2, 2024",
    unit: "date",
    category: "General",
  };
  return (
    <div class="half-card relative flex flex-col justify-center  px-4">
      <h1 class="text-g70 text-3xl font-semibold text-center">
        {mockData.name}
      </h1>
      <div class="h-1 bg-p80"></div>
      <h3 class="text-g70 text-md text-center font-semibold">foo</h3>
    </div>
  );
}
