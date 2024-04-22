import GeneralEconomyPanel from "../component/GeneralEconomyPanel";
import HalfCard from "../component/HalfCard";
import NewsPanel from "../component/NewsPanel";
import Setups from "../component/Setups";
import StatCard from "../component/StatCard";

export default function Home() {
  return (
    <div class="flex flex-col gap-6">
      <section class="grid grid-cols-2 gap-4 mt-24">
        <GeneralEconomyPanel />
        <div class="flex justify-between w-full">
          <StatCard />
          <StatCard />
        </div>
        <NewsPanel />
        <div class="hidden tab-sm:grid grid-cols-2 gap-3">
          <HalfCard />
          <HalfCard />
          <HalfCard />
          <HalfCard />
        </div>
      </section>
      <Setups />
    </div>
  );
}
