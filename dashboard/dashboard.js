async function loadSummaries() {
  const container = document.getElementById("summary-list");
  const { summaries } = await chrome.storage.local.get("summaries");

  if (!summaries || summaries.length === 0) {
    container.innerHTML = "<p>No summaries available.</p>";
    return;
  }

  for (const item of summaries) {
    const div = document.createElement("div");
    div.className = "summary-item";
    div.innerHTML = `
      <h2><a href="${item.url}" target="_blank">${item.title}</a></h2>
      <p>${item.summary}</p>
    `;
    container.appendChild(div);
  }
}
loadSummaries();