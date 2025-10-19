import axios from "axios";

// You can switch this later to your live API domain (e.g., https://api.twkfx.com)
const BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

/**
 * Fetch live candles for the selected pair/timeframe
 */
export async function fetchLiveCandles(pair = "EURUSD", timeframe = "1h") {
  try {
const encodedPair = encodeURIComponent(
  pair.includes("/") ? pair : `${pair.slice(0,3)}/${pair.slice(3)}`
);
const res = await axios.get(`${BASE}/api/market/candles?pair=${encodedPair}&timeframe=${timeframe}`);
    return res.data;
  } catch (err) {
    console.error("Backend unreachable, using mock data instead.", err);
    return mockCandles();
  }
}

/**
 * Analyze trade with AI
 */
export async function analyzeTrade({ pair, timeframe, accountSize, lotSize }) {
  try {
    const res = await axios.post(`${BASE}/api/market/analyze`, {
      pair,
      timeframe,
      accountSize,
      lotSize,
    });

    // FastAPI returns a `recommendation` object
    return res.data.recommendation;
  } catch (err) {
    console.error("❌ Error analyzing trade:", err.message);
    return {
      signal: "N/A",
      entry: 0,
      sl: 0,
      tp: 0,
      confidence: 0,
      reasoning: "Unable to analyze at this time.",
    };
  }
}

/**
 * Upload chart data to train AI (admin use)
 */
export async function trainAI({ file, entry, exit, tp, sl }) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("entry", entry);
    formData.append("exit", exit);
    formData.append("tp", tp);
    formData.append("sl", sl);

    const res = await axios.post(`${BASE}/api/admin/train`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (err) {
    console.error("❌ Error training AI:", err.message);
    throw err;
  }
}
