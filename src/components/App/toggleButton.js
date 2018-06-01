import React from 'react';
import styled, { css } from "styled-components";

export const TYPES = {
  TEXT: 'Text',
  ABSTRACT: 'Abstract',
};

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
  background-color: #007398;
  border-color: #007398;
  color: #ffffff;
  cursor: pointer;
  margin-right: 8px;
  font-size: 16px;
  &:hover {
    border-color: #e9711c;
    background-color: #e9711c;
  }
`;

export default function ToggleButtons({ setInput }) {
  return (
    <div>
      <StyledButton
        onClick={() => setInput(TYPES.ABSTRACT)}
      >{TYPES.ABSTRACT}</StyledButton>
      <StyledButton
        onClick={() => setInput(TYPES.TEXT)}
      >{TYPES.TEXT}</StyledButton>
    </div>
  )
}
