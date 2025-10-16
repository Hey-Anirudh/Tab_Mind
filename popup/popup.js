document.getElementById("summarize").addEventListener("click", async () => {
  const status = document.getElementById("status");
  status.innerText = "🕒 Summarizing your tabs...";

  const tabs = await chrome.tabs.query({ currentWindow: true });
  const summaries = [];

  for (const tab of tabs) {
    try {
      const response = await chrome.ai.summarizer.summarize({
        url: tab.url,
        maxOutputWords: 80
      });

      summaries.push({
        title: tab.title,
        url: tab.url,
        summary: response.summary || "No summary generated."
      });
    } catch (err) {
      summaries.push({
        title: tab.title,
        url: tab.url,
        summary: `⚠️ Error summarizing: ${err.message}`
      });
    }
  }

  await chrome.storage.local.set({ summaries });
  chrome.tabs.create({ url: "dashboard/dashboard.html" });
});