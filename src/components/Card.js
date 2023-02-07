import { Heading, HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <Box
      color='black'
      bg="white"
      borderRadius="45"
    >

      <VStack>
        <Image borderTopRadius="45" src={imageSrc} title={title} />
        <Heading textAlign='left'>{title}</Heading>
        <Text p="2%" >{description}</Text>
        <HStack>
          <Text fontSize="2xl" textAlign='left'>See more</Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </VStack>

    </Box>

  )
};

export default Card;
