import { Button, TextArea, TextField } from '@radix-ui/themes'

import React from 'react'

const newDiaryPage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder= 'Title'></TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit new Diary</Button>
    </div>
  )
}

export default newDiaryPage
