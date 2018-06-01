import React from "react";
import styled, { css } from "styled-components";

const StyledText = css`
  font-family: "Lato", sans-serif;
  font-size: 25px;
  font-size: 6px;
  cursor: pointer;
`;
const StyledOverview = styled.div`
  font-family: "Lato", sans-serif;
`;
const SurroundText = styled.a`
  ${StyledText};
`;
const HighlightedText = styled.a`
  ${StyledText};
  background: yellow;
`;
const CurrentText = styled.span`
  color: #e9711c;
`;

const ProgressBar = ({ text, highlights, currentWord, setWord }) => {
  return (
    <div>
      {text.map((word, ind) => {
        const outputWord = word.replace(/[a-z|A-Z|0-9]/g, "#");
        const outputEle =
          ind === currentWord ? (
            <CurrentText>{outputWord}</CurrentText>
          ) : (
            outputWord
          );

        return highlights.indexOf(ind) !== -1 ? (
          <HighlightedText key={ind} onClick={() => setWord(ind)}>
            {outputEle}{" "}
          </HighlightedText>
        ) : (
          <SurroundText key={ind} onClick={() => setWord(ind)}>
            {outputEle}{" "}
          </SurroundText>
        );
      })}
    </div>
  );
};

export default ProgressBar;
