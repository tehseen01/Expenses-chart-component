import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import data from "../../data.json";
import "../SASS/index.scss";

const Chart = () => {
  const [focusBar, setFocusBar] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const tooltip = document.querySelector(".recharts-tooltip-wrapper");
    if (!tooltip) return;
    const tooltipHeight = tooltip.getBoundingClientRect().height;
    const tooltipWidth = tooltip.getBoundingClientRect().width;

    tooltip.style = `
      transform: translate(${position?.data.x}px, ${position?.data.y}px);
      pointer-events: none;  position: absolute;
      top: -${tooltipHeight + 10}px;
      left: -${tooltipWidth / 2 - position?.data.width / 2}px;
      opacity: ${position?.show ? "1" : 0};
      transition: all 400ms ease 0s; outline: none;
    `;
  }, [position]);

  return (
    <ResponsiveContainer width="100%" aspect={1.6}>
      <BarChart
        data={data}
        onMouseMove={(state) => {
          if (state.isTooltipActive) {
            setFocusBar(state.activeTooltipIndex);
          } else {
            setFocusBar(null);
          }
        }}
      >
        <XAxis
          dataKey="day"
          axisLine={false}
          stroke="hsl(28, 10%, 53%)"
          tickLine={false}
        />
        <Bar
          dataKey="amount"
          radius={[5, 5, 5, 5]}
          onMouseMove={(data) => setPosition({ data: data, show: true })}
          onMouseLeave={(data) => setPosition({ data: data, show: false })}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={
                entry.amount <= 52 ? "hsl(10, 79%, 65%)" : "hsl(186, 34%, 60%)"
              }
              opacity={focusBar == index ? 0.6 : 1}
            />
          ))}
        </Bar>
        <Tooltip
          position={{
            x: position?.data.x ?? 0,
            y: position?.data.y ?? 0,
          }}
          content={<CustomToolTip />}
          wrapperStyle={{ outline: "none" }}
          cursor={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;

function CustomToolTip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="tool-tip">
        <p>${payload[0].value}</p>
      </div>
    );
  }
}
