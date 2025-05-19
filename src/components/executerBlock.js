export const processBlockSequence = async (character, updateCharacter, showMessage) => {
  const commandList = character.blocks;

  for (let index = 0; index < commandList.length; index++) {
    const currentCmd = commandList[index];
    const cmdType = currentCmd.data.action;

    if (cmdType === 'repeat') {
      const times = currentCmd.data.value;
      const followingCmd = commandList[index + 1];

      if (followingCmd) {
        for (let loop = 0; loop < times; loop++) {
          await executeSingleCommand(followingCmd, updateCharacter, showMessage);
          await delay(500);
        }
      }

      index++; // Skip next since it's already executed
    } else {
      await executeSingleCommand(currentCmd, updateCharacter, showMessage);
    }

    await delay(300);
  }
};

const executeSingleCommand = async (command, updateCharacter, showMessage) => {
  const { action, value, x, y, message, duration } = command.data;

  switch (action) {
    case 'move':
      updateCharacter(prev => ({
        ...prev,
        x: prev.x + value
      }));
      break;

    case 'turn':
      updateCharacter(prev => ({
        ...prev,
        rotation: (prev.rotation || 0) + value
      }));
      break;

    case 'goto':
      updateCharacter(prev => ({
        ...prev,
        x: x,
        y: y
      }));
      break;

    case 'say':
      showMessage({ text: message, type: 'say' });
      await delay(duration * 1000);
      showMessage(null);
      break;

    case 'think':
      showMessage({ text: message, type: 'think' });
      await delay(duration * 1000);
      showMessage(null);
      break;

    default:
      // Unknown command - ignore
      break;
  }
};

// Utility delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
