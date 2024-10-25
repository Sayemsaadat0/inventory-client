import { useCallback, useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import Button from "../ui/button";
import { toast } from "../../hooks/use-toast";

interface DeleteActionProps {
    handleDeleteSubmit: Function;
    isLoading: boolean;
}

const DeleteAction: React.FC<DeleteActionProps> = ({ handleDeleteSubmit, isLoading }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleDelete = useCallback(async () => {
        try {
            await handleDeleteSubmit();
            toast({
                variant: "default",
                description: `Deleted Successfully!`,
            });
            setOpen(false);
        } catch (err: any) {
            console.log(err)
            for (let key of err.errors) {
                toast({
                    variant: 'destructive',
                    description: `${key?.attr} - ${key?.detail}`,
                });
            }
        }
    }, [handleDeleteSubmit]);

    return (
        <div>
            <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
                <div onClick={() => setOpen(!open)} className="cursor-pointer p-1 rounded-full flex items-center justify-center bg-black">
                    <TiDeleteOutline className="text-2xl text-red-500" />
                </div>
                <AlertDialogContent className="py-10">
                    <div>
                        <div className="flex justify-center pb-3">
                            <p>
                                <AiFillWarning className="text-red-500 text-7xl" />
                            </p>
                        </div>
                        <h3 className="text-4xl font-semibold text-center">Confirm Delete!</h3>
                        <p className="text-center py-2">
                            Are you sure you want to <br /> delete this file?
                        </p>
                    </div>
                    <div className="flex justify-center gap-8">
                        <Button
                            className="bg-red-100 text-black"
                            onClick={() => setOpen(false)}
                            label={"Cancel"}
                        //   variant={"outlineBtn"}
                        />
                        <Button
                            className="border"
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
