import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const InternshipDiary = () => {
  return (
    <div>
      <Button><Link href='/internshipDiary/new'>New Diary</Link></Button>
      </div>
  )
}

export default InternshipDiary
