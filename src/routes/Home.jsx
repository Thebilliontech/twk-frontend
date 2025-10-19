import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import LiveChart from "../components/LiveChart";
import PairSelector from "../components/PairSelector";
import TradeForm from "../components/TradeForm";
import SuggestionCard from "../components/SuggestionCard";
import { fetchLiveCandles, analyzeTrade } from "../lib/api";

export default function Home(){
  const [pair, setPair] = useState("EURUSD");
  const [timeframe, setTimeframe] = useState("1h");
  const [candles, setCandles] = useState([]);
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // load initial candles
    let mounted = true;
    fetchLiveCandles(pair, timeframe).then(data => { if(mounted) setCandles(data); });
    // we can also set up polling later
    return () => mounted = false;
  }, [pair, timeframe]);

  const handleAnalyze = async ({ accountSize, lotSize }) => {
    setLoading(true);
    const res = await analyzeTrade({ pair, timeframe, accountSize, lotSize });
    setSuggestion(res);
    setLoading(false);
  };

  return (
    <div className="min-h-screen px-6 py-6">
      <Header />
      <main className="max-w-6xl mx-auto space-y-6">
        <LiveChart candles={candles} />

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
