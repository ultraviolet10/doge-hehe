import React from 'react';
import type { NextPage } from 'next';

import HeheCard from '@components/Hehe/HeheCard';
import Layout from '@components/Layout/Layout';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <div className="flex h-screen flex-col">
        <div className="relative flex flex-grow items-center justify-center">
          <HeheCard />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
