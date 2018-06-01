import React from 'react';
import styled, { css } from "styled-components";

export const TYPES = {
  TEXT: 'Text',
  ABSTRACT: 'Abstract',
};

const orange = '#e9711c';
const blue = '#007398';

const StyledButton = styled.button`
  border: 2px solid;
  display: inline-block;
  font-family: inherit;
  height: 40px;
  line-height: 40px;
  margin: 0;
  overflow: hidden;
  padding: 0 16px;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
  user-select: none;
  background-color: ${props => props.selected ? '#e9711c' : '#007398'};
  border-color: ${props => props.selected ? '#e9711c' : '#007398'};
  color: #ffffff;
  cursor: pointer;
  margin-right: 8px;
  font-size: 16px;
  &:hover {
    border-color: #e9711c;
    background-color: #e9711c;
  }
`;

export default function ToggleButtons({ setInput, inputType }) {
  return (
    <div>
      <StyledButton
        onClick={() => setInput(TYPES.ABSTRACT)}
        selected={inputType === TYPES.ABSTRACT}
      >{TYPES.ABSTRACT}</StyledButton>
      <StyledButton
        onClick={() => setInput(TYPES.TEXT)}
        selected={inputType === TYPES.TEXT}
      >{TYPES.TEXT}</StyledButton>
    </div>
  )
}
