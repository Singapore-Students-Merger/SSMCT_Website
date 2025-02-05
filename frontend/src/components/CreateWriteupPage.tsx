'use client'

import GradientBg from "@/components/GradientBg";
import TextInput from "@/components/TextInput";
import Select from "@/components/Select";
import Button from "@/components/Button";
import toast, { Toaster } from 'react-hot-toast';
import Category from "@/types/category";
import { getAssetNames } from "@/utils/processMarkdownContent";
import { useState, useEffect } from 'react';
import {UploadFileComponent, UploadMarkDownComponent, UploadMulitpleFileComponent} from "./UploadFileComponent";
import SearchableSelect  from "@/components/SearchableSelect";
interface Topic {
    id: number;
    name: string;
}
interface Event {
    id: number | null;
    title: string;
}
interface Option {
    label: string;
    value: number | string | null;
}

export default function CreateWriteupsPage(){
    //Initialisation of data for the page
    const difficultyOptions = [
        { value: '', label: 'Select Difficulty'},
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
        { value: 'Insane', label: 'Insane' },
        { value: 'Impossible', label: 'Impossible'}
      ];
    
    const [categories, setCategories] = useState<Option[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [ctfs, setCtfs] = useState<Event[]>([]);
    const [writeupAssets, setWriteupAssets] = useState<File[]>([]);
    useEffect(() => {
        async function getCategories() {
            const res = await fetch("/api/categories");
            if (!res.ok) {
                console.error('Failed to fetch data:', res.status, res.statusText);
                toast.error('Failed to fetch categories');
            }
            const cats:Category[] = await res.json();
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
            setTopics(mappedTopics);
        }
        
        getCategories(); 
        getTopics();
    }, []);

    useEffect(() => {
        fetch("/api/achievements?fields=names")
        .then((response) => response.json())
        .then((data) => {
            setCtfs(data);
        })
        .catch((error) => {
            toast.error('Failed to fetch CTFs');
            console.error('Failed to fetch data:', error);
        })
    },[])

    
    //defining variables
    const [writeupThumbnail, setWriteupThumbnail] = useState<File | null>(null);
    const [writeupFile, setWriteupFile] = useState<File | null>(null);
    const [ctf, setCTF] = useState<Event | null>(null);
    const [selected, setSelected] = useState<number[]>([]);
    const [topicSearch, setTopicSearch] = useState<string>('');
    const [expectedAssets, setExpectedAssets] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        Title: "",
        Difficulty: '',
        Link: "",
        Category: "",
        Topics: [] as number[],
        Description: "",
    });

    useEffect(() => {
        async function processWriteup(){
            if (!writeupFile){
                setExpectedAssets([]);
                return
            }
            const writeupContent = await writeupFile.text();
            const assetNames = getAssetNames(writeupContent);

            setExpectedAssets(assetNames);
        }
        processWriteup();
        
    }, [writeupFile])


    const onTopicSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTopicSearch(e.target.value);
    }
    //making it appear
    const uploadThumbnailHandler = (file: null|File) => {
        if (file) {
            setWriteupThumbnail(file); // Store file separately
        }
    };
    
    const uploadWriteupHandler = (file:null|File) => {
        if (file) {
            setWriteupFile(file); // Store file separately
        }
    };
    const eventChangeHandler = (selectedOption: {label:string, id: number|null}) => {
        if (selectedOption) {
            setCTF({title: selectedOption.label, id: selectedOption.id});
        } else {
            setCTF(null);
        }
    }

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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //changing formData value for select tags on change
    const handleDifficultyChange = (selectedOption: { value: string; }) => {
        if (selectedOption) {
            setFormData((prev) => ({
                ...prev,
                Difficulty: selectedOption.value, // Store the whole object (with value and label)
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                Difficulty: '', // Clear if no selection
            }));
        }
    };

    const handleCategoryChange = (selectedOption: { value: string; }) => {
        if (selectedOption) {
            setFormData((prev) => ({
                ...prev,
                Category: selectedOption.value, // Store the whole object (with value and label)
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                Category: '', // Clear if no selection
            }));
        }
    };

    //submitting data to endpoints

    interface SubmitResponse {
        status: string;
        error?: string;
        issues?: string[];
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const form = event.currentTarget;
        form.disabled = true 
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("Title", formData.Title);
            formDataToSubmit.append("Difficulty", formData.Difficulty || ""); // Assuming Difficulty has value and label
            if (formData.Link){
                if (!formData.Link.startsWith("http://") && !formData.Link.startsWith("https://")){
                    formData.Link = "http://" + formData.Link;
                }
            }
            formDataToSubmit.append("Category", formData.Category || "");
            formDataToSubmit.append("Topics", JSON.stringify(formData.Topics));
            formDataToSubmit.append("CTF", JSON.stringify(ctf));
            formDataToSubmit.append("Description", formData.Description);
            writeupAssets.forEach((file) => formDataToSubmit.append("assets", file));
            if (writeupThumbnail) formDataToSubmit.append('WriteupThumbnail', writeupThumbnail);
            if (writeupFile) formDataToSubmit.append('WriteupFile', writeupFile);

            const submitPromise: Promise<SubmitResponse> = fetch("/api/writeups/upload", {
                method: "POST",
                body: formDataToSubmit,
            })
            .then((response) => response.json())
            .then((data: SubmitResponse) => {
                if (data.status === 'success') {
                    // Reset form data if successful
                    setFormData((oldData) => ({
                        ...oldData,
                        Title: "",
                        Link: "",
                        Topics: [],
                        Description: "",
                    }));
                    // setCTF(null);
                    setWriteupThumbnail(null);
                    setWriteupFile(null);
                    setWriteupAssets([]);
                    // setSelected([]);
                    setExpectedAssets([]);

                    form.disabled = false 
                } else {
                    throw new Error(`${data.error} ${data.issues?.join(", ")}`);
                }
                return data;
            })
            .catch((error) => {
                throw error;
            });
            toast.promise<SubmitResponse>(submitPromise, {
                loading: 'Creating writeup...',
                success: 'Writeup successfully created',
                error: (error: Error) => `Failed to create writeup: ${error.message}`,
            })

        } catch (error) {
            // Catch and log the error
            console.error('Error during submit:', error);
            form.disabled = false 

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
                    <label>Title (Required)</label>
                </div>

                <div className = 'flex flex-col gap-2'>
                    {/* @ts-expect-error TOO LAZY TO FIX */}
                    <Select className = 'rounded-xl h-[3rem] text-left' placeholder = 'Select Difficulty' name = 'Difficulty' options = {difficultyOptions} onChange={handleDifficultyChange} required = {true}/>
                    <label>Difficulty (Required)</label>
                </div>
                
                <UploadMarkDownComponent accept = ".md,.markdown" onFileUpload = {uploadWriteupHandler} label = "Writeup File (required)" file = {writeupFile} required/>


                <div className = 'flex flex-col gap-2'>
                    {/* @ts-expect-error TOO LAZY TO FIX */}
                    <Select className = 'rounded-xl h-[3rem] text-left' placeholder = 'Select Category' options = {categories} name = 'Category' onChange = {handleCategoryChange} required = {true}/>
                    <label>Category (Required)</label>
                </div>

                <div className = 'flex flex-col gap-2'>
                    <TextInput placeholder = 'Link to challenge source' version = 'secondary' className = 'rounded-xl'name = 'Link' value = {formData.Link} onChange = {handleChange}/>
                    <label>Source</label>
                </div> 
                
                <UploadFileComponent accept = "image/*" onFileUpload = {uploadThumbnailHandler} label = "Writeup Thumbnail" file = {writeupThumbnail}/>

                <div className = 'flex flex-col gap-2'>
                    <SearchableSelect options = {
                        ctfs.map((ctf:Event)=>{return {label:ctf.title, id: ctf.id}})} 
                        // @ts-expect-error TOO LAZY TO FIX 
                        setSelectedOption = {eventChangeHandler}
                        placeholder="CTF"/>
                    <label>Related CTF {ctf?.title== ""? "(Required)" : !(ctf?.id) && <span className="text-red-500 text-sm">(CTF not found. It will be created.)</span>}</label>
                </div>
                
                <div className = 'flex flex-col gap-2 row-span-5'>
                    <div className = 'rounded-xl h-[calc(22rem+2px)]  bg-secondary-tier1/50 border-2 border-secondary-tier2'>
                        <TextInput onChange={onTopicSearchChange} value = {topicSearch} className = 'h-[3rem] items-center px-4 text-primary flex text-lg rounded-b-none rounded-t-xl' placeholder="Search Topics" />
                        <div className = 'overflow-auto text-primary h-[calc(19rem-2px)] rounded-none rounded-bl-xl rounded-br-xl w-[100%] bg-secondary-tier3 resize-none'>
                        {topics.map((topic, index) => {
                            // const isSelected = selected.includes(topic.name); // Check if the topic is in the selected array
                            // const brightness = isSelected ? 'brightness-125' : 'brightness-100'; // Set the background color based on selection
                            if (!topic.name.toLowerCase().includes(topicSearch.toLowerCase())) return null;
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
                                    {topic.name}
                                </span>
                            );
                        })}
                        </div>
                    </div>
                    <label>Topics</label>
                </div>

                <div className = 'flex flex-col gap-2 row-span-3 justify-start items-start'>
                    {/* @ts-expect-error TOO LAZY TO FIX */}
                    <textarea className = 'text-primary placeholder-primary h-[20rem] rounded-xl w-[100%] bg-secondary-tier3 resize-none border-2 border-secondary-tier2 px-4 py-2 text-lg' placeholder = 'Description' name = 'Description' value = {formData.Description} onChange = {handleChange}></textarea>
                    <label>Description</label>
                </div>
                <UploadMulitpleFileComponent info = "Upload ALL images used in your writeup"
                files={writeupAssets} 
                onFilesUpload={setWriteupAssets}
                expectedFiles={expectedAssets}
                label="Writeup Assets" accept="image/*" 
                />

                <Button type = 'submit' className = 'row-span-1 h-[4rem] rounded-xl mt-[1rem] col-span-3'>Create</Button>
            </form>
        </GradientBg>
    )
}