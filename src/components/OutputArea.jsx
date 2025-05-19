import React, { useState } from 'react';
import { processBlockSequence } from './executerBlock';

export default function OutputArea({ sprite, setSprite }) {
  const [dialogue, setDialogue] = useState(null);

  const onRunClick = () => {
    processBlockSequence(sprite, setSprite, setDialogue);
  };

  const onClearClick = () => {
    setSprite(current => ({
      ...current,
      x: 0,
      y: 0,
      rotation: 0,
      blocks: [],
    }));
    setDialogue(null);
  };

  return (
    <aside className="w-2/5 bg-white p-4 flex flex-col justify-between">
      <section className="relative h-[400px] bg-gray-100 border overflow-scroll flex items-center justify-center">
        {dialogue && (
          <div
            className={`absolute top-10 px-3 py-1 rounded shadow text-sm bg-white ${
              dialogue.type === 'think' ? 'italic' : 'font-bold'
            }`}
          >
            {dialogue.text}
          </div>
        )}
        <div className="absolute transition-all duration-300"
          style={{
            left: `${sprite.x + 150}px`,
            top: `${150 - sprite.y}px`,
            transform: `rotate(${sprite.rotation || 0}deg)`,
          }}>
          {<sprite.image />}
        </div>
      </section>

      <footer className="mt-4">
        <p className="text-center text-sm text-gray-500">
          {sprite.name}: ({sprite.x}, {sprite.y})
        </p>

        <div className="flex justify-center gap-3 mt-3">
          <button
            onClick={onRunClick}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Run
          </button>
          <button
            onClick={onClearClick}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Reset
          </button>
        </div>

        <div className="flex justify-center items-center gap-2 mt-3">
          <input type="checkbox" id="modeHero" />
          <label htmlFor="modeHero" className="text-sm">
            Enable Hero Mode
          </label>
        </div>

        <div className="text-center mt-3">
          <select className="border rounded p-2">
            <option value="">Add Character</option>
            <option value="Charmander">Charmander</option>
            <option value="Squirtle">Squirtle</option>
          </select>
        </div>
      </footer>
    </aside>
  );
};
