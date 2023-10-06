import React from 'react';

const Reward = ({ onGetReward, reward }) => {
  return (
    <div>
      <h2>Get Reward</h2>
      <p>You can see your reward amount while you keep token locked (not after time runs out).</p>
      <br></br>
      <button onClick={onGetReward}>Get Reward</button>
      <p>Reward: {reward}</p>
    </div>
  );
};

export default Reward;
