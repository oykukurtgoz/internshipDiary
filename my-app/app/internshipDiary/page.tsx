"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";

interface Diary {
  id: number;
  title: string;
  description: string;
}

const InternshipDiary = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentDiary, setCurrentDiary] = useState<Diary | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get("/api/internshipDiary");
        setDiaries(response.data);
      } catch (error) {
        console.error("Failed to fetch diaries:", error);
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
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.status === 200) {
        setDiaries((prevDiaries) =>
          prevDiaries.filter((diary) => diary.id !== diaryId)
        );
      } else {
        console.error("Failed to delete diary");
      }
    } catch (error) {
      console.error("Failed to delete diary", error);
    }
  };

  const handleDeleteClick = (diaryId: number) => {
    return () => {
      deleteDiary(diaryId);
    };
  };

  const handleUpdateClick = (diary: Diary) => {
    setIsUpdateMode(true);
    setCurrentDiary(diary);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentDiary((prevDiary) =>
      prevDiary ? { ...prevDiary, [name]: value } : null
    );
  };

  const updateDiary = async () => {
    if (currentDiary) {
      console.log(currentDiary.id);

      try {
        const res = await axios.patch(
          `/api/internshipDiary/${currentDiary.id}`,
          {
            data: { 
              diaryId: currentDiary.id,
              title: currentDiary.title,
              description: currentDiary.description,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          setDiaries((prevDiaries) =>
            prevDiaries.map((diary) =>
              diary.id === currentDiary.id
                ? {
                    ...diary,
                    title: currentDiary.title,
                    description: currentDiary.description,
                  }
                : diary
            )
          );
          setIsUpdateMode(false);
          setCurrentDiary(null);
        } else {
          console.error("Failed to update diary");
        }
      } catch (error) {
        console.error("Failed to update diary", error);
      }
    }
  };

  return (
    <div className="items-center max-w-xl space-y-3 justify-center">
      <h1>Internship Diaries</h1>
      {diaries.length === 0 ? (
        <p>No diaries found.</p>
      ) : (
        diaries.map((diary) => (
          <div key={diary.id} className="border p-3">
            <h2 className="text-lg font-bold">{diary.title}</h2>
            <p>{diary.description}</p>
            <div className="flex justify-end items-center space-x-2">
              <button
                className="bg-violet-500 hover:bg-violet-600 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={handleDeleteClick(diary.id)}
              >
                -
              </button>
              <button
                className="bg-emerald-400 hover:bg-emerald-800 px-4 py-2 rounded flex items-center justify-center"
                onClick={() => handleUpdateClick(diary)}
              >
                Update
              </button>
            </div>
          </div>
        ))
      )}

      {isUpdateMode && currentDiary && (
        <div className="update-form mt-4 border p-3">
          <h2 className="text-lg font-bold">Update Diary</h2>
          <input
            type="text"
            name="title"
            value={currentDiary.title}
            onChange={handleInputChange}
            className="border p-1 mb-2 w-full"
            placeholder="Title"
          />
          <textarea
            name="description"
            value={currentDiary.description}
            onChange={handleInputChange}
            className="border p-1 mb-2 w-full"
            placeholder="Description"
          />
          <div className="flex space-x-2">
            <button
              onClick={updateDiary}
              className="bg-emerald-400 hover:bg-emerald-800 text-black px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={() => setIsUpdateMode(false)}
              className="bg-gray-500 hover:bg-gray-600 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Button>
        <Link href="/internshipDiary/new">New Diary</Link>
      </Button>
    </div>
  );
};

export default InternshipDiary;
