import React from "react";
import "./styles.css";

class LandingBottom extends React.Component {
  render() {
    const { titleText, mainText1, mainText2, mainText3 } = this.props;

    return (
      <div>
        <div className="bottomTitle">{titleText}</div>
        <p className="bottomMainText">{mainText1}</p>
        <p className="bottomMainText">{mainText2}</p>
        <p className="bottomMainText">{mainText3}</p>
      </div>
    );
  }
}

export default LandingBottom;
