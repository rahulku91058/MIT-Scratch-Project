import React from 'react';
import { useDrop } from 'react-dnd';
import BlockItem from './BlockItem';

export default function CodeArea({ currentSprite, handleBlockDrop, codeBlocks = [] }) {
  const [{ hovered }, dropZone] = useDrop(() => ({
    accept: 'block',
    drop: (block) => handleBlockDrop(block),
    collect: (monitor) => ({
      hovered: monitor.isOver(),
    }),
  }));

  return (
    <section className="w-2/4 h-full bg-gray-50 border-x border-gray-300 flex flex-col p-4">
      <header className="text-center text-lg font-bold mb-3 border-b border-gray-200 pb-2">
        {currentSprite}
      </header>

      <div
        ref={dropZone}
        className={`flex-1 rounded p-4 bg-white overflow-y-auto shadow-inner transition-colors ${
          hovered ? 'bg-yellow-100' : ''
        }`}
      >
        {codeBlocks.length === 0 ? (
          <div className="text-sm italic text-gray-400">
            Drop some code blocks here to build logic for this sprite.
          </div>
        ) : (
          codeBlocks.map((block, idx) => (
            <BlockItem
              key={idx}
              category={block.type}
              title={block.label}
              payload={block.data}
            />
          ))
        )}
      </div>
    </section>
  );
};
