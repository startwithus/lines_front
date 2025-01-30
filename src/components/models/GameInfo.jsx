import React from "react";
import { icon } from "../../utility/icon";
import { MdOutlineCancel } from "react-icons/md";

const GameInfo = ({ toggleModal }) => {
  return (
    <div className="modal-overlay">
      <button className="close-modal" onClick={toggleModal}>
        <MdOutlineCancel style={{ fontSize: "32px" }} />
      </button>
      <div className="modal-content">
        <div className="game-info-line">
          <div className="info-line fixed-header">
            <h3>GAME INFO - LINES</h3>
            <div>
              <hr className="responsive-divider" />
            </div>
          </div>

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
              In LINES, you can choose to play with one, two or three Lines.
              Each Line goes from 1 to 100.
            </p>
            <div className="" style={{ textAlign: "center" }}>
              <img src={icon.liner} alt="" className="info-image" />
            </div>
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
            <div className="" style={{ textAlign: "center" }}>
              <img src={icon.linerTwo} alt="" className="info-image" />
            </div>
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
            <div className="" style={{ textAlign: "center" }}>
              <img src={icon.linerThree} alt="" className="info-image" />
            </div>
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
            <div className="" style={{ textAlign: "center" }}>
              <img src={icon.maxMulti} alt="" className="info-image" />
            </div>
            <p>
              If the total payout for a certain combination of Targets across
              all Lines would be lower than 1.05 then a bet cannot be placed and
              one or more Targets need to be increased.
            </p>
            <div className="" style={{ textAlign: "center" }}>
              <img src={icon.minMulti} alt="" className="info-image" />
            </div>
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

            <h2>AUTOPLAY</h2>
            <p>
              Using Autoplay will let you play a number of game rounds
              automatically. Press the AUTOPLAY button to initiate this feature.
              Autoplay is stopped by pressing the STOP button.
            </p>

            {/* <h2>TURBO PLAY</h2>
            <p>
              The Turbo Play functionality is used to get the fastest game round
              possible (not available on all operators and jurisdictions). Turbo
              Play is activated from the menu.
            </p> */}
          </div>

          <div className="about-game">
            <h1>ADDITIONAL INFORMATION</h1>
            <p>
              In addition to the features described here, the bar on the bottom
              of the game screen displays the current balance , the amount paid
              if a win occurs, and the amount bet on the last/current
              proposition.
            </p>
          </div>
        </div>

        <div className="about-game">
          <h1>INTERRUPTED GAME</h1>
          <p>
            In the event of disconnection, a previously started round that has
            been interrupted may be resumed immediately by starting the game
            again. The results of a completed round (where display of the visual
            result was interrupted) will only be re-displayed within the game
            for winning rounds, but all game rounds may be reviewed in Game
            History. Any amount wagered on an unfinished game will remain paused
            until you either complete the game or the game is void as a result
            of account inactivity or system maintenance. When an unfinished game
            is void, your bet will be refunded to your account. Any awards
            earned on an unfinished round will not be credited unless you resume
            and complete the game. Winnings on unfinished game rounds where the
            player cannot further influence the outcome of the game will be
            automatically credited to the player’s account after 1 day. Game
            rounds will never be affected by unforeseen external errors due to
            hardware, bandwidth, network errors or similar. Game rounds will be
            either stored and completed by the player at a later time or they
            will be closed and the wager will be refunded to the player. If an
            incomplete game round has not been resumed within 1 day, the round
            will be rolled back and the wager will be refunded.
          </p>
        </div>

        <div className="about-game">
          <h1>GAME HISTORY</h1>
          <p>
            The result of a completed game may be viewed in Game History
            immediately after closing the game window. Results of unfinished
            games are not displayed in Game History.
          </p>
        </div>

        <div className="about-game">
          <h1>GENERAL TERMS AND CONDITIONS</h1>
          <p>
            - Misuse or malfunction voids all pays and plays.
            <br />- Any visual representation of a physical device (a reel, a
            wheel of fortune or similar) does not represent a “real” physical
            device and the probabilities of it stopping on any particular
            position is determined by the game’s random number generator, and
            not the number of positions on each device.
          </p>
        </div>
        {/* <div className="GameInfo__edition">
          <p data-part-id="generatedAtDate">Game rules generated 2024-09-02 10:55 UTC</p>
          <p>
            <span data-part-id="gameVersion">Game version 1.0.3</span>
            <br />
            <span data-part-id="serverVersion">Server version 2.0.185</span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default GameInfo;
