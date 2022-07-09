import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import Button from './Button';
import { ButtonTypes } from '../../enum';

interface ChildProps {
  id: string;
  inputHandler: (id: string, value: string | File, isValid: boolean) => void;
}

const ImageUpload = ({ id, inputHandler }: ChildProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // create mounted
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const pickImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // SyntheticInputEvent<HTMLInputElement>
  const selectImageHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) {
      const pickedImage: File = e.currentTarget.files[0];
      setFile(pickedImage);
      inputHandler(id, pickedImage, true);
    }
  };


  useEffect(()=> {
    if(!file) return
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const text = fileReader.result as string
      setPreviewUrl(text);
    };

    fileReader.readAsDataURL(file);
    console.log(previewUrl)
  },[file,previewUrl])

  return (
    <div>
      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={selectImageHandler}
        style={{display:'none'}}
      />
      <div>{previewUrl && <div className='p-4'><img src={previewUrl} alt="Profile" /></div>}</div>
      <Button type={ButtonTypes.BUTTON} onClick={pickImage}>
        사진 고르기
      </Button>
    </div>
  );
};

export default ImageUpload;

