import { useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { useBackground1 } from "../context/Background1Context";
import SettingsIcon from "../shared/icons/SeetingIcon";
import ImageUploadField from "../shared/inputs/ImageUploadField";
import Button from "../ui/button";

const SettingsComponent = () => {
    const { setDisplayedBackground } = useBackground1(); // Get setDisplayedBackground from context
    const [selectedImage, setSelectedImage] = useState("");
    const [autoChange, setAutoChange] = useState(() => {
        const savedAutoChange = localStorage.getItem("autoChange");
        return savedAutoChange ? JSON.parse(savedAutoChange) : false; // Load from localStorage
    }); // State for automatic change
    const [imageIndex, setImageIndex] = useState(0); // Index for cycling through images
    const [imageArray, setImageArray] = useState<string[]>([]); // State for storing images
    const [uploadedImage, setUploadedImage] = useState<string | null>(null); // State for the uploaded image

    // Define the static fallback image URL
    const staticImage = "https://i.ibb.co.com/7rqjGM7/Add-a-little-bit-of-body-text.gif"; // Replace this with your static image URL

    useEffect(() => {
        const savedImage = localStorage.getItem("selectedImage");
        const savedImages = localStorage.getItem("imageArray");

        if (savedImages) {
            setImageArray(JSON.parse(savedImages)); // Parse saved images from local storage
        } 

        // Set selected image from saved image or static image
        const imageToDisplay = savedImage || staticImage;
        setSelectedImage(imageToDisplay);
        setDisplayedBackground(imageToDisplay); // Set the background

        // Set the imageIndex if the savedImage exists in the array
        if (savedImage) {
            const savedIndex = imageArray.indexOf(savedImage);
            if (savedIndex !== -1) {
                setImageIndex(savedIndex); // Update imageIndex
            }
        }
    }, [setDisplayedBackground]);

    // Auto change effect
    useEffect(() => {
        let interval: NodeJS.Timeout | undefined; // Declare interval variable
        if (autoChange && imageArray.length > 0) {
            interval = setInterval(() => {
                const nextIndex = (imageIndex + 1) % imageArray.length; // Cycle through images
                const nextImage = imageArray[nextIndex];
                setDisplayedBackground(nextImage);
                localStorage.setItem("selectedImage", nextImage); // Save the current image to local storage
                setImageIndex(nextIndex); // Update the index for the next iteration
            }, 3000); // Change every 3 seconds
        }

        return () => {
            if (interval) {
                clearInterval(interval); // Cleanup function
            }
        };
    }, [autoChange, imageIndex, imageArray, setDisplayedBackground]);

    // Save autoChange state to localStorage when it updates
    useEffect(() => {
        localStorage.setItem("autoChange", JSON.stringify(autoChange));
    }, [autoChange]);

    const handleImageSelect = (image: string) => {
        setSelectedImage(image);
        localStorage.setItem("selectedImage", image); // Save to local storage
        setDisplayedBackground(image); // Set the background image in context
        setAutoChange(false); // Stop automatic change when a new image is selected
        const selectedIndex = imageArray.indexOf(image);
        setImageIndex(selectedIndex); // Update image index
    };

    const handleImageUpload = (uploadedImage: string) => {
        // Update imageArray with new image and save to local storage
        const updatedImages = [...imageArray, uploadedImage];
        setImageArray(updatedImages);
        localStorage.setItem("imageArray", JSON.stringify(updatedImages)); // Save updated imageArray
        handleImageSelect(uploadedImage); // Set uploaded image as selected
    };

    const handleUploadImage = () => {
        if (uploadedImage) {
            handleImageUpload(uploadedImage); // Upload the image when the button is clicked
            setUploadedImage(null); // Clear the uploaded image after uploading
        }
    };

    const handleDeleteImage = (index: number) => {
        const updatedImages = imageArray.filter((_, i) => i !== index); // Remove image at the specified index
        setImageArray(updatedImages);
        localStorage.setItem("imageArray", JSON.stringify(updatedImages)); // Save updated imageArray

        // If the deleted image is the currently selected image, update selectedImage
        if (selectedImage === imageArray[index]) {
            setSelectedImage(staticImage); // Set the fallback static image
            setDisplayedBackground(staticImage); // Optionally reset the background when image is deleted
            localStorage.removeItem("selectedImage"); // Remove from local storage
        }
    };

    return (
        <div>
            <Sheet>
                <SheetTrigger className="p-2 bg-black/80 backdrop-blur-md rounded-l-[20px]">
                    <div className="animate-spin">
                        <SettingsIcon />
                    </div>
                </SheetTrigger>
                <SheetContent className="flex flex-col p-4 max-h-screen overflow-auto">
                    <SheetHeader>
                        <SheetTitle>Background Settings</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 flex justify-between gap-4">
                        <div className="w-full">
                            <ImageUploadField
                                value={uploadedImage}
                                setValue={setUploadedImage}
                                fieldKey="files"
                            />
                        </div>
                        <Button
                            className="rounded-[10px]"
                            onClick={handleUploadImage}
                            label="Upload"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={autoChange}
                                onChange={() => setAutoChange(!autoChange)}
                                className="mr-2"
                            />
                            Automatic Change
                        </label>
                    </div>
                    <div className="grid grid-cols-2 gap-5 mt-5">
                        {imageArray.length > 0 ? (
                            imageArray.map((image, index) => (
                                <div className="relative" key={index}>
                                    <img
                                        src={image}
                                        alt={`Background ${index + 1}`}
                                        className={`cursor-pointer w-full h-[100px] object-cover rounded-[10px] hover:scale-105 transition-transform duration-300 ${selectedImage === image ? 'border-2 border-green-500' : ''}`}
                                        onClick={() => handleImageSelect(image)}
                                    />
                                    <button
                                        onClick={() => handleDeleteImage(index)} // Call delete function on click
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                        aria-label="Delete image"
                                    >
                                        X
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No images available. Please upload an image.</p>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default SettingsComponent;
