import React from 'react';
import type { NextPage } from 'next';

import HeheCard from '@components/Hehe/HeheCard';
import ZoomDoge from '@components/Hehe/ZoomDoge';
import Layout from '@components/Layout/Layout';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <div className="grow">
        <div className="relative flex h-screen w-full flex-row items-center justify-between">
          <ZoomDoge />
          <HeheCard />
          <ZoomDoge />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
