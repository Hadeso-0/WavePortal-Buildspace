const main = async () => {
    const [deployer,randomPerson] = await hre.ethers.getSigners();
    
    const accountBalance = await deployer.getBalance();
    
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
    
    const TrackContractFactory = await hre.ethers.getContractFactory("SongPortal");
    const TrackContract = await TrackContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.2"),
    });
    
    await TrackContract.deployed();
    
    console.log("SongPortal address: ", TrackContract.address);
  
    // let TrackPushTxn = await TrackContract.connect(randomPerson).PushTrack("https://open.spotify.com/track/7lvDsmTRXFE3dK4OjvRiWB?si=f9ac0b508bda446e");
    // await TrackPushTxn.wait(); // Wait for the transaction to be mined
    
    // const delay = ms => new Promise(res => setTimeout(res, ms));
    
        
    // await delay(10000);
    // console.log("Waited 5s");

    // TrackPushTxn = await TrackContract.connect(randomPerson).PushTrack("https://open.spotify.com/track/7lvDsmTRXFE3dK4OjvRiWB?si=f9ac0b508bda446e");
    // await TrackPushTxn.wait(); // Wait for the transaction to be mined
  
    // let PushLog = await TrackContract.getAllTracks();
    // console.log(PushLog);
    
    // let TrackLikeTxn = await TrackContract.LikeTrack(0);
    // await TrackLikeTxn.wait(); // Wait for the transaction to be mined
    
    // console.log("___________________________________________________")

    // PushLog = await TrackContract.getAllTracks();
    // console.log(PushLog);
    
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();