import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function LiveChart({ candles = [] }) {
  const chartRef = useRef();

  useEffect(() => {
    const el = chartRef.current;
    if(!el) return;

    // cleanup existing chart if rerender
    el.innerHTML = "";

    const chart = createChart(el, {
      width: el.clientWidth,
      height: 360,
      layout: {
        backgroundColor: "transparent",
        textColor: "rgba(255,255,255,0.85)"
      },
      grid: { vertLines: { color: 'rgba(255,255,255,0.03)' }, horzLines: { color: 'rgba(255,255,255,0.02)' } },
      rightPriceScale: { borderColor: 'rgba(255,255,255,0.06)' },
      timeScale: { borderColor: 'rgba(255,255,255,0.06)' }
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#16A34A', downColor: '#DC2626', borderVisible: false, wickUpColor: '#16A34A', wickDownColor: '#DC2626'
    });

    const seriesData = candles.map(c => ({
      time: Math.floor(new Date(c.time).getTime()/1000),
      open: Number(c.open.toFixed(5)),
      high: Number(c.high.toFixed(5)),
      low: Number(c.low.toFixed(5)),
      close: Number(c.close.toFixed(5))
    }));

    candleSeries.setData(seriesData);

    const resize = () => chart.applyOptions({ width: el.clientWidth });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.remove();
    };
  }, [candles]);

  return (
    <div className="card p-3" style={{ borderRadius: 12 }}>
      <div ref={chartRef} className="w-full" />
    </div>
  );
}
