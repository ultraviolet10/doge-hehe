import React from 'react';
import type { NextPage } from 'next';

import HeheCard from '@components/Hehe/HeheCard';
import Layout from '@components/Layout/Layout';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <div className="grow">
        <div className="relative flex h-screen w-full items-center justify-center">
          <HeheCard />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
