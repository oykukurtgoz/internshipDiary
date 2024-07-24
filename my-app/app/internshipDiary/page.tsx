"use client";
import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Diary {
  id: number;
  title: string;
  description: string;
}

const InternshipDiary = () => {

  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get('/api/internshipDiary');
        setDiaries(response.data);
      } catch (error) {
        console.error('Failed to fetch diaries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="items-center max-w-xl space-y-3">
      <h1>Internship Diaries</h1>
      {diaries.length === 0 ? (
        <p>No diaries found.</p>
      ) : (
        diaries.map((diary) => (
          <div key={diary.id} className="border p-3">
            <h2 className="text-lg font-bold">{diary.title}</h2>
            <p>{diary.description}</p>
          </div>
        ))
      )}
      <Button><Link href='/internshipDiary/new'>New Diary</Link></Button>
    </div>
    
  );
};

export default InternshipDiary
  
