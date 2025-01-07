'use client';

import { useEffect, useState } from 'react';
import Button from "@/components/Button";
import GradientBg from "@/components/GradientBg";
import TextInput from "@/components/TextInput";
import Select from "@/components/Select";
import SelectChip from "@/components/SelectChip";
import Category from '@/types/category';
import toast, { Toaster } from 'react-hot-toast';

interface UserFormProps {
    name: string | undefined | null;
    categories: Category[];
}

interface Option {
    value: number;
    label: string;
}

export default function UserForm({ name, categories } : UserFormProps) {
    const [displayName, setDisplayName] = useState(name || '');
    const [realName, setRealName] = useState('');
    const [mainCategoryId, setMainCategoryId] = useState<string>("-1");
    const [interests, setInterests] = useState<number[]>([]);
    const options: Option[] = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));
    useEffect(() => {
        if (categories.length == 0){
            toast.error('Failed to fetch categories');
        }
    },[categories]);

    options.unshift({ value: -1, label: 'None' });
    const handleSubmit = async () => {
        if (!displayName.trim()) {
            toast.error('Display Name is required');
            return;
        }
        if (realName != '' && !realName.trim()) {
            toast.error('Did you think I wouldn\'t validate this :C? Please input your real name or leave it empty.');
            return;
        }
        toast.promise(
            fetch('/api/users/update-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    displayName,
                    realName,
                    mainCategoryId: mainCategoryId=="-1" ? null : parseInt(mainCategoryId),
                    interests,
                }),
            })
                .then(async (response) => {
                    if (response.ok) {
                        window.location.href = '/'; 
                        return Promise.resolve('User updated successfully');
                    } else {
                        const errorData = await response.json();
                        return Promise.reject(
                            errorData.error || 'Failed to update user'
                        );
                    }
                })
                .catch((err) => {
                    console.error('Error:', err);
                    throw new Error(err || 'A network error occurred. Please try again.');
                }),
            {
                loading: 'Updating user...',
                success: (message) => message, // Use the resolved message
                error: (err) => err.message || 'An error occurred', // Use the error message
            }
        );
        
    };

    return (
        <GradientBg gradientPosition="center" className="min-h-screen flex items-center flex-col gap-8 justify-start py-20 px-10 md:px-20">
            <h1 className="text-5xl font-bold text-center"> Welcome {name}</h1>
            <p className="text-white text-2xl text-center">Before we begin, please tell us more about yourself</p>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 w-full justify-center ">
                <TextInput
                    placeholder="Display Name"
                    className="rounded-xl"
                    label="Display Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <TextInput
                    placeholder="Real Name"
                    className="rounded-xl"
                    label="Name (optional)"
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                />
                <Select
                    placeholder="Select Main Category"
                    className="rounded-xl"
                    label="Main Category"
                    options={options}
                    onChange={(e) => setMainCategoryId(e!.value)}
                />
            </div>
            <div>
                <div className="border-2 border-secondary-tier2 w-full min-h-72 rounded-lg flex flex-wrap gap-4 items-start content-start px-4 py-4">
                    {categories.map((record, idx) => (
                        <SelectChip
                            key={idx}
                            onClick={() => {
                                setInterests((prev) =>
                                    prev.includes(record.id)
                                        ? prev.filter((item) => item !== record.id)
                                        : [...prev, record.id]
                                );
                            }}
                            selected={interests.includes(record.id)}
                        >
                            {record.name}
                        </SelectChip>
                    ))}
                </div>
                <p className="text-primary text-lg md:text-md py-2 ml-2">Categories of Interest</p>
            </div>
            <Button className="px-10" onClick={handleSubmit}>
                Continue
            </Button>
            <Toaster />
        </GradientBg>
    );
}
