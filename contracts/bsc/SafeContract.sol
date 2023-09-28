// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "../../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SafeContract is ReentrancyGuard {
  
  using Counters for Counters.Counter;
  Counters.Counter private _counter;

  address private owner;

  //Structs
  //Unique compartment for each user that is going to be defined.
  struct User{
    address walletAddress;
    string name;
    string lastName;
    bool doLock;
    uint reward;
    uint tokenAmount;
    uint startTime;
    uint lockTime; // as minutes
  }

  //Events
  event UserAdded(address indexed walletAddress, string name, string lastName);
  event Deposit(address indexed walletAddress, uint amount);
  event BalanceWithdrawn(address indexed walletAddress, uint amount);

  //Mappings
  //Lists individual compartments of users.
  mapping(address => User) private users;

  constructor() {
    owner = msg.sender;
  }

  //MODIFIERS
  modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can call this function");
    _;
  }

  //FUNCTIONS
  //Execute Functions

  //Sets a new owner.
  function setOwner(address _newOwner) external onlyOwner {
    owner = _newOwner;
  }

  //Defines a user.
  function addUser(string calldata name, string calldata lastName) external {
    require(!isUser(msg.sender), "User already exists.");
    users[msg.sender] = User(msg.sender, name, lastName, false, 0, 0, 0, 0);

    emit UserAdded(msg.sender, users[msg.sender].name, users[msg.sender].lastName);
  }

  //Locks token, starts the time, and changes user's lock state to true, after security checks that ensures user is defined and has not a active lock.
  function lock(uint _lockTime) external payable {
    require(isUser(msg.sender), "User does not exist!");  
    require(!users[msg.sender].doLock, "User has an active lock");

    users[msg.sender].startTime = block.timestamp;
    users[msg.sender].tokenAmount += msg.value;
    users[msg.sender].lockTime = _lockTime;
    users[msg.sender].doLock = true;

    emit Deposit(msg.sender, msg.value);
  }

  //Unlocks token by allowing user to withdraw and updating the user's relevant values to default,
  //after security checks that ensures the user is defined, has sufficient balance (token amount),
  //has an active lock, and time has expired to be able to unlock.
  function unlock() external nonReentrant {
    require(isUser(msg.sender), "User does not exist!");  
    uint tokenAmount = users[msg.sender].tokenAmount;
    require(tokenAmount > 0, "Insufficient balance to withdraw");
    require(users[msg.sender].doLock, "User has not an active lock");
    require(isDeadline(), "The specified time has not expired");

    users[msg.sender].reward += calculateReward(users[msg.sender].lockTime, tokenAmount);
    users[msg.sender].tokenAmount = 0;

    (bool success, ) = msg.sender.call{value: tokenAmount}("");
    require(success, "Transfer failed");

    users[msg.sender].lockTime = 0;
    users[msg.sender].doLock = false;
    users[msg.sender].startTime = 0;

    emit BalanceWithdrawn(msg.sender, tokenAmount);

  }

  //Calculates reward amount through the token amount and lockTime defined by user.
  function calculateReward(uint lockedMinutes, uint amount) private pure returns(uint) {
    return lockedMinutes * (amount / 4);
  }

  //Query Functions

  //Gets owner.
  function getOwner() external view returns (address) {
    return owner;
  }

  //Checks if user is defined.
  function isUser(address walletAddress) private view returns(bool) {
    return users[walletAddress].walletAddress != address(0);
  }

  //Calculates whether the defined period has expired, and returns a boolean.
  function isDeadline() private view returns(bool) {      
    uint lockedSeconds = block.timestamp - users[msg.sender].startTime;
    uint lockedMinutes = lockedSeconds / 60;

    return lockedMinutes >= users[msg.sender].lockTime ? true : false;   
  }

  //Gets existing user if so.
  function getUser() external view returns(User memory) {
    require(isUser(msg.sender), "User does not exist!");
    return users[msg.sender];
  }

  //Gets the reward amount after security checks that ensures user is defined, has locked token, and the time has not run out.
  function getReward() external view returns(uint) {
    require(isUser(msg.sender), "Reward cannot be seen by a non-user");
    require(users[msg.sender].doLock, "User has not an active lock to check");
    require(!isDeadline(), "Time is up, no more rewards will be calculated");

    return calculateReward(users[msg.sender].lockTime, users[msg.sender].tokenAmount);
  }

}
