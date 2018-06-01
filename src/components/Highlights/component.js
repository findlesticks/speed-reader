import React from "react";
import styled, { css } from "styled-components";

const StyledText = css`
  font-family: "sans-serif";
  font-size: 25px;
`;
const StyledTitle = styled.h3`
  font-family: "sans-serif";
`;
const SurroundText = styled.span`
  ${StyledText};
`;
const HighlightedText = styled.span`
  ${StyledText};
  background: yellow;
`;

const StyledHighlightList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const StyledHighlightItem = styled.li`
  margin: 20px 0;
  padding: 20px;
  border: 2px solid #ccc;
  line-height: 2;
`;

const mergeHighlights = arrMap => {
  const output = [];
  if (arrMap.length === 0) return output;

  const sortedArr = arrMap.sort((a, b) => a - b);
  let current = { min: sortedArr[0], max: sortedArr[0] };

  sortedArr.slice(1).forEach(high => {
    if (current.max + 1 === high) {
      current.max = high;
    } else {
      output.push(current);
      current = { min: high, max: high };
    }
  });
  output.push(current);
  return output;
};

const getTextRange = (text, range) => {
  const output = [];
  const before = [];
  const after = [];
  let ii;

  for (ii = Math.max(0, range.min - 3); ii <= range.min - 1; ii++) {
    before.push(text[ii]);
  }
  for (ii = range.min; ii <= range.max; ii++) {
    output.push(text[ii]);
  }
  for (
    ii = range.max + 1;
    ii <= Math.min(range.max + 3, text.length - 1);
    ii++
  ) {
    after.push(text[ii]);
  }

  return (
    <div>
      <SurroundText>{before.join(" ")} </SurroundText>
      <HighlightedText>{output.join(" ")}</HighlightedText>
      <SurroundText> {after.join(" ")}</SurroundText>
    </div>
  );
};

const Highlights = ({ text, highlights }) => {
  const texts = mergeHighlights(highlights);
  return (
    <div>
      <StyledTitle>Your highlights</StyledTitle>
      <StyledHighlightList>
        {texts.map(range => (
          <StyledHighlightItem>{getTextRange(text, range)}</StyledHighlightItem>
        ))}
      </StyledHighlightList>
    </div>
  );
};

export default Highlights;
