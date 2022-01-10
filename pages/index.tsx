import Head from 'next/head';
import Layout from '@components/Layout';
import Hero from '@components/Hero';
import Projects from '@components/Projects';
import { InferGetStaticPropsType } from "next";
import { allProjects } from ".contentlayer/data";
import { pick } from "@contentlayer/utils";
import React from "react";

export async function getStaticProps() {
  const projects = allProjects
    .map((project) => pick(project, ['title', 'date', 'thumbnail', 'slug']))
    .sort(
      (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
    );

  return { props: { projects } }
}

const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Head>
        <title>Mattie - a multi-disciplinary experience designer</title>
      </Head>
      <Hero />
      <Projects projects={projects}/>
    </Layout>
  )
}

export default Home
