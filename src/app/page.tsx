'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Footer from '../components/Footer';
import GradeSelector from '../components/GradeSelector';
import TopicInput from '../components/TopicInput';
import ContentOutput from '../components/ContentOutput';

export default function Home() {
  const [grade, setGrade] = useState('');
  const [topic, setTopic] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = (inputTopic: string) => {
    setTopic(inputTopic);

    // 👉 Replace this with actual API call later
    const dummyResponse = `📘 Lesson Plan for ${grade}\n\nTopic: ${inputTopic}\n\n1. Introduction...\n2. Explanation...\n3. Activities...\n4. Recap.`;
    setOutput(dummyResponse);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <Navbar />
      <HeroSection />
      <Features />

      {/* 🔥 AI Teaching Assistant Panel */}
      <section id="dashboard" className="max-w-4xl mx-auto py-12 px-6 bg-white rounded-xl shadow-lg my-10">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Sahayak AI Teaching Panel</h2>
        <GradeSelector onSelect={setGrade} />
        <TopicInput onSubmit={handleGenerate} />
        <ContentOutput content={output} />
      </section>

      <Footer />
    </main>
  );
}
