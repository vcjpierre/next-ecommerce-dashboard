import React from 'react';

interface ChartProps {
  title: string;
  data: {
    labels: string[];
    values: number[];
  };
  type: 'bar' | 'line';
  height?: number;
}

const Chart: React.FC<ChartProps> = ({
  title,
  data,
  type,
  height = 300
}) => {
  // Encontrar el valor máximo para calcular las alturas relativas
  const maxValue = Math.max(...data.values);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-card shadow-card p-4">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">{title}</h3>

      <div style={{ height: `${height}px` }} className="relative">
        {/* Eje Y */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        {/* Contenedor de la gráfica */}
        <div className="absolute left-12 right-0 top-0 bottom-0 flex items-end justify-around">
          {data.labels.map((label, index) => {
            const percentage = (data.values[index] / maxValue) * 100;

            return (
              <div key={index} className="flex flex-col items-center">
                {/* Barra o punto de línea */}
                {type === 'bar' ? (
                  <div
                    className="w-12 bg-primary-500 dark:bg-primary-600 rounded-t"
                    style={{ height: `${percentage}%` }}
                  ></div>
                ) : (
                  <div className="relative w-full h-full">
                    <div
                      className="absolute w-3 h-3 rounded-full bg-primary-500 dark:bg-primary-600 transform -translate-x-1/2"
                      style={{ bottom: `${percentage}%`, left: '50%' }}
                    ></div>
                  </div>
                )}

                {/* Etiqueta */}
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chart;
