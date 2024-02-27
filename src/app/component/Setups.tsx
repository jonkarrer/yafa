import { Setup } from "../../domain/types";

export default function ({
  setups,
  title,
}: {
  setups: Array<Setup>;
  title: string;
}) {
  const wrapper = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: "center",
    justifyItems: "center",
    maxWidth: "1000px",
    margin: "auto",
  };

  const card = {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    width: "250px",
    borderRadius: "10px",
    margin: "10px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  };

  const symbol = {
    borderBottom: "1px black solid",
    paddingBottom: "4px",
  };

  const heading = {
    borderBottom: "1px solid var(--contrast)",
    paddingBottom: "1rem",
    marginTop: "2.5rem",
  };

  return (
    <section>
      <h2 style={heading}>{title}</h2>
      <div style={wrapper}>
        {setups.map((item) => (
          <div style={card}>
            <h4 style={symbol}>{item.symbol}</h4>
            <p>Outlook: {item.signal_trend}</p>
            <p>Timestamp: {item.timestamp}</p>
            <p>Recent Price: {item.recent_price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
