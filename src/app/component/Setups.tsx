import { Setup } from "../../domain/types";

export default function ({ setups }: { setups: Array<Setup> }) {
  return (
    <section>
      {setups.map((item) => (
        <div>{item.symbol}</div>
      ))}
    </section>
  );
}
