import React from 'react';
import styled from 'styled-components';

import { StyledButton, CentredNav } from './toggleButton';

const BigStyledButton = styled(StyledButton)`
  padding: 4px 32px;
  font-size: 32px;
`;

export function PlayButton({ togglePlaying, playing }) {
  const innerText = playing ? 'Pause' : 'Play';
  return <BigStyledButton onClick={togglePlaying} selected={playing}>{innerText}</BigStyledButton>
}

const StyledSpan = styled.span`
  font-family: "Lato", sans-serif;
`;

export function SpeedControls({ speedUp, slowDown, wps }) {
  return (
    <StyledSpan>
      <StyledButton onClick={slowDown}>{'<'}</StyledButton>
      {wps} words per second
      <StyledButton onClick={speedUp}>{'>'}</StyledButton>
    </StyledSpan>
  )
}

export default function Controls({ togglePlaying, playing, speedUp, slowDown, wps }) {
  return (
    <CentredNav style={{ margin: 'auto' }}>
      <div><PlayButton togglePlaying={togglePlaying} playing={playing} /></div>
      <div><SpeedControls speedUp={speedUp} slowDown={slowDown} wps={wps} /></div>
    </CentredNav>
  )
}
