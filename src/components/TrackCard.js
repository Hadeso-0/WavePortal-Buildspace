import React from 'react'
import { 
    Box,
    Text,
    Tag,
    TagLabel
 } from '@chakra-ui/react'

const TrackCard = ({Track}) => {

    const displayAccount = (a) => {
        return `${a.slice(0,4)}...${a.slice(a.length-4)}`
    }
  
  return (
    <div className='Track-Card'>
        {console.log(Track)}
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' p='6'>
            <Text>{Track.trackUrl}</Text>
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
                <TagLabel>{displayAccount(Track.address)}</TagLabel>
            </Tag> 
          </Box>
        </Box>
    </div>
  )
}

export default TrackCard