import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import LiveChart from "../components/LiveChart";
import PairSelector from "../components/PairSelector";
import TradeForm from "../components/TradeForm";
import SuggestionCard from "../components/SuggestionCard";

// === REAL API CALLS ===
const API_BASE = "https://twk-backend.onrender.com"; // 🟢 Replace with your actual backend domain (e.g., https://api.myforexapp.com)

export default function Home(){
  const [pair, setPair] = useState("EUR/USD");
  const [timeframe, setTimeframe] = useState("1h");
  const [candles, setCandles] = useState([]);
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🟩 Fetch real live candles from FastAPI
  useEffect(() => {
    let mounted = true;
    async function loadCandles() {
      try {
        setError(null);
        const res = await fetch(`${API_BASE}/api/candles?pair=${encodeURIComponent(pair)}&timeframe=${timeframe}`);
        if (!res.ok) throw new Error(`Failed to fetch candles: ${res.statusText}`);
        const data = await res.json();
        if (mounted) setCandles(data);
      } catch (err) {
        console.error("Error loading candles:", err);
        setError("Unable to load live data. Check your backend connection.");
      }
    }
    loadCandles();
    return () => { mounted = false; };
  }, [pair, timeframe]);

  // 🟩 Analyze trade via FastAPI
  const handleAnalyze = async ({ accountSize, lotSize }) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/analyze_trade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pair, timeframe, accountSize, lotSize }),
      });
      const data = await res.json();
      setSuggestion(data);
    } catch (err) {
      console.error("Analysis error:", err);
      setSuggestion({ signal: "Error", reasoning: "Backend unavailable" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen px-6 py-6">
      <Header />
      <main className="max-w-6xl mx-auto space-y-6">
        <LiveChart candles={candles} />

        {error && (
          <div className="text-red-400 text-sm text-center mt-2">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Selected Pair</div>
                  <h2 className="text-xl font-semibold">{pair} • {timeframe}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <select value={timeframe} onChange={(e)=>setTimeframe(e.target.value)}
                    className="bg-slate-800 px-3 py-2 rounded-md">
                    <option value="1h">1h</option>
                    <option value="4h">4h</option>
                    <option value="1d">1d</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <PairSelector pair={pair} setPair={setPair} />
              </div>
            </div>

            <TradeForm onAnalyze={handleAnalyze} />
            {loading && <div className="text-sm text-slate-400 mt-2">Analyzing...</div>}
            <SuggestionCard suggestion={suggestion} />
          </div>

          <aside className="space-y-4">
            <div className="card p-4">
              <div className="text-sm text-slate-400">Live Ticker</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="py-2">EURUSD <div className="text-sm text-accent">1.0863</div></div>
                <div className="py-2">GBPUSD <div className="text-sm text-slate-300">1.2502</div></div>
                <div className="py-2">USDJPY <div className="text-sm text-slate-300">151.12</div></div>
                <div className="py-2">AUDUSD <div className="text-sm text-slate-300">0.6532</div></div>
              </div>
            </div>

            <div className="card p-4">
              <div className="text-sm text-slate-400">Quick Actions</div>
              <div className="mt-3 flex flex-col gap-2">
                <button className="py-2 rounded-md bg-slate-800">Paper Trade</button>
                <button className="py-2 rounded-md bg-slate-800">Export CSV</button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
