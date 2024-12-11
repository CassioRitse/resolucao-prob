"use client";

import { LockKeyhole, LockKeyholeOpen, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [columns, setColumns] = useState(5);
  const [palette, setPalette] = useState<string[]>([]);
  const [locked, setLocked] = useState<boolean[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  useEffect(() => {
    setPalette(generatePalette(columns));
    setLocked(Array(columns).fill(false));
  }, []);

  function generatePalette(num: number) {
    return Array.from({ length: num }, () => getRandomColor());
  }

  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  }

  function regeneratePalette() {
    setPalette((prev) =>
      prev.map((color, index) => (locked[index] ? color : getRandomColor()))
    );
  }

  function toggleLock(index: number) {
    setLocked((prev) => {
      const newLocked = [...prev];
      newLocked[index] = !newLocked[index];
      return newLocked;
    });
  }

  function handleColumnChange(num: number) {
    setColumns(num);
    setPalette((prev) => [
      ...prev.slice(0, num),
      ...generatePalette(Math.max(0, num - prev.length)),
    ]);
    setLocked((prev) => [
      ...prev.slice(0, num),
      ...Array(Math.max(0, num - prev.length)).fill(false),
    ]);
  }

  function generateComponentCode(color: string, index: number) {
    return `
      <div className="p-4 rounded shadow bg-gray-50 border-2 border-[${color}]">
        <h2 className="text-lg font-bold mb-2 text-[${color}]">
          Exemplo componente ${index + 1}
        </h2>
        <button
          className="px-4 py-2 text-white rounded shadow-md bg-[${color}]"
        >
          Exemplo de Botão
        </button>
        <div className="mt-2">
          <input
            className="p-2 rounded w-full text-[${color}] border-[${color}] border-2"
            placeholder="Exemplo de input"
          />
        </div>
        <div className="mt-2">
          <input
            type="checkbox"
            className="mr-2"
          />
          <label>Exemplo de Checkbox</label>
        </div>
        <div className="mt-2">
          <input
            type="radio"
            className="mr-2"
          />
          <label>Exemplo de Radio</label>
        </div>
      </div>
    `;
  }

  function handleGenerateCode(color: string, index: number) {
    setGeneratedCode(generateComponentCode(color, index));
  }

  if (!palette.length) return null; // bugadasso

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Gerador de Paletas de Cores</h1>

      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={() => handleColumnChange(Math.max(1, columns - 1))}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <span className="text-xl font-semibold">{columns}</span>
        <button
          onClick={() => handleColumnChange(columns + 1)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
        <button
          onClick={regeneratePalette}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600 ml-4"
        >
          Gerar Cores
        </button>
      </div>

      <div
        className="grid gap-2 w-full"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {palette.map((color, index) => (
          <div key={index} className="relative h-[250px] rounded shadow-md">
            <div
              style={{ backgroundColor: color }}
              className={`h-full flex items-center justify-center rounded border-2 border-[${color}]`}
            >
              <p className="text-center text-white font-bold">{color}</p>
            </div>
            <div
              onClick={() => toggleLock(index)}
              className={`absolute top-2 right-2 p-1 rounded hover:cursor-pointer ${
                locked[index] ? "bg-gray-500 text-white" : "bg-gray-300"
              }`}
              title={locked[index] ? "Desfixar Cor" : "Fixar Cor"}
            >
              {locked[index] ? <LockKeyhole /> : <LockKeyholeOpen />}
            </div>
          </div>
        ))}
      </div>

      <hr />

      {generatedCode && (
        <div className="mt-8 w-full max-w-4xl bg-black text-white">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-2xl font-bold">Exemplo de uso:</h2>
            <X
              className="hover:cursor-pointer"
              onClick={() => setGeneratedCode(null)}
            ></X>
          </div>
          <textarea
            value={generatedCode}
            readOnly
            rows={15}
            className="w-full p-4 bg-gray-600 rounded border-2 border-gray-700"
          />
        </div>
      )}

      <h1 className="text-2xl mt-8 font-bold mb-4">
        Demonstração de Componentes
      </h1>
      <div className="mt-8 flex flex-wrap gap-2">
        {palette.map((color, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-2"
          >
            <div className="mt-2">
              <button
                onClick={() => handleGenerateCode(color, index)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
              >
                Gerar Código
              </button>
            </div>
            <div className="p-4 rounded shadow bg-gray-50 border-2 border-[${color}]">
              <h2 style={{ color: color }} className="text-lg font-bold mb-2">
                {`Exemplo componente ${index + 1}`}
              </h2>
              <button
                style={{ backgroundColor: color }}
                className="px-4 py-2 text-white rounded shadow-md"
              >
                Exemplo de Botão
              </button>
              <div className="mt-2">
                <input
                  style={{
                    borderColor: color,
                    borderWidth: "2px",
                    color: color,
                  }}
                  className="p-2 rounded w-full"
                  placeholder="Exemplo de input"
                />
              </div>
              <div className="mt-2">
                <input
                  type="checkbox"
                  style={{ accentColor: color }}
                  className="mr-2"
                  checked
                  readOnly
                />
                <label>Exemplo de Checkbox</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
