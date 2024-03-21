import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const TextOverlay = styled.div`
  position: absolute;
  color: white;
  text-align: center;
`;

const WelcomeText = styled.h2`
  font-size: 2rem;
`;

const LargeText = styled.h1`
  font-size: 3rem;
`;

const Slider = () => {
  const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/homestay-5ec25.appspot.com/o/logo%2Fgann.jpg?alt=media&token=386e8c24-4821-4892-8db2-8933b4ed43f7';

  return (
    <ImageContainer>
      <BackgroundImage src={imageUrl} alt="Background" />
      <TextOverlay>
        <WelcomeText>Welcome Everyone</WelcomeText>
        <br />
        <LargeText>Experience Ancient Newari Culture Close To Kathmandu</LargeText>
        <br />
        <WelcomeText>Panauti-Kushadevi Rd.Panauti 45209 Nepal</WelcomeText>
      </TextOverlay>
    </ImageContainer>
  );
};

export default Slider;