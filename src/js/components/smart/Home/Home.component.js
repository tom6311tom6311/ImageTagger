import React from 'react';
import RobotThinkImg from '../../../../../res/robot_think.png';

require('./Home.styl');

const Home = () => (
  <div className="home">
    <img
      className="homeRobotThinkImage"
      src={RobotThinkImg}
      alt="Nothing"
    />
  </div>
);

export default Home;
