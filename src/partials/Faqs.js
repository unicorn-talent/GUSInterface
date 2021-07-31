import React from 'react';
import Accordion from '../utils/Accordion';
import logo from '../images/logo.svg'
import toon from '../images/toon.png'

function Faqs() {
  return (
    <section id="faq" className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" style={{width: 1360, height: 578}} aria-hidden="true">
        <img className="absolute" src={logo} alt="logo" style={{width: '128px', top: '-5rem', left: '-5rem'}} />
        <img className="absolute" src={toon} alt="logo" style={{width: '256px', right: '10rem', bottom: '2rem'}} />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-6 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-20">
            <h2 className="h2">GUS FAQ</h2>
          </div>
          <ul className="max-w-3xl mx-auto pl-12">
            <Accordion title="What is GUS (Goes Up Higher)?">
              An elastic supply (or rebase) token will expand or contract its circulating supply depending on where it trades relative to it's peg price. For 360 epochs, GUS will increase 5% every 4 hours, starting from an initial peg price of $.001 
            </Accordion>
            <Accordion title="What is an elastic supply token?">
              Elastic supply tokens have a changing circulating supply. The idea is that instead of price volatility, what changes is the token supply through events called rebases.
            </Accordion>
            <Accordion title="What is a rebase?">
              The rebasing mechanism adjusts the token circulating supply periodically. Let’s say we have an elastic supply token that aims to achieve a value of 1 USD. If the price is above 1 USD, the rebase increases the current supply, reducing the value of each token. This is known as a <b>positive rebase</b>. Conversely, if the price is below 1 USD, the rebase will decrease the supply, making each token worth more. This is known as a <b>negative rebase</b>.
            </Accordion>
            <Accordion title="Was there a presale?">
              There was no presale, fair/stealth launched.
              </Accordion>
            <Accordion title="Is liquidity locked?">
              All $150,000 of initial liquidity has been burned and is permanently locked in the burn address.
            </Accordion>
            <Accordion title="What's going on with the chart?">
              Due to the nature of the protocol, the price of the coin rebases every 4 hours to the pegged price. If you observe early on, the coin experienced many <b>positive rebases</b> due to the coin's price being well above the pegged-price. In this situation, the token's value dropped to match the pegged price, however, the token supply increased. If you are holding GUS tokens in your wallet, you will notice them fluctuating after a rebase. The protocol is designed for token supply to change without the holders having to do anything.
            </Accordion>
            <Accordion title="Will I lose coins?">
              In the event that we experience a <b>negative rebase</b>, the value of the coin will increase to match the pegged-price. In this event, the protocol will reduce the amount of circulating tokens to match. It is important to note, this will not influence the value of your holdings. Like most tokens, that value will be determined by the buying and selling pressure.
            </Accordion>
          </ul >
        </div >
      </div >
    </section >
  );
}

export default Faqs;
