import React from 'react';

function CtaAlternative() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="bg-gray-900 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl" data-aos="zoom-y-out">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left lg:w-1/2">
                <h3 className="h3 text-white">Interested in buying GUS?</h3>
              </div>
              <div>
                <a href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x1f589049db47e57fd34209a2dc4d721aada15f07" target="_blank" rel="noreferrer" className="btn text-white buy">Buy Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaAlternative;
