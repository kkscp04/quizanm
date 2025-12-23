
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ResultsChartProps {
  correct: number;
  incorrect: number;
  total: number;
}

const ResultsChart: React.FC<ResultsChartProps> = ({ correct, incorrect, total }) => {
  const answered = correct + incorrect;
  const unanswered = total - answered;

  const data = [
    { name: 'Đúng', value: correct },
    { name: 'Sai', value: incorrect },
    { name: 'Chưa trả lời', value: unanswered },
  ].filter(item => item.value > 0);

  const COLORS = ['#10B981', '#EF4444', '#64748B'];

  const correctPercentage = total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="w-full md:w-1/2 h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '0.5rem' }}
              itemStyle={{ color: '#F1F5F9' }}
            />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
        <div className="mb-4">
          <p className="text-lg text-slate-400">Tỷ lệ đúng:</p>
          <p className="text-4xl font-bold text-green-400">{correctPercentage}%</p>
        </div>
        <div>
          <p className="text-slate-400"><span className="text-green-400 font-semibold">{correct}</span> câu đúng</p>
          <p className="text-slate-400"><span className="text-red-400 font-semibold">{incorrect}</span> câu sai</p>
          <p className="text-slate-400"><span className="text-slate-500 font-semibold">{unanswered}</span> câu chưa trả lời</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsChart;
