'use client';

import React from 'react';
import Image from 'next/image';
import TrashIcon from './logos/TrashIcon';
import QuestionMarkIcon from './logos/QuestionMarkIcon';
import TickIcon from './logos/TickIcon';

interface UploadFileComponentProps extends React.HTMLProps<HTMLInputElement> {
    onFileUpload: (file: File | null) => void;
    file: File | null;
    label: string
    accept: string
}

interface UploadMulitpleFileComponentProps extends React.HTMLProps<HTMLInputElement> {
    onFilesUpload: React.Dispatch<React.SetStateAction<File[]>>;
    files: File[] ;
    label: string
    accept: string
    info: string
    expectedFiles: string[];
}
const UploadMulitpleFileComponent: React.FC<UploadMulitpleFileComponentProps> = ({ onFilesUpload, label, files, accept, info, expectedFiles }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files || null;
        if (!newFiles) return;
       

        onFilesUpload((oldFiles) => {
            const merged = [...oldFiles, ...newFiles];
            const uniqueFiles = Array.from(new Map(merged.map(f => [f.name, f])).values());
            console.log(uniqueFiles)
            return uniqueFiles;
        });
    };
    
    const handleRemoveFile = (index: number) => {
        onFilesUpload((oldFiles) => {
            const newFiles = [...oldFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    }
    const fileDisplay = <>
        {files && files.map((f, index) => (
            <div key={index} className="flex flex-row items-center gap-2 ">
                <TrashIcon className="h-4 w-4" fill="#FD3B3B" onClick = {
                    handleRemoveFile.bind(null, index)  
                }
                    />
                <p className="text-primary text-lg">{f.name}</p>
                {f.name && expectedFiles.includes(f.name) && <TickIcon className='h-4 w-4'/>}
            </div>
        ))}
        {
            expectedFiles.map((f, index) => {
                if (files && files.map((f) => f.name).includes(f)) return null;
                return <div key={index} className="flex flex-row items-center gap-2" title = "This image is present in your file, but you have not uploaded it yet">
                    <p className="text-primary text-lg">{f}</p>
                    <QuestionMarkIcon className='h-4 w-4'/>
                </div>
            })
        }
    </>
    return (
        <div className="flex flex-col gap-2 row-span-3">
            <div className="relative rounded-xl h-[calc(17rem+2px)] bg-secondary-tier1/50 z-10 border-2 border-secondary-tier2">
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
                <div className="flex items-center justify-center text-primary h-[calc(13rem-2px)] rounded-none rounded-bl-xl rounded-br-xl w-full bg-secondary-tier3 resize-none">
                    <input
                        type="file"
                        className={`top-0 absolute opacity-0 w-full rounded-none rounded-bl-xl rounded-br-xl h-full z-10`}
                        onChange={handleFileChange}
                        name="BlogFile"
                        accept={accept}
                        multiple
                    />
                    <div className="flex flex-col gap-2 w-full h-full overflow-y-auto scrollbar-custom z-20 px-4 py-2">
                        {fileDisplay}
                    </div>
                </div>
            </div>
            <label htmlFor="BlogFile" title={info}>{label} ⓘ</label>
        </div>
    );
}
const UploadMarkDownComponent: React.FC<UploadFileComponentProps> = ({ onFileUpload, label, file, accept, ...props }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onFileUpload(file);

    };
    return (
        <div className="flex flex-col gap-2 row-span-1">
            <div className="relative rounded-xl h-[calc(3rem)] bg-secondary-tier1/50 z-10 border-2 border-secondary-tier2">
                <div className="flex flex-row h-[3rem] items-center">
                    <p className="px-4 text-primary text-lg">
                        {file && file.name}
                        {!file && label}
                    </p>
                    <Image
                        src="/assets/record.png"
                        className="h-[1.5rem] w-[1.5rem] m-auto mr-3 block"
                        height={3}
                        width={3}
                        alt="upload"
                    />
                </div>
                <input
                    type="file"
                    className={`top-0 absolute opacity-0 w-full rounded-none rounded-bl-xl rounded-br-xl h-full z-10`}
                    onChange={handleFileChange}
                    name={label}
                    accept={accept}
                    {...props}
                />
            </div> 
            <label htmlFor={label}>{label}</label>

        </div>
    );
};
const UploadFileComponent: React.FC<UploadFileComponentProps> = ({ onFileUpload, label, file, accept }) => {
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onFileUpload(file);
        if (file && file.type.startsWith('image/')) {
            setPreviewUrl(URL.createObjectURL(file));
        }

    };
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
                        className={`top-0 absolute opacity-0 w-full rounded-none rounded-bl-xl rounded-br-xl h-full z-10`}
                        onChange={handleFileChange}
                        name="BlogFile"
                        accept={accept}
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
            <label htmlFor="BlogFile">{label}</label>
        </div>
    );
};

export {UploadFileComponent, UploadMarkDownComponent, UploadMulitpleFileComponent};
