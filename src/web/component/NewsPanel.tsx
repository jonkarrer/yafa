export default function NewsPanel() {
  let mockData = [
    {
      source: "CNN",
      timestamp: "40 min ago",
      headline: "Headline from the news article",
    },
    {
      source: "CNN",
      timestamp: "40 min ago",
      headline: "Headline from the news article",
    },
    {
      source: "CNN",
      timestamp: "40 min ago",
      headline: "Headline from the news article",
    },
  ];

  return (
    <div class="panel">
      <h2 class="text-xl font-bold border-b-4 border-p80 pl-4 py-1 text-g70">
        Todays News
      </h2>
      <div class="p-3 flex flex-col gap-2">
        {mockData.map((item) => (
          <div class="border-b-2 border-p80">
            <p class="text-n70 text-xs">
              {item.source} - {item.timestamp}
            </p>
            <h4 class="text-lg text-g70 font-medium">{item.headline}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
