import React from 'react';
import BlockItem from './BlockItem';

export default function BlockPanel() {
  const motionBlocks = [
    { category: 'motion', title: 'Move', payload: { action: 'move', value: 20 } },
    { category: 'motion', title: 'Turn', payload: { action: 'turn', value: 30 } },
    { category: 'motion', title: 'Go to', payload: { action: 'goto', x: 10, y: 10 } },
    { category: 'motion', title: 'Repeat', payload: { action: 'repeat', value: 2 } },
  ];

  const looksBlocks = [
    { category: 'looks', title: 'Say', payload: { action: 'say', message: 'Hello', duration: 2 } },
    { category: 'looks', title: 'Think', payload: { action: 'think', message: 'Hmm', duration: 2 } },
  ];

  return (
    <aside className="w-1/4 bg-gray-80 p-4">
      <section>
        <h3 className="text-blue-700 font-semibold text-lg mb-2">Motion</h3>
        {motionBlocks.map((block, index) => (
          <BlockItem
            key={`motion-${index}`}
            category={block.category}
            title={block.title}
            payload={block.payload}
          />
        ))}
      </section>

      <section className="mt-6">
        <h3 className="text-purple-700 font-semibold text-lg mb-2">Looks</h3>
        {looksBlocks.map((block, index) => (
          <BlockItem
            key={`looks-${index}`}
            category={block.category}
            title={block.title}
            payload={block.payload}
          />
        ))}
      </section>
    </aside>
  );
};

