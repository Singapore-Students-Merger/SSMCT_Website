'use client'

import GradientBg from "@/components/GradientBg";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import toast, { Toaster } from 'react-hot-toast';

import { useState, useEffect } from 'react';
import { UploadFileComponent } from "./UploadFileComponent";
import SearchableSelect  from "@/components/SearchableSelect";
import DateInput from "./DateInput";
interface Option {
    label: string;
    id: number | string | null;
}
interface Event {
    id: string | number | null;
    title: string;
}
interface FormDataProps {
    title: string;
    image: File | null;
    event: Event | null;
    description: string;
    date: string;
}

const getFormattedDate = (date:Date) => {

const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's 0-indexed
const day = String(date.getDate()).padStart(2, '0');

return `${year}-${month}-${day}`;
};

export default function CreateImagesPage(){
    const [events, setEvents] = useState<Option[]>([]);
    

    const [formData, setFormData] = useState<FormDataProps>({
        title: "",
        image: null,
        event: null,
        description: "",
        date: getFormattedDate(new Date())
    })
    const uploadThumbnailHandler = (file: null|File) => {
        setFormData((old)=>{return {...old,image:file}}); 
    };
    const eventChangeHandler = (selectedOption: Option) => {
        if (selectedOption) {
            setFormData((old)=>{return {
                ...old,
                event: {title: selectedOption.label, id: selectedOption.id}
            }});
        } else {
            setFormData((old)=>{return {
                ...old,
                event: null
            }});
        }
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((old)=>{return {...old,[name]:value}});
    }
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataObj = new FormData();
        for (const key in formData) {
            const value = formData[key as keyof FormDataProps];
            if (value === null) {
                toast.error("Please fill in all the fields");
                return;
            }
            else if  (value instanceof File) {
                formDataObj.append(key, value);
            }
            else if (value instanceof Object) {
                formDataObj.append(key, JSON.stringify(value));
            }
            else{
                formDataObj.append(key, value);
            }
        }
        fetch('/api/images/upload', {
            method: 'POST',
            body: formDataObj
        })
        .then(res => res.json())
        .then(data => {
            if (data.status == "error") {
                toast.error(data.error);
            } else {
                toast.success("Image uploaded successfully");
            }
        })
        .catch(err => {
            toast.error("Failed to upload image: " + err.message);
        });
    }

    useEffect(() => {
        fetch('/api/events?fields=names')
        .then(res => res.json())
        .then(data => {
            setEvents(data.map((event:Event)=>{return {id:event.id, label:event.title}}));
        })
        .catch(() => {
            toast.error("Failed to fetch events");
        });
    }, []);

    return(
        <GradientBg gradientPosition="center" className = 'p-10 min-h-screen'>
            <h1 className = 'text-[3rem] mb-10 font-bold'>Upload Image</h1>
            <Toaster/>

            <form onSubmit = {submitHandler} className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 gap-y-2 gap-x-10'>
                <div className = 'flex flex-col gap-2'>
                    <TextInput placeholder = 'Title' version = 'secondary' className = 'rounded-xl' name = 'title' value = {formData.title} onChange = {changeHandler} required = {true}/>
                    <label>Title</label>
                </div>
                <div className = 'flex flex-col gap-2 row-span-3 justify-start items-start'>
                    <textarea className = 'text-primary placeholder-primary h-[20rem] rounded-xl w-[100%] bg-secondary-tier3 resize-none border-2 border-secondary-tier2 px-4 py-2 text-lg' placeholder = 'Description' name = 'description' value = {formData.description} onChange = {changeHandler} required></textarea>
                    <label>Description</label>
                </div>
               
                <div className="row-span-2">
                    <UploadFileComponent accept = "image/*" onFileUpload = {uploadThumbnailHandler} label = "Image" file = {formData.image}/>
                </div>
                <div className = 'flex flex-col gap-2'>
                    {/* <TextInput placeholder = 'CTF' version = 'secondary' className = 'rounded-xl' name = 'CTF' value = {formData.CTF} onChange = {handleChange} required = {true}/> */}
                    <SearchableSelect options = {
                        events} 
                        setSelectedOption = {eventChangeHandler}
                        placeholder="CTF"/>
                    <label>Related Event {!(formData.event?.id) && <span className="text-red-500 text-sm">(Event not found. It will be created.)</span>}</label>
                </div>
                <div className = 'flex flex-col gap-2'>
                    <DateInput placeholder = 'Date' version = 'secondary' className = 'rounded-xl' name = 'date' value = {formData.date} onChange = {changeHandler} required = {true}/>
                    <label>Date Taken</label>
                </div>

                

                
                <Button type = 'submit' className = 'col-span-1 md:col-span-2 lg:col-span-1 h-[3rem] rounded-xl mt-[1rem] order-'>Create</Button>
            </form>
        </GradientBg>
    )
}