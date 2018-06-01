import React from "react";
import styled, { css } from "styled-components";

const StyledText = css`
  font-family: "sans-serif";
  font-size: 25px;
`;
const StyledOverview = styled.div`
  font-family: "sans-serif";
`;
const SurroundText = styled.a`
  ${StyledText};
`;
const HighlightedText = styled.a`
  ${StyledText};
  background: yellow;
`;
const CurrentText = styled.a`
  ${StyledText};
  background: red;
`;

const ProgressBar = ({ text, highlights, currentWord }) => {
  return (
    <div>
      {text.map(
        (word, ind) =>
          ind === currentWord ? (
            <CurrentText>{word} </CurrentText>
          ) : highlights.indexOf(ind) !== -1 ? (
            <HighlightedText>{word} </HighlightedText>
          ) : (
            <SurroundText>{word} </SurroundText>
          )
      )}
    </div>
  );
};

export default ProgressBar;
