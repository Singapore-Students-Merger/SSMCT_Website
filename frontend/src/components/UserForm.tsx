'use client';

import { useState } from 'react';
import Button from "@/components/Button";
import GradientBg from "@/components/GradientBg";
import TextInput from "@/components/TextInput";
import Select from "@/components/Select";
import SelectChip from "@/components/SelectChip";

const options = [
    { value: "None", label: "None" },
    { value: "Web Expliotation", label: "Web Exploitation" },
    { value: "Pwn", label: "Pwn" },
    { value: "Crypto", label: "Crypto" },
    { value: "Reverse Engineering", label: "Reverse Engineering" },
    { value: "Forensics", label: "Forensics" },
    { value: "Misc", label: "Misc" },
    { value: "OSINT", label: "OSINT" },
    { value: "Hardware", label: "Hardware" },
    { value: "Mobile", label: "Mobile" },
    { value: "Cloud", label: "Cloud" },
    { value: "Networking", label: "Networking" },
    { value: "IOT", label: "IOT" },
    { value: "AI", label: "AI" },
    { value: "BlockChain", label: "BlockChain" },
];

export default function UserForm({ name } : { name: string | undefined | null }) {
    const [displayName, setDisplayName] = useState(name || '');
    const [realName, setRealName] = useState('');
    const [mainCategory, setMainCategory] = useState('');
    const [interests, setInterests] = useState<string[]>([]);

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/update-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    displayName,
                    realName,
                    mainCategory,
                    interests,
                }),
            });

            if (response.ok) {
                // window.location.href = '/home'; // Redirect after successful update
            } else {
                console.error('Failed to update user');
            }
        } catch (err) {
            console.error('Error:', err);
        }
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
                    onChange={(e) => setMainCategory(e!.value)}
                />
            </div>
            <div>
                <div className="border-2 border-secondary-tier2 w-full min-h-72 rounded-lg flex flex-wrap gap-4 items-start content-start px-4 py-4">
                    {options.map((record, idx) => (
                        <SelectChip
                            key={idx}
                            onClick={() => {
                                setInterests((prev) =>
                                    prev.includes(record.value)
                                        ? prev.filter((item) => item !== record.value)
                                        : [...prev, record.value]
                                );
                            }}
                            selected={interests.includes(record.value)}
                        >
                            {record.label}
                        </SelectChip>
                    ))}
                </div>
                <p className="text-primary text-lg md:text-md py-2 ml-2">Categories of Interest</p>
            </div>
            <Button className="px-10" onClick={handleSubmit}>
                Continue
            </Button>
        </GradientBg>
    );
}
