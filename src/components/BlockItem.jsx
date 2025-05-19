import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

export default function BlockItem({ category, title, payload }) {
  const [blockData, setBlockData] = useState(payload);

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'block',
      item: { category, data: blockData },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [blockData]
  );

  const updateField = (field, val) => {
    setBlockData((prev) => ({ ...prev, [field]: val }));
  };

  const getColor = () => {
    return category === 'motion' ? 'bg-blue-400' : 'bg-purple-400';
  };

  const renderContent = () => {
    switch (blockData.action) {
      case 'move':
        return (
          <>
            Move{' '}
            <input
              type="number"
              value={blockData.value}
              onChange={(e) => updateField('value', Number(e.target.value))}
              className="w-14 px-1 rounded text-black"
            />{' '}
            steps
          </>
        );
      case 'turn':
        return (
          <>
            Turn{' '}
            <input
              type="number"
              value={blockData.value}
              onChange={(e) => updateField('value', Number(e.target.value))}
              className="w-14 px-1 rounded text-black"
            />{' '}
            degrees
          </>
        );
      case 'goto':
        return (
          <>
            Go to x:{' '}
            <input
              type="number"
              value={blockData.x}
              onChange={(e) => updateField('x', Number(e.target.value))}
              className="w-12 px-1 rounded text-black"
            />{' '}
            y:{' '}
            <input
              type="number"
              value={blockData.y}
              onChange={(e) => updateField('y', Number(e.target.value))}
              className="w-12 px-1 rounded text-black"
            />
          </>
        );
      case 'repeat':
        return (
          <>
            Repeat{' '}
            <input
              type="number"
              value={blockData.value}
              onChange={(e) => updateField('value', Number(e.target.value))}
              className="w-14 px-1 rounded text-black"
            />{' '}
            times
          </>
        );
      case 'say':
        return (
          <>
            Say<span> </span>
            <input
              type="text"
              value={blockData.message}
              onChange={(e) => updateField('message', e.target.value)}
              className="w-24 px-1 rounded text-black"
            />
             for{' '}
            <input
              type="number"
              value={blockData.duration}
              onChange={(e) => updateField('duration', Number(e.target.value))}
              className="w-12 px-1 rounded text-black"
            />{' '}
            sec
          </>
        );
      case 'think':
        return (
          <>
            Think<span> </span>
            <input
              type="text"
              value={blockData.message}
              onChange={(e) => updateField('message', e.target.value)}
              className="w-24 px-1 rounded text-black"
            />
             for{' '}
            <input
              type="number"
              value={blockData.duration}
              onChange={(e) => updateField('duration', Number(e.target.value))}
              className="w-12 px-1 rounded text-black"
            />{' '}
            sec
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={dragRef}
      className={`p-2 rounded-lg mb-3 cursor-pointer text-white ${getColor()}`}
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      {renderContent()}
    </div>
  );
};

// export default BlockItem;
