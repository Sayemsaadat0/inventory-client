import { useCallback, useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import Button from "../ui/button";

interface DeleteActionProps {
    handleDeleteSubmit: Function;
    isLoading: boolean;
}

const DeleteAction: React.FC<DeleteActionProps> = ({ handleDeleteSubmit, isLoading }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleDelete = useCallback(async () => {
        try {
            await handleDeleteSubmit();
            //   toast({
            //     description: `Deleted Successfully!`,
            //   });
            setOpen(false);
        } catch (err: any) {
            console.log(err)
            // Assuming `err.errors` is an array of objects with `attr` and `detail` properties
            //   for (let key of err.errors) {
            //     toast({
            //       description: `${key?.attr} - ${key?.detail}`,
            //     });
            //   }
        }
    }, [handleDeleteSubmit]);

    return (
        <div>
            <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
                <div onClick={() => setOpen(!open)} className="cursor-pointer p-2 rounded-full flex items-center justify-center bg-black">
                    <FaTrashAlt className=" text-red-500" />
                </div>
                <AlertDialogContent className="py-10">
                    <div>
                        <div className="flex justify-center pb-3">
                            <p>
                                <AiFillWarning className="text-red-500 text-7xl" />
                            </p>
                        </div>
                        <h3 className="text-2xl font-semibold text-center">Confirm Delete</h3>
                        <p className="text-center py-2">
                            Are you sure you want to <br /> delete this file?
                        </p>
                    </div>
                    <div className="flex justify-center gap-8">
                        <Button
                            onClick={() => setOpen(false)}
                            label={"Cancel"}
                        //   variant={"outlineBtn"}
                        />
                        <Button
                            disabled={isLoading}
                            label={`${isLoading ? "Deleting" : "Delete"}`}
                            onClick={handleDelete}
                        />
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteAction;
