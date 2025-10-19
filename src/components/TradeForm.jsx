import React, { useState } from "react";

export default function TradeForm({ onAnalyze }) {
  const [accountSize, setAccountSize] = useState(1000);
  const [lotSize, setLotSize] = useState(0.01);

  return (
    <div className="card p-4 flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="flex flex-col text-sm">
          <span className="text-slate-300">Account Size (USD)</span>
          <input type="number" value={accountSize} onChange={(e)=>setAccountSize(Number(e.target.value))}
            className="mt-1 px-3 py-2 bg-transparent border border-slate-700 rounded-md focus:outline-none" />
        </label>

        <label className="flex flex-col text-sm">
          <span className="text-slate-300">Lot Size</span>
          <input type="number" step="0.01" value={lotSize} onChange={(e)=>setLotSize(Number(e.target.value))}
            className="mt-1 px-3 py-2 bg-transparent border border-slate-700 rounded-md focus:outline-none" />
        </label>

        <div className="flex items-end">
          <button onClick={() => onAnalyze({ accountSize, lotSize })}
            className="w-full py-2 px-4 bg-accent text-slate-900 rounded-lg font-semibold hover:brightness-95">
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
}
