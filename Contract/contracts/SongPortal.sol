// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SongPortal {
    
    // Keep Count of Total Tracks
    uint256 totalTracks;
    uint256 prizeAmount = 0.0001 ether;
    uint256 private seed;
    uint256 cooldownTime = 5 seconds;
    
    
    // An event to push a new Track
    event NewTrack(
    
        address indexed from,
        uint256 indexed trackId,
        uint256 timestamp,
        string trackURL
    
    );

    
    // Structure of Track
    struct Track {
    
        address uploader;
        string trackUrl;
        uint256 pushedAt;
        uint32 likes;
    
    }
    
    
    // An array to store all the Tracks
    Track[] Pushlog;

    
    // A map for logging address against tracks uploaded
    mapping (address => uint) lastTrackUpload;

    
    constructor() payable {
    
        console.log("Hey! Manav this side. This is my first Smart Contract");
    
    }

    
    // A function to push the tracks taking input from the user
    function PushTrack(string memory _URL) public {
        
        require(
            lastTrackUpload[msg.sender] + cooldownTime < block.timestamp,
            "Wait 5sec"
        );

        lastTrackUpload[msg.sender] = block.timestamp;

        totalTracks++;
        Pushlog.push(Track(msg.sender, _URL, block.timestamp,0));	
        console.log("%s shared this track %s", msg.sender, _URL);
    
        uint256 randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        seed = randomNumber;

        if ( randomNumber < 65 )
        {
            console.log("%s won!", msg.sender);
            
            // Send Prize Amount
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}(""); // This is where Txn Happen
            require(success, "Failed to withdraw money from contract.");  // Check if the TXn was successful
        }

        emit NewTrack(msg.sender, totalTracks, block.timestamp, _URL);

    }

    
    // A function to get all Tracks pushed so far
    function getAllTracks() external view returns (Track[] memory) {
    
        return Pushlog;
    
    }

    
    // A function to get total number of Tracks pushed so far
    function getTotalTracks() external view returns (uint256) {
        
        console.log("We have %d total Tracks!", totalTracks);
        return totalTracks;
    
    }

    
    // A function to like the track
    function LikeTrack(uint _trackId) external {
    
        Pushlog[_trackId].likes++;
        console.log("%s has liked the track at ID : %d", msg.sender, _trackId);
    
    }

}