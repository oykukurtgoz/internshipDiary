"use client";
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface DiaryForm {
  title : string;
  description : string;
}



const NewDiaryPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit} = useForm<DiaryForm>();
  const [error, setError] = useState('');



  return (
  <div className='max-w-xl space-y-3'> 
    {error && ( <Callout.Root color = "red">
      <Callout.Text>{error}</Callout.Text>
    </Callout.Root>
    )}
    <form 
     onSubmit={handleSubmit(async (data) => {
      try {
        await axios.post('/api/internshipDiary', data)
        router.push('/internshipDiary')
      
      } catch (error) {
        setError("invalid title or description")
      }
     })}>
      <TextField.Root placeholder= 'Title' {...register('title')}>        
      </TextField.Root>
      <Controller
      name = "description"
      control={control}
      render={({ field }) => <SimpleMDE placeholder = 'Description'{...field}/>}
      />
      <Button>Save new Diary</Button>
    </form>
  </div>   
  )
}

export default NewDiaryPage
