import React from "react";

export default function SuggestionCard({ suggestion }) {
  if(!suggestion) return null;

  return (
    <div className="card p-4 mt-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-slate-400">{suggestion.pair} • {suggestion.timeframe}</div>
          <h3 className="text-2xl font-semibold mt-1">{suggestion.signal} • Entry: {suggestion.entry.toFixed(5)}</h3>
          <p className="text-sm text-slate-300 mt-1">{suggestion.reasoning}</p>
        </div>

        <div className="text-right">
          <div className="text-sm text-slate-400">Confidence</div>
          <div className="text-lg font-bold">{Math.round(suggestion.confidence * 100)}%</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="p-3 bg-slate-900 rounded-md">
          <div className="text-xs text-slate-400">Stop Loss</div>
          <div className="text-lg font-semibold mt-1">{suggestion.sl.toFixed(5)}</div>
        </div>
        <div className="p-3 bg-slate-900 rounded-md">
          <div className="text-xs text-slate-400">Entry</div>
          <div className="text-lg font-semibold mt-1">{suggestion.entry.toFixed(5)}</div>
        </div>
        <div className="p-3 bg-slate-900 rounded-md">
          <div className="text-xs text-slate-400">Take Profit</div>
          <div className="text-lg font-semibold mt-1">{suggestion.tp.toFixed(5)}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button className="px-4 py-2 bg-slate-800 rounded-md text-sm">Simulate</button>
        <button className="px-4 py-2 bg-slate-800 rounded-md text-sm">Save to Watchlist</button>
      </div>
    </div>
  );
}
