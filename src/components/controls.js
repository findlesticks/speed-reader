import React from 'react';
import { StyledButton, CentredNav } from './toggleButton';

export function PlayButton({ togglePlaying, playing }) {
  const innerText = playing ? 'Pause' : 'Play';
  return <StyledButton onClick={togglePlaying} selected={playing}>{innerText}</StyledButton>
}

export function SpeedControls({ speedUp, slowDown, wps }) {
  return (
    <span>
      <StyledButton onClick={slowDown}>{'<'}</StyledButton>
      {wps} words per second
      <StyledButton onClick={speedUp}>{'>'}</StyledButton>
    </span>
  )
}

export default function Controls({ togglePlaying, playing, speedUp, slowDown, wps }) {
  return (
    <CentredNav style={{ margin: 'auto' }}>
      <PlayButton togglePlaying={togglePlaying} playing={playing} />
      <SpeedControls speedUp={speedUp} slowDown={slowDown} wps={wps} />
    </CentredNav>
  )
}
