import styled from "styled-components";

export const SingleMovieStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  margin: 5px;
  padding: 5px;
  background-color: ${(props) => props.theme.card};
  border-radius: 10px;
  position: relative;
  font-family: "Montserrat", sans-serif;

  &:hover {
    background-color: white;
    color: black;
  }
`;

export const SingleMoviePosterStyled = styled.img`
  border-radius: 10px;
  width: 190px;
`;

export const SingleMovieTitleStyled = styled.div`
  width: 100%;
  text-align: center;
  font-size: 17px;
  padding: 8px 0;
`;

export const SingleMovieSubTitleStyled = styled.span`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-bottom: 3px;
  padding: 0 2px;
  padding-bottom: 3px;
`;

export const SingleMovieSubTitleCapitalizerStyled = styled(
  SingleMovieSubTitleStyled
)`
  text-transform: capitalize;
`;
