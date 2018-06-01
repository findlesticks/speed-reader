import React from "react";
import styled, { css } from "styled-components";

const borderColor = "#ccc";

const StyledContainer = styled.div`
  border: 1px solid ${borderColor};
  display: grid;
  grid-template-columns: 1fr min-content 1fr;
`;
const StyledText = css`
  font-family: "sans-serif";
  font-size: 50px;
`;
const StyledLeft = styled.span`
  ${StyledText};
  text-align: right;
`;
const StyledRight = styled.span`
  ${StyledText};
  text-align: left;
`;
const StyledCenter = styled.span`
  ${StyledText};
  color: red;
`;
const StyledAlign = styled.div`
  text-align: center;
`;

const ArrowUp = styled.span`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 15px solid ${borderColor};
  position: relative;
  bottom: 14px;
`;
const ArrowDown = styled.span`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 15px solid ${borderColor};
  position: relative;
  top: 14px;
`;

const Reader = ({ word = "" }) => {
  const ind = Math.floor(word.length / 3);

  const left = word.slice(0, ind);
  const middle = word.slice(ind, ind + 1);
  const right = word.slice(ind + 1);

  return (
    <StyledContainer>
      <span />
      <StyledAlign>
        <ArrowDown />
      </StyledAlign>
      <span />
      <StyledLeft>{left}</StyledLeft>
      <StyledCenter>{middle}</StyledCenter>
      <StyledRight>{right}</StyledRight>
      <span />
      <StyledAlign>
        <ArrowUp />
      </StyledAlign>
      <span />
    </StyledContainer>
  );
};

export default Reader;
