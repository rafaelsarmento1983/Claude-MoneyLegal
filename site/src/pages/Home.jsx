import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroMain from '../components/landing/HeroMain';
import BankConnection from '../components/landing/BankConnection';
import ResourcesSection from '../components/landing/ResourcesSection';
import TestimonialSection from '../components/landing/TestimonialSection';
import FinalCTA from '../components/landing/FinalCTA';
import LandingFooter from '../components/landing/LandingFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroMain />
        <BankConnection />
        <ResourcesSection />
        <TestimonialSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}