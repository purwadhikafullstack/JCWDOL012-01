'use client';

import { ImagePlus, X } from 'lucide-react';
import { Input } from '../ui/input';
import { useState } from 'react';

type Props = {
  id: string;
  files: File[];
  // setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setFiles: any;
};

export default function Uploader({ id, files: fs, setFiles }: Props) {
  const [image, setImage] = useState('');
  const [fileName, setFileName] = useState('No selected file');

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[100px] h-[100px]">
        <X
          className="absolute right-0 top-0 text-cyan-200 z-10 cursor-pointer"
          onClick={async () => {
            const file: any = document.getElementById(id);
            setImage('');
            setFileName('No selected file');
            await setFiles((prev: File[]) => {
              return prev.filter((f: File) => f.name != file.files[0].name);
            });
            file.value = '';
          }}
        />
        <div
          className="flex items-center justify-center w-[100px] h-[100px] border-dashed border-blue-200 border-2 rounded-md cursor-pointer"
          onClick={() => document.getElementById(id)?.click()}
        >
          <Input
            type="file"
            accept="image/*"
            id={id}
            className="hidden"
            onChange={({ target: { files } }) => {
              if (files) {
                const isDup = fs.find(
                  (file: File) => file.name == files[0].name,
                );
                if (!isDup) {
                  files && files[0] && setFileName(files[0]?.name);
                  setImage(URL.createObjectURL(files[0]));
                  setFiles((prev: File[]) => [...prev, files[0]]);
                }
              }
            }}
          />
          {image ? (
            <img src={image} width={60} height={60} alt="" />
          ) : (
            <ImagePlus className="text-cyan-200" />
          )}
        </div>
      </div>
      <section>
        <span className="text-slate-800 text-xs">{fileName}</span>
      </section>
    </div>
  );
}
