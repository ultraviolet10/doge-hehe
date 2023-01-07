import React from 'react';
import type { NextPage } from 'next';
import clsx from 'clsx';

import Layout from '@components/Layout/Layout';
import HeheCard from '@components/Hehe/HeheCard';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <div className="grow">
        <div className="flex items-center justify-center w-full h-screen">
          <HeheCard />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
