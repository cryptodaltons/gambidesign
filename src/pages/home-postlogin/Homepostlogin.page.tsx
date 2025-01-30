import React from 'react';
import { GridLayout } from '../../components/layout/GridLayout';
import { DashboardCard } from '../../components/DashboardCard/DashboardCard';
import { BetDisplay } from '../../components/BetRows/BetDisplay';
import { PostBetDisplay } from '../../components/PostBetRows/PostBetDisplay';
import { LatestBigWins } from '../../components/LatestBigWins/LatestBigWins';
import { ButtonStructure } from '../../components/ButtonStructure/ButtonStructure';
import { SlotSection } from '../../components/SlotSection/SlotSection'; // Import the SlotSection component

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
          userName="JohnDoe" // Replace dynamically with logged-in user info
          rewardProgress={65} // Example reward progress
          tier="Platinum I"
          nextTier='Platinum II' // Example tier
        />
      </div>
      
           {/* Button Structure Section */}
           <div className="col-span-12 mt-8">
        <ButtonStructure /> {/* Added the ButtonStructure component */}
      </div>
              {/* Popular Games Section */}
      <div className="col-span-12 mt-8">
        <SlotSection /> {/* Added the SlotSection component */}
      </div> 
        
      {/* Bet Display */}
      <div className="col-span-12 mt-12">
        <PostBetDisplay />
      </div>
    </GridLayout>
  );
};
