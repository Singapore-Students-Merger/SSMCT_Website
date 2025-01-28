'use client';

import React from 'react';
import Image from 'next/image';

interface UploadFileComponentProps {
    onFileUpload: (file: File | null) => void;
    file: File | null;
    label: string
    accept: string
}

const UploadFileComponent: React.FC<UploadFileComponentProps> = ({ onFileUpload, label, file, accept }) => {
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onFileUpload(file);
        if (file && file.type.startsWith('image/')) {
            setPreviewUrl(URL.createObjectURL(file));
        }

    };
    console.log(file)
    return (
        <div className="flex flex-col gap-2 row-span-2">
            <div className="relative rounded-xl h-[calc(9rem+2px)] bg-secondary-tier1/50 z-10 border-2 border-secondary-tier2">
                <div className="flex flex-row h-[3rem] items-center">
                    <p className="px-4 text-primary text-lg">{label}</p>
                    <Image
                        src="/assets/record.png"
                        className="h-[1.5rem] w-[1.5rem] m-auto mr-3 block"
                        height={3}
                        width={3}
                        alt="upload"
                    />
                </div>
                <div className="flex items-center justify-center text-primary h-[calc(6rem-2px)] rounded-none rounded-bl-xl rounded-br-xl w-full bg-secondary-tier3 resize-none">
                    <input
                        type="file"
                        className={`top-0 absolute opacity-0 w-full rounded-none rounded-bl-xl rounded-br-xl h-full`}
                        onChange={handleFileChange}
                        name="WriteupFile"
                        accept={accept}
                        required
                    />
                    {previewUrl ? (
                        <Image
                            src={previewUrl}
                            alt="Preview"
                            className="rounded-sm h-full"
                            layout="fill"

                        />
                    ) : (
                        file && <p className="text-primary text-lg text-center">{file.name}</p>
                    )}
                </div>
            </div>
            <label htmlFor="WriteupFile">{label}</label>
        </div>
    );
};

export default UploadFileComponent;
