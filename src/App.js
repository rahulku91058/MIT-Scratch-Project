import React, { useState } from 'react';
import BlockPanel from './components/BlockPanel';
import CodeArea from './components/CodeArea';
import OutputArea from './components/OutputArea';
import CatSprite from './components/CatSprite';

const App = () => {
  const [character, setCharacter] = useState({
    name: 'Cat',
    image: CatSprite,
    x: 0,
    y: 0,
    rotation: 0,
    blocks: [],
  });



  const handleBlockDrop = (blockItem) => {
    setCharacter(prev => ({
      ...prev,
      blocks: [...prev.blocks, blockItem],
    }));
  };

  return (
    <main className="flex h-screen">
      <BlockPanel />
      <CodeArea
        currentSprite={character.name}
        handleBlockDrop={handleBlockDrop}
        codeBlocks={character.blocks}
      />
      <OutputArea sprite={character} setSprite={setCharacter} />
    </main>
  );
};

export default App;
