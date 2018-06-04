import styled, { css } from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 40px;
  margin: 0 32px;
`;

export const GridColumn = styled.div`
  height: 100vh;
  overflow-y: auto;
  padding: 32px 0;
  box-sizing: border-box;
`;

export const StyledH1 = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Lato', sans-serif;
`;

const orange = '#e9711c';
const blue = '#007398';

export const StyledLink = styled.a`
  color: ${blue};
  text-decoration: none;
  &:hover {
    color: ${orange};
  }
`;
