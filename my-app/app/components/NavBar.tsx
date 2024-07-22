"use client";
import Link from 'next/link'
import React from 'react'
import { FaComputer } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const NavBar = () => {
  const currentPath = usePathname()
  
  
    const links = [
        { label: 'Internship Diary', href: '/internshipDiary'},
        { label: 'Tasks', href: '/tasks'},
    ]

    return (
      <nav className= 'flex space-x-10 border-b mb-5 px-5 h-14 items-center'>
        <Link href ="/"><FaComputer/></Link>
        <ul className='flex space-x-10'>
            {links.map(link =>
                <Link 
                key= {link.href}
                className={classNames({
                  'text-zinc-900' : link.href === currentPath,
                  'text-zinc-500' : link.href !== currentPath,
                  'hover:text-zinc-800 transition-colors' : true
                })}
                href={link.href}>{ link.label }</Link>)}
        </ul>
      </nav>
    )
}

export default NavBar
