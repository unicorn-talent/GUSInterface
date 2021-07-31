import React from 'react';
import HeroHome from '../partials/HeroHome';
import Header from '../partials/Header';
import FeaturesHome from '../partials/FeaturesHome';
import FeaturesWorld from '../partials/FeaturesWorld';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import RoadMap from '../partials/RoadMap';
import CtaAlternative from '../partials/CtaAlternative';
import Team from '../partials/Team';
import Faqs from '../partials/Faqs';
import Footer from '../partials/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow pb-12 md:pb-20">
        <HeroHome />
        <FeaturesHome />
        <FeaturesWorld />
        <FeaturesBlocks />
        <RoadMap />
        <Team />
        <Faqs />
      </main>
      <CtaAlternative />
      <Footer />
    </div>
  );
}