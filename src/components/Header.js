import React from 'react';
import { FaGithub } from 'react-icons/fa';

import Container from 'components/Container';

const Header = () => {
  return (
    <header>
      <Container type="content">
        <p>Santa Tracker</p>
        <ul>
          <li>
            <a href="https://github.com/colbyfayock/santa-tracker" aria-label="Github">
              <FaGithub />
            </a>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
