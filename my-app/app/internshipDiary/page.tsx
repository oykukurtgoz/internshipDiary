"use client";
import React, { ChangeEvent } from 'react'
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

  
  const deleteDiary = async (diaryId: number) => {
    console.log("diaryId:", diaryId);
    try {
      const res = await axios.delete(`/api/internshipDiary/${diaryId}`, {
          data: { diaryId: diaryId },
          headers: {
              'Content-Type': 'application/json',
          },
      });
        console.log(res);
        if (res.status === 200) {
            //setDiaries(() => diaries.filter((diary) => diary.id !== diaryId));
            setDiaries((prevDiaries) => prevDiaries.filter((diary) => diary.id !== diaryId));
        } else {
            console.error('Failed to delete diary');
        }
    } catch (error) {
        console.error('Failed to delete diary', error);
    }
};

const handleDeleteClick = (diaryId: number) => {
  return () => {
    deleteDiary(diaryId);
  };
};


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

            <div key={diary.id} className='flex justify-end items-center'>
                    <button className='bg-violet-500 hover:bg-violet-600 rounded-full w-8 h-8 flex items-center justify-center'
                    onClick={handleDeleteClick(diary.id)}>-</button>
            </div>
          </div>
        ))
      )}
      <Button><Link href='/internshipDiary/new'>New Diary</Link></Button>
    </div>
    
  );
};

export default InternshipDiary
  
