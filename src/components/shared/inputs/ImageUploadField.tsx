import { useState, useEffect } from "react";
import { MdUpload } from "react-icons/md";

interface ImageUploadFieldProps {
    error?: { message: string };
    setValue: (value: string | null) => void;
    value: string | null;
    fieldKey: string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
    error,
    setValue,
    value,
    fieldKey,
}) => {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (value) {
            setUploadedImage(value);
        }
    }, [value]);

    const handleUpload = async (file: File) => {
        setLoading(true); // Set loading state to true
        try {
            const formData = new FormData();
            formData.append("image", file);
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY
                }`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (response.ok) {
                const result = await response.json();
                const imageUrl = result.data.url;
                setUploadedImage(imageUrl);
                setValue(imageUrl);
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleUpload(file);
        } else {
            setUploadedImage(null);
            setValue(null);
        }
    };

    const handleRemoveImage = () => {
        setUploadedImage(null);
        setValue(null);
    };

    return (
        <div>
            <div className="flex h-fit px-1.5 py-2.5 rounded-[10px] border ">
                <label className="relative" htmlFor={`dropzone-file-${fieldKey}`}>
                    <div>
                        {loading && (
                            <div className="flex items-center justify-center ">
                                <p className="text-ac_primary_1">Uploading...</p>
                            </div>
                        )}

                        {uploadedImage && !loading && (
                            <div className="object-cover mx-auto ">
                                <div className="relative flex gap-5 items-center">
                                    <img
                                        className="object-cover w-8 h-8  rounded-[10px] max-h-[80px]"
                                        src={uploadedImage}
                                        alt="uploaded"
                                    />
                                    <span onClick={handleRemoveImage} className="cursor-pointer z-20">
                                        Change
                                    </span>
                                </div>
                            </div>
                        )}

                        {!uploadedImage && !loading && (
                            <div className="flex items-center justify-center cursor-pointer gap-2 px-2 py-1 text-xs">
                                <MdUpload className="text-xl" />
                                <p>Click to upload Image</p>
                            </div>
                        )}
                        <input
                            onChange={handleChangeFile}
                            name={`file-${fieldKey}`}
                            id={`dropzone-file-${fieldKey}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                </label>
            </div>
            {error && <p className="text-red-500 mt-1">{error.message}</p>}
        </div>
    );
};

export default ImageUploadField;
