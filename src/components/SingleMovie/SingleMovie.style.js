import styled from "styled-components";

const Media = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  padding: 5px;
  margin: 5px 0;
  background-color: #282c34;
  border-radius: 10px;
  position: relative;
  font-family: "Montserrat", sans-serif;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const Poster = styled.img`
  border-radius: 10px;
  width: 200px;
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 17px;
  padding: 8px 0;
`;

const SubTitle = styled.span`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-bottom: 3px;
  padding: 0 2px;
  padding-bottom: 3px;
`;

const SubTitleCapitalizer = styled(SubTitle)`
  text-transform: capitalize;
`;

export { Media, Poster, Title, SubTitle, SubTitleCapitalizer };
