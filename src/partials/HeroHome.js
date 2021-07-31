import React from 'react';
import logo from '../images/logo.svg'
import toon from '../images/toon.png'
import cg from '../images/cg.png'
import cmc from '../images/cmc.svg'

export default function HeroHome() {
  return (
    <section className="relative" id="emoji">

      {/* Illustration behind hero content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" style={{width: 1360, height: 578}} aria-hidden="true">
        <img className="absolute" src={toon} alt="logo" style={{width: '196px', left: '6rem', top: '0'}} />
        <img className="absolute" src={logo} alt="logo" style={{width: '256px', right: '0'}} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">The token that <span className="bg-clip-text text-transparent inline-block" style={{backgroundImage: 'linear-gradient(to right, #53ca42, #55a630'}}>only goes up</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">GUS (Goes Up Shohei) is an elastic supply token that is mathematically guaranteed to increase in price until it exceeds the price of bitcoin</p>
            </div>
            <div className="mt-8">
              <a className="btn bg-white mr-4 hover:bg-gray-200 sm:mb-0 mb-4" target="_blank"  rel="noreferrer" href="/GusToken.pdf" data-aos="zoom-y-out" data-aos-delay="450">View Whitepaper</a>
              <a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x1f589049db47e57fd34209a2dc4d721aada15f07" rel="noreferrer" target="_blank"  className="btn text-white buy" data-aos="zoom-y-out" data-aos-delay="450">Buy Now!</a>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <a href="https://www.coingecko.com/en/coins/goes-up-higher" rel="noreferrer" target="_blank"><img src={cg} alt="CoinGecko" className="mx-2 h-full w-64" /></a>
              <a href="https://coinmarketcap.com/currencies/goes-up-higher/" rel="noreferrer" target="_blank"><img src={cmc} alt="CoinMarketCap" className="mx-2 h-full w-64" /></a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}