import React from "react";
import { string } from "prop-types";

import { billieColors } from "../../../config";

const ColoredText = ({ text }) => {
  const letters = text.split("");

  return (
    <h1 className="is-size-3 has-text-centered title">
      {letters.map((letter, index) => {
        const letterColor = billieColors[index % billieColors.length];
        const letterStyle = {
          color: letterColor
        };
        return (
          <span style={letterStyle} key={index}>
            {letter}
          </span>
        );
      })}
    </h1>
  );
};

ColoredText.propTypes = {
  text: string
};

ColoredText.defaultProps = {
  text: ''
};
export default ColoredText;
