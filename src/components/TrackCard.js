import React from 'react'
import { 
    Box,
    Text,
    Tag,
    TagLabel,
    Link,
    Button,
    HStack,
    Divider,
    Center,
    Flex,
    Spacer,
    Tooltip
 } from '@chakra-ui/react'

import {FiThumbsUp, FiClock, FiPlay} from 'react-icons/fi'


const TrackCard = ({Track,like, currentAccount}) => {

    const displayAccount = (a) => {
        return `${a.slice(0,4)}...${a.slice(a.length-4)}`
    }
  
    const displayTime = (t) => {
        return `${t.getHours()}:${t.getMinutes()<10?`0${t.getMinutes()}`:t.getMinutes()}:${t.getSeconds()<10?`0${t.getSeconds()}`:t.getSeconds()} | ${t.getDate()}/${t.getMonth()}/${t.getFullYear()}`
    }
  
  return (
    <div className='Track-Card'>
        {/* {console.log(Track)} */}
        <HStack shadow='md' w='xl' borderWidth='1px' borderRadius='lg' overflow='hidden' p='4' sx={{background:'#fbfcfd'}} height='150px'>
          <Center maxW='lg' ml='2'>
            <Text         
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='lg'
              textTransform='uppercase'
            >{`#${Track.trackId}`}</Text>
          </Center>
        
          <Center height='110px'>
            <Divider orientation='vertical' ml='3' mr='2.5'/>
          </Center>
        
          <Box sx={{height:'100%', position:'relative', width:'100%'}}
          >
            <Flex>
              <Spacer/>
              <Tooltip hasArrow label={`Likes: ${Track.likes}`} bg='brand.100' color='brand.700' borderWidth='1px' borderColor='brand.200' borderRadius='md' shadow='md' placement='right'>
                <Button
                  value={Track.trackId}
                  variant='ghost'
                  // variant='outline'
                  onClick={like}
                  colorScheme='brand'
                  aria-label='like'
                  size='xxs'
                  fontSize='md'
                >
                  <FiThumbsUp style={{pointerEvents:'none'}}/>
                </Button>
              </Tooltip>
{/* 
              <ButtonGroup size='xs' isAttached variant='outline' colorScheme='yellow'>
                <Button
                    value={Track.trackId}
                    colorScheme='yellow'
                    variant='ghost'
                    aria-label='like'
                    size='xs'
                    onClick={like}
                    leftIcon={<FiThumbsUp />}
                  >Like</Button>
                <Button 
                    id={`VwLikeNum-${Track.trackId}`}
                    value={Track.trackId}
                    colorScheme='yellow'
                    variant='solid'
                    aria-label='likes' 
                    onClick={like}
                    >{Track.likes}</Button>
              </ButtonGroup> 
*/}
            </Flex>
            <Flex>
              {/* <Box as='Button' borderRadius='full' bg='green.500' color='white' p={4} h={12} w={12}>
                <FiPlay/>
              </Box>
              <Spacer/> */}
              <Link
                mt='1.5'
                color='brand.600'
                colorScheme='brand'
                fontWeight='bold'
                fontSize='md'
                textAlign='left'
                lineHeight='140%'
                href={Track.trackUrl}
                // href={Track.trackUrl}
                // w='md'
                >
                {/* {Track.trackUrl} */}
                {`Track Link`}
              </Link>
            </Flex>
            <Flex sx={{position:'absolute', bottom:'0', width:'100%'}}>
              <HStack
                color='gray.500'
                fontWeight='semibold'
                fontSize='md'
                textTransform='uppercase'
                >
                <FiClock/>
                <Text
                  fontSize='sm'
                  fontWeight='medium'
                  lineHeight='100%'
                  pt='0.5'
                >
                  {displayTime(Track.timestamp)}
                </Text>
                {/* <Tag size='sm' colorScheme='purple' borderRadius='full'>
                    <TagLabel> */}
                    {/* </TagLabel>
                </Tag>  */}
              </HStack>
              <Spacer/>
              <Box
                color='gray.500'
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='sm'
                textTransform='uppercase'
                ml='2'
                >
                {`From: `}
                <Tag size='sm' colorScheme='purple' borderRadius='full'>
                    <TagLabel>
                      {
                        currentAccount === Track.address.toLowerCase()
                        ? `You`
                        : displayAccount(Track.address)
                      }
                    </TagLabel>
                </Tag> 
                {/* {console.log(Track.address.toLowerCase(), currentAccount)} */}
              </Box>
            </Flex>
          </Box>
        </HStack>
    </div>
  )
}

export default TrackCard