import TwoColumnPanel from "../component/GeneralEconomyPanel";
import NewsPanel from "../component/NewsPanel";
import StatCard from "../component/StatCard";

export default function Home() {
  return (
    <div class="flex flex-col gap-6">
      <TwoColumnPanel />
      <div class="flex justify-between m-auto w-full">
        <StatCard />
        <StatCard />
      </div>
      <NewsPanel />
    </div>
  );
}
