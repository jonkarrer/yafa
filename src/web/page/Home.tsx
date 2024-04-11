import TwoColumnPanel from "../component/GeneralEconomyPanel";
import StatCard from "../component/StatCard";

export default function Home() {
  return (
    <div>
      <TwoColumnPanel />
      <div class="flex justify-between m-auto mt-6">
        <StatCard />
        <StatCard />
      </div>
    </div>
  );
}
