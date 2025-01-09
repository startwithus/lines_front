import React from "react";
import { icon } from "../../utility/icon";
const GameInfo = ({ toggleModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={toggleModal}>
          Close
        </button>

        <div className="game-info-line">
          <div className="info-line">
            <h3>GAME INFO - LINES</h3>
          </div>
          <hr
            style={{
              color: "gray",
              // backgroundColor: color,
              height: "1px",
            }}
          />
          <div className="about-game">
            <h1>ABOUT THE GAME</h1>
            <p>
              LINES is a new take on a classic game of chance where the
              objective is to reach a set target on one or more Lines. If you
              match or beat the target on every Line, you win!
            </p>
            <p>The maximum win in this game is 5000 times your bet.</p>
          </div>

          <div className="about-game">
            <h1>FEATURES</h1>
            <h2>THE LINE</h2>
            <p>
              {" "}
              In LINES, you can choose to play with one, two or three Lines.
              Each Line goes from 1 to 100.
            </p>
            <img src={icon.liner} alt="" />
            <p>
              The game starts with one Line. You can add additional Lines by
              pressing the blue + button under the current Line. You can remove
              a Line by pressing the red X button in the upper left corner of
              the Line.
            </p>
            <p>
              On each Line there is a slide handle that can be adjusted either
              left or right to set your desired Target. The Target can be set to
              any whole number from 2 to 98.
            </p>
            <img src={icon.linerTwo} alt="" />

            <h2>WINNING</h2>
            <p>
              Setting the Target on a Line adjusts how much that Line will
              contribute to your total payout. The higher the Target, the
              greater the payout for that Line, but a higher Target also reduces
              the chance of reaching it.
            </p>
            <p>
              The total payout for the game is shown above the Lines. Your final
              win amount will be determined by the total payout times your bet
              amount.
            </p>
            <img src={icon.linerThree} alt="" />
            <p>
              Once you have set your desired Target on each Line, press BET to
              place your bet and start the round. When doing so, each Line will
              be filled to a randomly determined value. If the value on a Line
              is equal to or higher than the Target for that Line, you win on
              that Line.
            </p>
            <p>
              You must win on every Line in play to win that round and be
              awarded the payout.
            </p>
          </div>

          <div className="about-game">
            <h1>RETURN TO PLAYER</h1>
            <p>
              The RTP of this game is 92%. The RTP is deterministically
              calculated by a theoretical probability model. The RTP was
              verified by running 10,000,000,000 simulations.
              <br />
              <br />
              The max win for this game is 5000 times your bet.
            </p>
            <p>
              If the total payout for a certain combination of Targets across
              all Lines would exceed 5000 then a bet cannot be placed and one or
              more Targets need to be reduced.
            </p>
            <img src={icon.maxMulti} alt="" />
            <p>
              If the total payout for a certain combination of Targets across
              all Lines would be lower than 1.05 then a bet cannot be placed and
              one or more Targets need to be increased.
            </p>
            <img src={icon.minMulti} alt="" />
          </div>

          <div className="about-game">
            <h1>WAYS TO WIN</h1>
            <p>
              Configure the Target for each Line in play with the slider. Place
              a bet to start the round. If the random value on each Line reaches
              or exceeds the Target you win the total payout. If at least one
              Line does not, you do not win.
            </p>
          </div>

          <div className="about-game">
            <h1>GENERAL</h1>
            <h2>BALANCE</h2>
            <p>
              Your current balance is shown in the BALANCE display. Balance,
              bets and winnings are presented in the player’s chosen currency.
            </p>

            <h2>BET</h2>
            <p>
              The current bet level is shown in the BET display. Change the bet
              by clicking on the arrows and choosing the bet level of your
              choice.
            </p>
            <p>
              The current bet level is shown in the BET display. Change the bet
              by clicking on the arrows and choosing the bet level of your
              choice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
