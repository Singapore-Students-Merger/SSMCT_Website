'use client'

import GradientBg from "@/components/GradientBg";
import TextInput from "@/components/TextInput";
import Select from "@/components/Select";
import Button from "@/components/Button";
import toast, { Toaster } from 'react-hot-toast';
import Category from "@/types/category";

import { useState, useEffect } from 'react';
import UploadFileComponent from "./UploadFileComponent";
import SearchableSelect  from "@/components/SearchableSelect";

export default function CreateBlogsPage(){
    const levelOptions = [
        { value: '', label: 'Select Difficulty'},
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
        { value: 'Insane', label: 'Insane' },
        { value: 'Impossible', label: 'Impossible'}
      ];

    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [ctfs, setCtfs] = useState<Event[]>([]);

    

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

    const [BlogThumbnail, setBlogThumbnail] = useState<File | null>(null);
    const [BlogFile, setBlogFile] = useState<File | null>(null);
    const [ctf, setCTF] = useState<Event | null>(null);
    const [selected, setSelected] = useState<number[]>([]);
    const [topicSearch, setTopicSearch] = useState<string>('');

    const [formData, setFormData] = useState({
        Title: "",
        Level: '',
        Category: "",
        Topics: [] as number[],
        Description: "",
    });

    const onTopicSearchChange = (e: any) => {
        setTopicSearch(e.target.value);
    }
    //making it appear
    const uploadThumbnailHandler = (file: null|File) => {
        if (file) {
            setBlogThumbnail(file); // Store file separately
        }
    };
    
    const uploadBlogHandler = (file:null|File) => {
        if (file) {
            setBlogFile(file); // Store file separately
        }
    };

    const eventChangeHandler = (selectedOption: {label:string, id: number|null}) => {
        if (selectedOption) {
            setCTF({title: selectedOption.label, id: selectedOption.id});
        } else {
            setCTF(null);
        }
    }

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

    const handleLevelChange = (selectedOption: { value: string; }) => {
        if (selectedOption) {
            setFormData((prev) => ({
                ...prev,
                Level: selectedOption.value, // Store the whole object (with value and label)
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                Level: '', // Clear if no selection
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
    async function handleSubmit(event){
        event.preventDefault();
        
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("Title", formData.Title);
            formDataToSubmit.append("Level", formData.Level || ""); // Assuming Difficulty has value and label
            formDataToSubmit.append("Category", formData.Category || "");
            formDataToSubmit.append("Topics", JSON.stringify(formData.Topics));
            formDataToSubmit.append("CTF", JSON.stringify(ctf));
            formDataToSubmit.append("Description", formData.Description);
            if (BlogThumbnail) formDataToSubmit.append('BlogThumbnail', BlogThumbnail);
            if (BlogFile) formDataToSubmit.append('BlogFile', BlogFile);

            const submitPromise = fetch("/api/create/blog", {
                method: "POST",
                body: formDataToSubmit,
            })
            .then((response) => response.json())
            .then((data) => {
                if (data['status'] == 'success') {
                    // Reset form data if successful
                    setFormData({
                        Title: "",
                        Level: "",
                        Category: "",
                        Topics: [],
                        Description: "",
                    });
                } else if (data['status'] == 'error') {
                    throw new Error(data['error']);
                }
            })
            toast.promise(submitPromise, {
                loading: 'Creating Blog...',
                success: 'Blog successfully created',
                error: (error) => `Failed to create Blog: ${error.message}`,
            })
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
            <h1 className = 'text-[3rem] font-bold'>Create Post</h1>
            <Toaster/>

            <form onSubmit = {handleSubmit} className = 'grid grid-cols-3 grid-rows-[6rem_6rem_6rem_6rem_6rem_6rem] my-5 gap-y-0 gap-x-10'>
                <div className = 'flex flex-col gap-2'>
                    <TextInput placeholder = 'Title' version = 'secondary' className = 'rounded-xl' name = 'Title' value = {formData.Title} onChange = {handleChange} required = {true}/>
                    <label>Title</label>
                </div>

                <div className = 'flex flex-col gap-2'>
                    <Select className = 'rounded-xl h-[3rem] text-left' placeholder = 'Level' name = 'Level' options = {levelOptions} onChange={handleLevelChange} required = {true}/>
                    <label>Level</label>
                </div>

                <div className = 'flex flex-col gap-2'>
                    <SearchableSelect options = {
                        ctfs.map((ctf:Event)=>{return {label:ctf.title, id: ctf.id}})} 
                        setSelectedOption = {eventChangeHandler}
                        placeholder="CTF"/>
                    <label>Related CTF {!(ctf?.id) && <span className="text-red-500 text-sm">(CTF not found. It will be created.)</span>}</label>
                </div>

                <div className = 'flex flex-col gap-2'>
                    <Select className = 'rounded-xl h-[3rem] text-left' placeholder = 'Select Category' options = {categories} name = 'Category' onChange = {handleCategoryChange} required = {true}/>
                    <label>Category</label>
                </div>

                <div className = 'flex flex-col gap-2 row-span-5'>
                    <div className = 'rounded-xl h-[calc(28rem+2px)]  bg-secondary-tier1/50 border-2 border-secondary-tier2'>
                        <TextInput onChange={onTopicSearchChange} value = {topicSearch} className = 'h-[3rem] items-center px-4 text-primary flex text-lg rounded-b-none rounded-t-xl' placeholder="Search Topics" />
                        <div className = 'overflow-auto text-primary h-[calc(25rem-2px)] rounded-none rounded-bl-xl rounded-br-xl w-[100%] bg-secondary-tier3 resize-none'>
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

                <UploadFileComponent accept = "image/*" onFileUpload = {uploadThumbnailHandler} label = "Blog Thumbnail" file = {BlogThumbnail}/>


                <div className = 'flex flex-col gap-2 row-span-4 justify-start items-start'>
                    <textarea className = 'text-primary placeholder-primary h-[25rem] rounded-xl w-[100%] bg-secondary-tier3 resize-none border-2 border-secondary-tier2 px-4 py-2 text-lg' placeholder = 'Description' name = 'Description' value = {formData.Description} onChange = {handleChange} required></textarea>
                    <label>Description</label>
                </div>

                <UploadFileComponent accept = ".md,.markdown" onFileUpload = {uploadBlogHandler} label = "Blog File" file = {BlogFile}/>
                
                <Button type = 'submit' className = 'row-span-1 h-[3rem] rounded-xl mt-[1rem]'>Create</Button>
            </form>
        </GradientBg>
    )
}