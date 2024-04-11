import TwoColumnPanel from "../component/GeneralEconomyPanel";
import StatCard from "../component/StatCard";

export default function Home() {
  return (
    <div>
      <TwoColumnPanel />
      <div class="flex m-auto">
        <StatCard />
        <StatCard />
      </div>
    </div>
  );
}
