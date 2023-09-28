const SafeContract = artifacts.require("SafeContract");

contract("SafeContract", accounts => {
  let safeContract;
  const owner = accounts[0];
  const user1 = accounts[1];

  beforeEach(async () => {
    safeContract = await SafeContract.new();
  });

  it("adds a new user", async () => {
    await safeContract.addUser("Laura", "Smith", {from: user1} );
    const user = await safeContract.getUser({from: user1});
    assert.equal(user.name, "Laura", "Problem with user name");
    assert.equal(user.lastName, "Smith", "Problem with user lastname");
    assert.equal(user.doLock, false, "Problem with user lock state");
    assert.equal(user.reward, 0, "Problem with user reward");
    assert.equal(user.tokenAmount, 0, "Problem with user tokenAmount");
    assert.equal(user.startTime, 0, "Problem with user startTime");
    assert.equal(user.lockTime, 0, "Problem with user lockTime");
  });

  describe("Lock, unlock, and calculate reward", () => {
    it("locks token", async () => {
      await safeContract.addUser("Laura", "Smith", {from: user1} );
      await safeContract.lock(5, { from: user1, value: 100} );

      const user = await safeContract.getUser({from: user1});

      assert.equal(user.doLock, true, "Problem with user lock state");
      assert.equal(user.reward, 0, "Problem with user reward");
      assert.equal(user.tokenAmount, 100, "Problem with user tokenAmount");
      assert.equal(user.lockTime, 5, "Problem with user lockTime");
    });

    it("calculate rewards", async () => {
      await safeContract.addUser("Laura", "Smith", {from: user1} );
      await safeContract.lock(5, { from: user1, value: 100} );
      await new Promise((resolve) => setTimeout(resolve, 120000));  // 2 min

      const reward = await safeContract.getReward({from: user1});
      const user = await safeContract.getUser({from: user1});

      assert.equal(reward, 125, "Problem with reward calculation");
      assert.equal(user.doLock, true, "Problem with user lock state");
      assert.equal(user.reward, 0, "Problem with user reward");
      assert.equal(user.tokenAmount, 100, "Problem with user tokenAmount");
      assert.equal(user.lockTime, 5, "Problem with user lockTime");
    });

    it("unlocks token", async () => {
      await safeContract.addUser("Laura", "Smith", {from: user1} );
      await safeContract.lock(3, { from: user1, value: 100} );
      await new Promise((resolve) => setTimeout(resolve, 180000));  // 3 min
      await safeContract.unlock({from: user1});

      const user = await safeContract.getUser({from: user1});

      assert.equal(user.doLock, false, "Problem with user lock state");
      assert.equal(user.reward, 75, "Problem with user reward");
      assert.equal(user.tokenAmount, 0, "Problem with user tokenAmount");
      assert.equal(user.startTime, 0, "Problem with user startTime");
      assert.equal(user.lockTime, 0, "Problem with user lockTime");
    });
  });

});
