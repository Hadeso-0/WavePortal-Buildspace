import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import TrackCard from './TrackCard';
import ConnectWalletImg from '../assets/Illustration-Connect-Wallet.png';
import { 
  Button, 
  Text, 
  Heading, 
  Input, 
  Divider, 
  HStack, 
  Image, 
  VStack
} from "@chakra-ui/react"
import { toast } from "react-hot-toast";

const Home = ({ checkIfWalletIsConnected ,TrackPortalContract, currentAccount}) => {

  const { ethereum } = window;
  const [totalTracks, setTotalTracks] = useState(0);
  const [allTracks, setAllTracks] = useState([]);

  const [inpUrl, setInpUrl] = useState("");

  const handleInp = (e) => {
    setInpUrl(e.target.value);
  }

  const isValidUrl = (url) => {
    if(url === "") return false;
    if(/^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/.test(url)) return true
    return false
  }

  const getAllTracks = async () => {
    try {
      if (ethereum) {
        
        const record = await TrackPortalContract.getAllTracks();

        let recordCleaned = [];
        record.forEach(track => {
          recordCleaned.push({
            address: track.uploader,
            timestamp: new Date(track.pushedAt * 1000),
            trackUrl: track.trackUrl,
            trackId: recordCleaned.length,
            likes: track.likes
          });
        });

        setAllTracks(recordCleaned);

        TrackPortalContract.on("NewTrack", (from, trackId, timestamp, trackURL) => {
          console.log("NewTrack", from, trackId, timestamp, trackURL);

          setAllTracks(prevState => [...prevState, {
            address: from,
            trackId: trackId,
            timestamp: new Date(timestamp * 1000),
            trackURL: trackURL,
            likes: 0
          }]);
        });
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  
  }
  const LikeTrack = async (e) => {
    try {
      if (ethereum) {
        
        const likeTrackId = e.target.value
        const likeTrackTxn = await TrackPortalContract.LikeTrack(likeTrackId)

        await likeTrackTxn.wait()
        console.log(`You liked Track: ${likeTrackId}`)

      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const PushTrack = async (e) => {
    e.preventDefault();
    try {
      if (ethereum) {        
        if(isValidUrl(inpUrl))
        {
          const PushTxn = await TrackPortalContract.PushTrack(inpUrl);
          console.log("Mining...", PushTxn.hash);
  
          await PushTxn.wait();
          console.log("Mined -- ", PushTxn.hash);
        }
        else{
          toast.error('Please enter a valid URL',
          {
            style: {
              borderRadius: '100px',
              background: '#333',
              color: '#fff',
            },
          }
        );
        }
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getTotalTracks = async () => {
    try {
      if (ethereum) {

        let count = await TrackPortalContract.getTotalTracks();
        console.log("Retrieved total Track count...", count.toNumber());
      
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    getTotalTracks();
    getAllTracks();
  }, [currentAccount])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <Heading as='h3' size='xl'>
          👋 Hey there!
        </Heading>
        <Text fontSize='2xl' className="bio" >
          {`I am Manav & this is my first Web3 based application`} 
        </Text>
        <Text fontSize='md' className="task" >
          Connect your Ethereum wallet and wave at me! Wave with your<b> favourite spotify track</b>, and get a chance to win some<span> Ether </span>😎
        </Text>

        <form onSubmit={PushTrack} className="Track-inp-form">
          <Input placeholder='Track URL' onChange={handleInp} value={inpUrl} colorScheme='gray' />
          <Button className="waveButton" type="submit" onClick={PushTrack} colorScheme='gray'>
            Wave 👋
          </Button>
        </form>

        {/* {console.log(allTracks)} */}
        <HStack spacing='8px' sx={{width: '100%'}} zIndex='2'>
          <Divider color='gray.900'/>
          <Heading as='h4' size='lg' color='gray.800'>
            WaveLog
          </Heading>
          <Divider color='gray.900'/>
        </HStack>
      </div>
      <div className='WaveLog-Container'>
        {
          currentAccount
          ? (
              allTracks.map((Track, index) => {
                return (
                  <TrackCard key={index} Track={Track} like={LikeTrack} currentAccount={currentAccount}/>
                )
              })
          )
          : (
            <VStack spacing='8px' sx={{marginTop: '16px'}}>
              <Image
                boxSize='20%'
                objectFit='cover'
                src={ConnectWalletImg}
                alt='Connect Wallet'
              />
              <Text fontSize='md' color='gray.500'>Connect Wallet to see</Text>
            </VStack>
          )
        }
      </div>
    </div>
  );
}

export default Home
