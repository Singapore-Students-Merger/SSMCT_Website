'use client'

import GradientBg from "@/components/GradientBg";
import TextInput from "@/components/TextInput";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Image from 'next/image'

import { useState } from 'react';

export default function createWriteupsPage(){
    const difficultyOptions = [
        { value: '', label: 'Select Difficulty'},
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' },
        { value: 'insane', label: 'Insane' },
        { value: 'impossible', label: 'Impossible'}
      ];

    const categoryOptions = [
        { value: '', label: 'Select Category'},
        { value: 'web exploitation', label: 'Web Exploitation' },
        { value: 'cryptography', label: 'Cryptography' },
        { value: 'reverse engineering', label: 'Reverse Engineering' },
        { value: 'binary exploitation', label: 'Binary Exploitation'},
        { value: 'forensics', label: 'Forensics' },
        { value: 'misc', label: 'Misc'}
    ]

    const [difficulty, setDifficulty] = useState('');
    const [category, setCategory] = useState('');
    const [opacity, setOpacity] = useState('opacity-0');
    const [opacity2, setOpacity2] = useState('opacity-0');
    const [writeupThumbnail, setWriteupThumbnail] = useState('');
    const [writeupFile, setWriteupFile] = useState('');


    const difficultyHandler = (selectedOption: any) => {
        setDifficulty(selectedOption); // Update the difficulty state with the selected option
    };

    const categoryHandler = (selectedOption: any) => {
        setCategory(selectedOption); // Update the category state with the selected option
    };

    const UploadThumbnailHandler = (selectedValue: any) => {
        if (selectedValue != ''){
            setOpacity('opacity-100')
            setWriteupThumbnail(selectedValue);
        }
    }

    const UploadWriteupHandler = (selectedValue: any) => {
        if (selectedValue != ''){
            setOpacity2('opacity-100')
            setWriteupFile(selectedValue);
        }
    }

    

    return(
        <GradientBg gradientPosition="center" className = 'p-10'>
            <h1 className = 'text-[3rem] font-bold'>Create writeup</h1>

            <div className = 'grid grid-cols-3 grid-rows-[6rem_6rem_6rem_6rem_6rem_6rem] my-5 gap-y-0 gap-x-10'>
                <div className = 'flex flex-col gap-2'>
                    <TextInput placeholder = 'Title' version = 'secondary' className = 'rounded-xl'/>
                    <label>Title</label>
                </div>

                <div className = 'flex flex-col gap-2'>
                    <Select className = 'rounded-xl h-[3rem] text-left' placeholder = 'Select Difficulty' options = {difficultyOptions} onChange = {difficultyHandler}/>
                    <label>Difficulty</label>
                </div>
                
                <div className = 'flex flex-col gap-2'>
                    <TextInput placeholder = 'Link to challenge source' version = 'secondary' className = 'rounded-xl'/>
                    <label>Source</label>
                </div> 

                <div className = 'flex flex-col gap-2'>
                    <Select className = 'rounded-xl h-[3rem] text-left' placeholder = 'Select Category' options = {categoryOptions} onChange = {categoryHandler}/>
                    <label>Category</label>
                </div>

                <div className = 'flex flex-col gap-2 row-span-5'>
                    <div className = 'rounded-xl h-[calc(28rem+2px)] bg-secondary-tier1/50 border-2 border-secondary-tier2'>
                        <p className = 'h-[3rem] items-center px-4 text-primary flex text-lg'>Search Topics</p>
                        <textarea className = 'text-primary h-[calc(25rem-2px)] rounded-none rounded-bl-xl rounded-br-xl w-[100%] bg-secondary-tier3 resize-none '></textarea>
                    </div>
                    <label>Topics</label>
                </div>

                <div className = 'flex flex-col gap-2 row-span-2'>
                    <div className = 'rounded-xl h-[calc(9rem+2px)] bg-secondary-tier1/50 z-10 border-2 border-secondary-tier2'>
                        <div className = 'flex flex-rol h-[3rem]'>
                            <p className = 'items-center px-4 text-primary flex text-lg'>Writeup Thumbnail</p>
                            <Image src = '/assets/record.png' className = 'h-[1.5rem] w-[1.5rem] m-auto mr-3 block hover:cursor-pointer' height = {3} width = {3}  alt = 'upload'/>
                        </div>
                        <div className = 'text-primary h-[calc(6rem-2px)] rounded-none rounded-bl-xl rounded-br-xl w-[100%] bg-secondary-tier3 resize-none'>
                            <input type = 'file' className = {`opacity-0 w-[100%] rounded-none rounded-bl-xl rounded-br-xl h-[calc(6rem-2px)] ${opacity}`} onChange = {UploadThumbnailHandler}/>
                        </div>
                    </div>
                    <label>Thumbnail</label>
                </div>

                <div className = 'flex flex-col gap-2'>
                    <TextInput placeholder = 'CTF' version = 'secondary' className = 'rounded-xl'/>
                    <label>Related CTF</label>
                </div>

                <div className = 'flex flex-col gap-2 row-span-3 justify-start items-start'>
                    <textarea className = 'text-primary placeholder-primary h-[20rem] rounded-xl w-[100%] bg-secondary-tier3 resize-none border-2 border-secondary-tier2 px-4 py-2 text-lg' placeholder = 'Description'></textarea>
                    <label>Description</label>
                </div>

                <div className = 'flex flex-col gap-2 row-span-2'>
                    <div className = 'rounded-xl h-[calc(9rem+2px)] bg-secondary-tier1/50 z-10 border-2 border-secondary-tier2'>
                        <div className = 'flex flex-rol h-[3rem]'>
                            <p className = 'items-center px-4 text-primary flex text-lg'>Writeup File</p>
                            <Image src = '/assets/record.png' className = 'h-[1.5rem] w-[1.5rem] m-auto mr-3 block hover:cursor-pointer' height = {3} width = {3} alt = 'upload'/>
                        </div>
                        <div className = 'text-primary h-[calc(6rem-2px)] rounded-none rounded-bl-xl rounded-br-xl w-[100%] bg-secondary-tier3 resize-none'>
                            <input type = 'file' className = {`opacity-0 w-[100%] rounded-none rounded-bl-xl rounded-br-xl h-[calc(6rem-2px)] ${opacity2}`} onChange = {UploadWriteupHandler}/>
                            {/* <p>{writeupFile}</p> */}
                        </div>
                    </div>
                    <label>Writeup file</label>
                </div>
                
                <Button type = 'submit' className = 'row-span-1 h-[3rem] rounded-xl mt-[1rem]'>Create</Button>
            </div>
        </GradientBg>
    )
}