import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import LockUnlock from './components/LockUnlock';
import Reward from './components/Reward';
import { init, getUserAddress, register, lock, unlock, getOwner, getReward } from './Web3Client';
import './App.css';

const App = () => {
  const [userAddress, setUserAddress] = useState('');
  const [owner, setOwnerAddress] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [reward, setReward] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async (name, surname) => {
    await register(name, surname);
    console.log('User registered successfully!');
    setIsRegistered(true); // After registration, set isRegistered to true
  };

  const handleLock = async (value, lockTime) => {
    await lock(value, lockTime);
    console.log('Tokens locked successfully!');
  };

  const handleUnlock = async (value) => {
    await unlock(value);
    console.log('Tokens unlocked successfully!');
  };

  const handleGetReward = async () => {
    const userReward = await getReward();
    setReward(userReward);
  };

  useEffect(() => {
    const initWeb3 = async () => {
      await init();
      const address = await getUserAddress();
      setUserAddress(address);
      const contractOwner = await getOwner();
      setOwnerAddress(contractOwner);
    };
    initWeb3();
  }, []);

  return (
    <div className="app-container">
      <div className="header">
        <h1>Safe Contract dApp</h1>
      </div>

      <div className="user-info">
        <h2>User Info</h2>
        <p>User Address: {userAddress}</p>
        {/*<p>Contract Owner: {owner}</p>*/}
      </div>

      {!isRegistered && <Register onRegister={handleRegister} />}

      {isRegistered && (
        <div>
          <div className="action-section">
            <LockUnlock onLock={handleLock} onUnlock={handleUnlock} />
          </div>

          <div className="action-section">
            <Reward onGetReward={handleGetReward} reward={reward} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;



