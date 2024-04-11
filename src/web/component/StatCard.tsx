export default function StatCard() {
  let mockData = {
    name: "Q2",
    value: "March 2, 2024",
    unit: "date",
    category: "General",
  };
  return (
    <div class="card">
      <h1>{mockData.name}</h1>
      <div class="h-1 bg-p80 m-6"></div>
      <h3>{mockData.value}</h3>
      <h4>{mockData.category}</h4>
    </div>
  );
}
