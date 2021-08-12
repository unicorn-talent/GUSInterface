import React from 'react';
import ReactTooltip from 'react-tooltip';
import rainbowVomit from '../images/rainbowVomit.png'

function FeaturesWorld() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Hosted on BSC</h1>
            <p className="text-xl text-gray-600 rainbow-animated break-words"><a target="_blank" rel="noreferrer" href="https://bscscan.com/address/0x1f589049db47e57fd34209a2dc4d721aada15f07">0x1f589049db47e57fd34209a<span data-tip data-for='over9001'>2dc4</span>d721aada15f07</a></p>
            <ReactTooltip id='over9001' backgroundColor="transparent">
              <img src='https://media.giphy.com/media/tPKoWQJk3cEbC/giphy.gif' alt="meme" />
            </ReactTooltip>
          </div>

          {/* World illustration */}
          <div className="flex flex-col items-center pt-6 md:pt-6">
              <div id="vomit" style={{width: '296px', height: '240px', position: 'relative', background: `url(${rainbowVomit})`}}></div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesWorld;
