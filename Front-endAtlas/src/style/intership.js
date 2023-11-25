import styled from "styled-components";

const Wrapper = styled.div`
  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: medium;
  }

  .pagination__page {
    margin-top: 5px;
    border: 1px solid black;
    padding: 3px;
    cursor: pointer;
  }

  .main {
    width: 1100px;
    margin: 0 auto;
    padding: 15px;
    margin-bottom: 25px;
    border-radius: 6px;
    background: #faeff0;
    box-shadow: 0px 0px 12px #aaa, -0px -0px 12px #fff;
    display: flex;
    gap: 48%;
    flex-basis: 80%;
    color: black;
    cursor: pointer;
    text-decoration: none;
  }
  .main-details {
    gap: 5%;
    display: flex;
    flex-direction: column;
    width: 65%;
  }

  .info {
    float: left;
    display: flex;
    gap: 5px;
    white-space: nowrap;
    font-weight: normal;
    font-size: 20px;
    margin: 0;
    text-overflow: ellipsis;
  }
  .search {
    width: 100%;
    padding: 15px;
    border-radius: 9px;
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyleImg = styled.img`{
    clip-path: circle(50% at 50% 50%);
    width: 100px;
    height: 100px;
    float: left;
    margin: 0px 20px 0px 10px;
  `;

module.exports = {
  StyleImg,
  Wrapper,
};
