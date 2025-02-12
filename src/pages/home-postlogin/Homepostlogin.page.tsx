import React from 'react';
import { GridLayout } from '../../components/layout/GridLayout';
import { DashboardCard } from '../../components/DashboardCard/DashboardCard';
import { BetDisplay } from '../../components/BetRows/BetDisplay';
import { PostBetDisplay } from '../../components/PostBetRows/PostBetDisplay';
import { LatestBigWins } from '../../components/LatestBigWins/LatestBigWins';
import { ButtonStructure } from '../../components/ButtonStructure/ButtonStructure';
import { SlotSection } from '../../components/SlotSection/SlotSection'; // Existing Popular Games section
import { SportsSection } from '../../components/SportsSection/SportsSection'; // New Popular Matches section
import { RacesRafflesSection } from '../../components/RacesRafflesSection/RacesRafflesSection';


export const PostLoginHome = () => {
  const providers = [
    '/providers/alg.svg',
    '/providers/booming.svg',
    '/providers/egt.svg',
    '/providers/endorphina.svg',
    '/providers/evolution.svg',
    '/providers/ezugi.svg',
    '/providers/popiplay.svg',
    '/providers/quickspin.svg',
    '/providers/sexy.svg',
    '/providers/thunderkick.svg',
  ];

  return (
    <GridLayout>
      {/* Welcome Section */}
      <div className="col-span-12 mt-8">
        <DashboardCard
          userName="JohnDoe"
          rewardProgress={65}
          tier="Platinum I"
          nextTier="Platinum II"
        />
      </div>

      {/* Button Structure Section */}
      <div className="col-span-12 mt-8">
        <ButtonStructure />
      </div>

      {/* Popular Games Section */}
      <div className="col-span-12 mt-8">
        <SlotSection />
      </div>

      {/* Popular Matches Sports Section */}
      <div className="col-span-12 mt-8">
        <SportsSection />
      </div>

      {/* Races & Raffles Section */}
            <div className="col-span-12 mt-8">
        <RacesRafflesSection />
      </div>



      {/* Bet Display Section */}
      <div className="col-span-12 mt-12">
        <PostBetDisplay />
      </div>
    </GridLayout>
  );
};
