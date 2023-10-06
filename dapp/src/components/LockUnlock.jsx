import React, { useState } from 'react';

const LockUnlock = ({ onLock, onUnlock }) => {
  const [lockValue, setLockValue] = useState('');
  const [lockTime, setLockTime] = useState('');

  const handleLock = () => {
    onLock(lockValue, lockTime);
  };

  const handleUnlock = () => {
    onUnlock(lockValue);
  };

  return (
    <div>
      <h2>Lock Tokens</h2>
      <label>
        Value (BNB):
        <input type="text" value={lockValue} onChange={(e) => setLockValue(e.target.value)} />
      </label>
      <label>
        Lock Time (minutes):
        <input type="text" value={lockTime} onChange={(e) => setLockTime(e.target.value)} />
      </label>
      <button onClick={handleLock}>Lock</button>
      
      <br></br>
      <br></br>
      <br></br>

      <h2>Unlock Tokens</h2>
      <button onClick={handleUnlock}>Unlock</button>
    </div>
  );
};

export default LockUnlock;
