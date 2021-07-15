import styled from "styled-components";

const ContentModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  @media (min-width: 835px) {
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
  }
`;

const ContentModalAbout = styled.div`
  padding: 10px;
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  justify-content: space-evenly;
  font-weight: 300;

  @media (min-width: 835px) {
    width: 58%;
    padding: 0;
    height: 100%;
  }
`;

const ContentModalTitle = styled.span`
  height: 12%;
  font-size: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 835px) {
    font-size: 3.5vw;
  }
`;

const Tagline = styled.i`
  padding-bottom: 10px;
  align-self: center;
`;

const Img = styled.img`
  height: inherit;
`;

export { ContentModal, ContentModalAbout, ContentModalTitle, Tagline, Img };
