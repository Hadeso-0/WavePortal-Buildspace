const main = async () => {
    
    const [_, randomPerson] = await hre.ethers.getSigners();
    const TrackContractFactory = await hre.ethers.getContractFactory("SongPortal");
    const TrackContract = await TrackContractFactory.deploy({
          value : hre.ethers.utils.parseEther("0.2"),
      });
    await TrackContract.deployed();
    
    console.log("Contract address:", TrackContract.address);
  
    // let TrackCount;
    // TrackCount = await TrackContract.getTotalTracks();
    // console.log(TrackCount.toNumber());
  
    //   /*
    //  * Get Contract balance
    //  */
    // let contractBalance = await hre.ethers.provider.getBalance(
    //   TrackContract.address
    // );
    // console.log(
    //   "Contract balance:",
    //   hre.ethers.utils.formatEther(contractBalance)
    // );
  
  
    // /**
    //  * Let's send a few waves!
    //  */
    // let TrackPushTxn = await TrackContract.connect(randomPerson).PushTrack("https://open.spotify.com/track/7lvDsmTRXFE3dK4OjvRiWB?si=f9ac0b508bda446e");
    // await TrackPushTxn.wait(); // Wait for the transaction to be mined
  
    // TrackCount = await TrackContract.getTotalTracks();
    // console.log(TrackCount.toNumber());

    // // const delay = ms => new Promise(res => setTimeout(res, ms));
    
        
    // // await delay(10000);
    // // console.log("Waited 5s");

    // TrackPushTxn = await TrackContract.connect(randomPerson).PushTrack("https://open.spotify.com/track/2FCXQHugkoHE1K3tiDu8pu?si=51096dc8c84c4f35");
    // await TrackPushTxn.wait(); // Wait for the transaction to be mined
  
    //   /*
    //  * Get the Contract balance to see what happened!
    //  */
    // contractBalance = await hre.ethers.provider.getBalance(TrackContract.address);
    // console.log(
    //   "Contract balance:",
    //   hre.ethers.utils.formatEther(contractBalance)
    // );
  
    // TrackCount = await TrackContract.getTotalTracks();
    // console.log(TrackCount.toNumber());

    // let PushLog = await TrackContract.getAllTracks();
    // console.log(PushLog);
    
    // let TrackLikeTxn = await TrackContract.LikeTrack(1);
    // await TrackLikeTxn.wait(); // Wait for the transaction to be mined
    
    // PushLog = await TrackContract.getAllTracks();
    // console.log(PushLog);
 
};
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
  