import React from 'react'
import sf_logo from '../images/sf_logo.png'
import tr_logo from '../images/techrate_logo.png'

export default function FeaturesBlocks() {
  return (
    <section id="audits" className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Fully Audited Contracts</h2>
            <p className="text-xl text-gray-600">The GUS token contract has undergone a comprehensive security audit by some of the best security firms in the world.</p>
          </div>

          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-2 items-start md:max-w-2xl lg:max-w-none">

            <a href="https://solidity.finance/audits/GoesUpHigher/" target="_blank" rel="noreferrer"><div className="relative flex flex-col items-center p-6 bg-white hover:bg-gray-200 rounded shadow-xl">
              <img src={sf_logo} alt="Solidity Finance" className="w-16 h-16 p-1 -mt-1 mb-2" />
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Solidity Finance</h4>
              <p className="text-gray-600 text-center">GUS sucessfully passed a security audit by Solidity Finance.</p>
            </div></a>

            <a href="https://github.com/TechRate/Smart-Contract-Audits/blob/main/GoesUpHigher.pdf" target="_blank" rel="noreferrer"><div className="relative flex flex-col items-center p-6 bg-white hover:bg-gray-200 rounded shadow-xl">
              <img src={tr_logo} alt="Techrate" className="w-16 h-16 p-1 -mt-1 mb-2" />
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Techrate</h4>
              <p className="text-gray-600 text-center">GUS has undergone a comprehensive audit by Techrate!</p>
            </div></a>
          </div>

        </div>
      </div>
    </section>
  );
}