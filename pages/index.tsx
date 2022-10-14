import React from "react";
import type { NextPage } from "next";
import clsx from "clsx";

import Layout from "@components/Layout/Layout";
import HeheCard from "@components/Hehe/HeheCard";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <div className="w-full h-full mx-auto px-[60px] bg-black">
        {/* <span className="text-white place-self-center text-center">
          Make Me Laugh
        </span> */}
        <HeheCard />
      </div>
    </Layout>
  );
};

export default HomePage;
