'use client'

import GradientBg from "@/components/GradientBg";
import TextInput from "@/components/TextInput";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast';

import { useState, useEffect } from 'react';
import { useRef } from 'react';

export default function createWriteupsPage(){
    //Initialisation of data for the page
    const difficultyOptions = [
        { value: '', label: 'Select Difficulty'},
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
        { value: 'Insane', label: 'Insane' },
        { value: 'Impossible', label: 'Impossible'}
      ];

    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([]);
  
    useEffect(() => {
        async function getCategories() {
            const res = await fetch("/api/categories");
            const cats = await res.json();
            const mappedCats = cats.map((cat: { name: string }) => ({
                value: cat.name,
                label: cat.name
            }));

            const defaultOption = {value: '', label: 'Select Category'};
            const combinedArray = [defaultOption].concat(mappedCats)
            setCategories(combinedArray);
        }

        async function getTopics(){
            const res = await fetch("/api/topics");
            const unprocessedTopics = await res.json();
            const mappedTopics = unprocessedTopics.map((topic: { id: number, title: string }) => ({
                id: topic.id,
                name: topic.title
            }))
            console.log("TOPICS", mappedTopics)
            setTopics(mappedTopics);
        }
        
        getCategories(); 
        getTopics();
    }, []);

    //defining variables
    const [category, setCategory] = useState('');
    const [opacity, setOpacity] = useState('opacity-0');
    const [opacity2, setOpacity2] = useState('opacity-0');
    const [writeupThumbnail, setWriteupThumbnail] = useState<File | null>(null);
    const [writeupFile, setWriteupFile] = useState<File | null>(null);

    const [selected, setSelected] = useState([]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const fileInputRef2 = useRef<HTMLInputElement | null>(null);
    const [formData, setFormData] = useState({
        Title: "",
        Difficulty: '',
        Link: "",
        Category: "",
        Topics: [selected],
        WriteupThumbnail: "",
        CTF: "",
        Description: "",
        WriteupFile: "",
    });

    

    //making it appear
    const UploadThumbnailHandler = () => {
        if (fileInputRef.current?.files?.[0]) {
            setOpacity('opacity-100');
            setWriteupThumbnail(fileInputRef.current.files[0]); // Store file separately
        }
    };
    
    const UploadWriteupHandler = () => {
        if (fileInputRef2.current?.files?.[0]) {
            setOpacity2('opacity-100')
            setWriteupFile(fileInputRef2.current.files[0]); // Store file separately
        }
    };
    

    //handling selection of topics
    const topicSelector = (topicId: number) => {
        setSelected((prevSelected) => {
          const updatedSelected = prevSelected.includes(topicId)
            ? prevSelected.filter((id) => id !== topicId)
            : [...prevSelected, topicId];
    
          // Update formData.Topics directly
          setFormData((prevFormData) => ({
            ...prevFormData,
            Topics: updatedSelected,
          }));
    
        //   console.log(updatedSelected)
          return updatedSelected;
        });
      };
        

    //changing formData value on change
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //changing formData value for select tags on change
    const handleDifficultyChange = (selectedOption: Option | null) => {
        if (selectedOption) {
            setFormData((prev) => ({
                ...prev,
                Difficulty: selectedOption, // Store the whole object (with value and label)
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                Difficulty: '', // Clear if no selection
            }));
        }
    };

    const handleCategoryChange = (selectedOption: Option | null) => {
        if (selectedOption) {
            setFormData((prev) => ({
                ...prev,
                Category: selectedOption, // Store the whole object (with value and label)
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                Category: '', // Clear if no selection
            }));
        }
    };

    //submitting data to endpoints
    async function handleSubmit(event){
        event.preventDefault();
        
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("Title", formData.Title);
            formDataToSubmit.append("Difficulty", formData.Difficulty.value || ""); // Assuming Difficulty has value and label
            formDataToSubmit.append("Link", formData.Link);
            formDataToSubmit.append("Category", formData.Category.value || "");
            formDataToSubmit.append("Topics", JSON.stringify(formData.Topics));
            formDataToSubmit.append("CTF", formData.CTF);
            formDataToSubmit.append("Description", formData.Description);
            if (writeupThumbnail) formDataToSubmit.append('WriteupThumbnail', writeupThumbnail);
            if (writeupFile) formDataToSubmit.append('WriteupFile', writeupFile);

            for (const [key, value] of formDataToSubmit.entries()) {
                console.log(key, value);
              }

            const response = await fetch("/api/create/writeup", {
                method: "POST",
                // headers: {
                //     "Content-Type": "multipart/form-data",
                // },
                body: formDataToSubmit,
            });

            console.log('Response Status:', response.status); // Log the status
            console.log('RESPONSERESPONSERESPONSE')
            const responseData = await response.json();
            console.log("Response Data:", responseData);

            if (responseData['status'] == 'success') {
                // Reset form data if successful
                console.log('success')
                setFormData({
                    Title: "",
                    Difficulty: "",
                    Link: "",
                    Category: "",
                    Topics: [],
                    WriteupThumbnail: "",
                    CTF: "",
                    Description: "",
                    WriteupFile: ""
                });
                toast.success('Writeup successfully created');
            } else if (responseData['status'] == 'error') {
                toast.error(responseData['error']);
                console.log('Error:', responseData['message']);
            }
        } catch (error) {
            // Catch and log the error
            console.error('Error during submit:', error);
        }
        }

    //prevent hydration error
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // This will trigger after the component is mounted on the client-side
    }, []);

    if (!isClient) {
        // Return null or a loading state during server-side rendering
        return null;
    }
    

    return(
        <GradientBg gradientPosition="center" className = 'p-10'>
            <h1 className = 'text-[3rem] font-bold'>Create Writeup</h1>
            <Toaster/>

            <form onSubmit = {handleSubmit} className = 'grid grid-cols-3 grid-rows-[6rem_6rem_6rem_6rem_6rem_6rem] my-5 gap-y-0 gap-x-10'>
                <div className = 'flex flex-col gap-2'>
                    <TextInput placeholder = 'Title' version = 'secondary' className = 'rounded-xl' name = 'Title' value = {formData.Title} onChange = {handleChange} required = {true}/>
                    <label>Title</label>
                </div>

                <div className = 'flex flex-col gap-2'>
                    <Select className = 'rounded-xl h-[3rem] text-left' placeholder = 'Select Difficulty' name = 'Difficulty' options = {difficultyOptions} value = {formData.Difficulty} onChange={handleDifficultyChange} required = {true}/>
                    <label>Difficulty</label>
                </div>
                
                <div className = 'flex flex-col gap-2'>
                    <TextInput placeholder = 'Link to challenge source' version = 'secondary' className = 'rounded-xl'name = 'Link' value = {formData.Link} onChange = {handleChange} required = {true}/>
                    <label>Source</label>
                </div> 

                <div className = 'flex flex-col gap-2'>
                    <Select className = 'rounded-xl h-[3rem] text-left' placeholder = 'Select Category' options = {categories} name = 'Category' value = {formData.Category} onChange = {handleCategoryChange} required = {true}/>
                    <label>Category</label>
                </div>

                <div className = 'flex flex-col gap-2 row-span-5'>
                    <div className = 'rounded-xl h-[calc(28rem+2px)] bg-secondary-tier1/50 border-2 border-secondary-tier2'>
                        <div className = 'h-[3rem] items-center px-4 text-primary flex text-lg'>Search Topics</div>
                        <div className = 'text-primary h-[calc(25rem-2px)] rounded-none rounded-bl-xl rounded-br-xl w-[100%] bg-secondary-tier3 resize-none'>
                        {topics.map((topic, index) => {
                            // const isSelected = selected.includes(topic.name); // Check if the topic is in the selected array
                            // const brightness = isSelected ? 'brightness-125' : 'brightness-100'; // Set the background color based on selection

                            return (
                                <span
                                    key={index}
                                    className={`rounded-full py-1 my-2 px-3 mx-1 inline-block bg-secondary-tier1/50 hover:cursor-pointer hover:brightness-125 ${
                                        selected.includes(topic.id)
                                          ? "bg-primary-tier1 text-white"
                                          : "bg-secondary-tier1/50 text-primary"
                                      }`}
                                      onClick={() => topicSelector(topic.id)}
                                >
                                    {topic.id}: {topic.name}
                                </span>
                            );
                        })}
                        </div>
                    </div>
                    <label>Topics</label>
                </div>

                <div className = 'flex flex-col gap-2 row-span-2'>
                    <div className = 'rounded-xl h-[calc(9rem+2px)] bg-secondary-tier1/50 z-10 border-2 border-secondary-tier2'>
                        <div className = 'flex flex-rol h-[3rem]'>
                            <div className = 'items-center px-4 text-primary flex text-lg'>Writeup Thumbnail</div>
                            <Image src = '/assets/record.png' className = 'h-[1.5rem] w-[1.5rem] m-auto mr-3 block' height = {3} width = {3}  alt = 'upload'/>
                        </div>
                        <div className = 'text-primary h-[calc(6rem-2px)] rounded-none rounded-bl-xl rounded-br-xl w-[100%] bg-secondary-tier3 resize-none'>
                            <input type = 'file' className = {`opacity-0 w-[100%] rounded-none rounded-bl-xl rounded-br-xl h-[calc(6rem-2px)] ${opacity}`} onChange = {UploadThumbnailHandler} name = 'WriteupThumbnail'ref={fileInputRef}  required/>
                        </div>
                    </div>
                    <label>Thumbnail</label>
                </div>

                <div className = 'flex flex-col gap-2'>
                    <TextInput placeholder = 'CTF' version = 'secondary' className = 'rounded-xl' name = 'CTF' value = {formData.CTF} onChange = {handleChange} required = {true}/>
                    <label>Related CTF</label>
                </div>

                <div className = 'flex flex-col gap-2 row-span-3 justify-start items-start'>
                    <textarea className = 'text-primary placeholder-primary h-[20rem] rounded-xl w-[100%] bg-secondary-tier3 resize-none border-2 border-secondary-tier2 px-4 py-2 text-lg' placeholder = 'Description' name = 'Description' value = {formData.Description} onChange = {handleChange} required></textarea>
                    <label>Description</label>
                </div>

                <div className = 'flex flex-col gap-2 row-span-2'>
                    <div className = 'rounded-xl h-[calc(9rem+2px)] bg-secondary-tier1/50 z-10 border-2 border-secondary-tier2'>
                        <div className = 'flex flex-rol h-[3rem]'>
                            <p className = 'items-center px-4 text-primary flex text-lg'>Writeup File</p>
                            <Image src = '/assets/record.png' className = 'h-[1.5rem] w-[1.5rem] m-auto mr-3 block' height = {3} width = {3} alt = 'upload'/>
                        </div>
                        <div className = 'text-primary h-[calc(6rem-2px)] rounded-none rounded-bl-xl rounded-br-xl w-[100%] bg-secondary-tier3 resize-none'>
                            <input type = 'file' className = {`opacity-0 w-[100%] rounded-none rounded-bl-xl rounded-br-xl h-[calc(6rem-2px)] ${opacity2}`} onChange = {UploadWriteupHandler} name = 'WriteupFile' ref={fileInputRef2} required/>
                        </div>
                    </div>
                    <label>Writeup file</label>
                </div>
                
                <Button type = 'submit' className = 'row-span-1 h-[3rem] rounded-xl mt-[1rem]'>Create</Button>
            </form>
        </GradientBg>
    )
}