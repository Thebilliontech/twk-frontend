import React, { useState } from "react";
import Header from "../components/Header";

export default function Admin(){
  const [image, setImage] = useState(null);
  const [pair, setPair] = useState("EURUSD");
  const [entry, setEntry] = useState("");
  const [sl, setSl] = useState("");
  const [tp, setTp] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImage(file ? URL.createObjectURL(file) : null);
  };

  const handleLearn = async () => {
    // later: post to backend /teach endpoint with image + metadata
    alert("Saved learning example (mock). Backend hookup pending.");
  };

  return (
    <div className="min-h-screen px-6 py-6">
      <Header />
      <main className="max-w-5xl mx-auto space-y-6">
        <div className="card p-4">
          <h2 className="text-lg font-semibold">Admin Panel — Teach TWK</h2>
          <p className="text-sm text-slate-400">Upload a historical chart image and label entry/exit points.</p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input type="file" accept="image/*" onChange={handleUpload} />
              {image && <img src={image} alt="preview" className="mt-3 rounded-md border border-slate-700" />}
            </div>

            <div className="space-y-3">
              <select value={pair} onChange={(e)=>setPair(e.target.value)} className="bg-slate-800 px-3 py-2 rounded-md">
                <option>EURUSD</option>
                <option>GBPUSD</option>
                <option>USDJPY</option>
              </select>

              <input value={entry} onChange={(e)=>setEntry(e.target.value)} placeholder="Entry price" className="w-full px-3 py-2 bg-transparent border border-slate-700 rounded-md" />
              <input value={sl} onChange={(e)=>setSl(e.target.value)} placeholder="Stop Loss" className="w-full px-3 py-2 bg-transparent border border-slate-700 rounded-md" />
              <input value={tp} onChange={(e)=>setTp(e.target.value)} placeholder="Take Profit" className="w-full px-3 py-2 bg-transparent border border-slate-700 rounded-md" />

              <div className="flex gap-2">
                <button onClick={handleLearn} className="bg-accent px-4 py-2 rounded-md text-slate-900 font-semibold">Learn This</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold">Saved Teachings (mock)</h3>
          <p className="text-sm text-slate-400 mt-2">Here we will show examples the admin has taught the AI.</p>
        </div>
      </main>
    </div>
  );
}
