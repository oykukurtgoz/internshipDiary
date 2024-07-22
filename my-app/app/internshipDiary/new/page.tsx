"use client";
import { Button, TextField } from '@radix-ui/themes'

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


const newDiaryPage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder= 'Title'></TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Save new Diary</Button>
    </div>
  )
}

export default newDiaryPage
