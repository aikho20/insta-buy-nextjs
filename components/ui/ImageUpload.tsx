import React, { useState, ChangeEvent } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { fileBase64 } from '@/utils/helper';

interface ImageUploadProps {
    name: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ name }) => {
    const { control, setValue } = useFormContext();
    const [previews, setPreviews] = useState<string[]>([]);

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = e.target.files;
            const base64Files = await Promise.all(Array.from(files).map(fileBase64));
            setValue(name, base64Files);
            setPreviews(base64Files);
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div>
                    <Input type="file" multiple onChange={handleChange} />
                    <div className="mt-2 flex flex-wrap gap-2">
                        {previews.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`preview-${index}`}
                                className="w-24 h-24 object-cover"
                            />
                        ))}
                    </div>
                </div>
            )}
        />
    );
};

export default ImageUpload;