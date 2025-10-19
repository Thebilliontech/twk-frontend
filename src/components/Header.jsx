import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
  return (
    <header className="w-full flex items-center justify-between py-4 px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/80 to-indigo-500 flex items-center justify-center shadow-lg">
          <span className="font-bold text-slate-900">TWK</span>
        </div>
        <div>
          <h1 className="text-xl font-semibold">TWK</h1>
          <p className="text-sm text-slate-400">Trade With Kon</p>
        </div>
      </div>

      <nav className="flex items-center gap-4">
        <Link to="/admin" className="text-sm px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700">Admin</Link>
      </nav>
    </header>
  );
}
