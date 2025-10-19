// src/components/PairSelector.jsx
import React from "react";

const pairGroups = {
  "Major Pairs": [
    "EURUSD", "GBPUSD", "USDJPY", "USDCHF", "USDCAD",
    "AUDUSD", "NZDUSD",
  ],
  "Cross Pairs": [
    "EURGBP", "EURJPY", "EURAUD", "EURCAD", "EURCHF",
    "GBPJPY", "GBPAUD", "GBPCAD", "GBPCHF",
    "AUDJPY", "AUDCAD", "AUDCHF", "CADJPY", "CHFJPY",
    "NZDJPY", "NZDCAD", "NZDCHF", "AUDNZD",
  ],
  "Commodities": [
    "XAUUSD", "XAGUSD", "WTIUSD", "BRENTUSD", "COPPERUSD",
  ],
  "Crypto": [
    "BTCUSD", "ETHUSD", "LTCUSD", "XRPUSD", "SOLUSD",
  ],
  "Indices": [
    "US30", "US100", "SPX500", "GER40", "UK100", "JPN225",
  ],
};

export default function PairSelector({ pair, setPair }) {
  // Combine all pairs into one array for dropdown use
  // eslint-disable-next-line no-unused-vars
  const allPairs = Object.values(pairGroups).flat();

  return (
    <div className="space-y-3">
      {/* Desktop View */}
      <div className="hidden sm:block space-y-4">
        {Object.entries(pairGroups).map(([group, symbols]) => (
          <div key={group}>
            <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">
              {group}
            </h3>
            <div className="flex flex-wrap gap-2">
              {symbols.map((p) => (
                <button
                  key={p}
                  onClick={() => setPair(p)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                    pair === p
                      ? "bg-accent text-slate-900 shadow-md"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden">
        <label className="text-xs text-slate-400 mb-1 block">
          Select Currency Pair
        </label>
        <select
          value={pair}
          onChange={(e) => setPair(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-accent"
        >
          {Object.entries(pairGroups).map(([group, symbols]) => (
            <optgroup key={group} label={group}>
              {symbols.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}
