import React from "react";
import styled, { css } from "styled-components";

const gencolor = () => {
  let style = `
    position: absolute;
    color: white;
    width:50%;
    height:50%;
    top:0;
    right:0;
    transform-origin: 0% 100%;
    overflow: hidden;`;
  for (let index = 1; index <= 16; index++) {
    let degs = 22.5;
    style += `
  &:nth-child(${index}){
  transform: rotate(${(degs *= index)}deg) skewY(-60deg);
  background-color: ${
    "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
  };
  };
`;
  }
  return css`
    ${style}
  `;
};

const LiStyle = styled.li`
  ${gencolor()}
`;

const Circle = styled.ul`
  margin: 1rem auto;
  padding: 0;
  width: 25rem;
  height: 25rem;
  position: relative;
  border: 5px solid white;
  list-style: none;
  border-radius: 50%;
  overflow: hidden;
`;

const Text = styled.div`
  position: absolute;
  left: -100%;
  height: 200%;
  width: 200%;
  text-align: center;
  display: block;
  transform: skewY(60deg) rotate(10deg);
`;

export default class Wheel extends React.Component {
  render(): React.ReactNode {
    let liarray = [];
    for (let i = 1; i <= 16; i++) {
      liarray.push(
        <LiStyle>
          <Text>
            phan <br /> van <br /> cong
          </Text>
        </LiStyle>
      );
    }

    return (
      <div>
        <Circle>{liarray}</Circle>
      </div>
    );
  }
}
