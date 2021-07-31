import React from 'react';
import roadmap from '../images/roadmap.png'

export default function RoadMap() {
  return (
    <section id="roadmap" className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 data-aos="zoom-y-out" data-aos-delay="450" className="h2">GUS 2021 Roadmap</h1>
          </div>
          <div className="pb-12 md:pb-16">
            <img data-aos="zoom-y-out" data-aos-delay="450" className="w-full mx-auto" src={roadmap} alt="Roadmap" style={{maxWidth: '30rem'}} />
          </div>
        </div >
      </div >
    </section >
  );
}
