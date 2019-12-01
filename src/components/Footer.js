import React from 'react';

import Container from 'components/Container';

const Footer = () => {
  return (
    <footer>
      <Container>
        <p>
          &copy; { new Date().getFullYear() }, <a href="https://colbyfayock.com/">Colby Fayock</a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
