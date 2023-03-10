import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    key: 1,
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    key: 2,
    icon: faGithub,
    url: "https://github.com",
  },
  {
    key: 3,
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    key: 4,
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    key: 5,
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];


const Header = () => {
  const [direction, setDirection] = useState('');

  useEffect(() => {
    let previousY = -1;
    const handleScroll = (e) => {
      const currentY = window.scrollY;
      let newDir;
      if (currentY > previousY) {
        newDir = 'down';
      } else {
        newDir = 'up';
      }
      setDirection(newDir)
      previousY = currentY;
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const hideNav = direction === 'down' && window.scrollY > 0;

  const handleClick = (anchor) => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);


    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      className={hideNav ? 'nav-hidden' : 'nav-active'}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={5}>
              {socials.map(socials => (
                <a href={socials.url} key={`key${socials.key}`} >
                  <FontAwesomeIcon icon={socials.icon} size="2x" />
                </a>
              ))
              }
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              <a href="/#projects" onClick={() => { handleClick("projects") }}>Projects</a>
              <a href="/#contact-me" onClick={() => { handleClick("contactme") }}>Contact Me</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box >
  );
};
export default Header;
