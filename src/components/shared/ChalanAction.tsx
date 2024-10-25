import { useCallback, useState } from "react";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import Button from "../ui/button";
import { toast } from "../../hooks/use-toast";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

interface ChalanConfirmProps {
    handleConfirmChalan: Function;
    isLoading: boolean;
}

const ChalanAction: React.FC<ChalanConfirmProps> = ({ handleConfirmChalan, isLoading }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleDelete = useCallback(async () => {
        try {
            await handleConfirmChalan();
            toast({
                variant: "default",
                description: `Chalan Confirmed!`,
            });
            setOpen(false);
        } catch (err: any) {
            console.log(err);
        }
    }, [handleConfirmChalan]);

    return (
        <div>
            <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
                <div onClick={() => setOpen(!open)} className="cursor-pointer p-1.5 rounded-full flex items-center justify-center bg-green-50 hover:bg-green-200 text-green-700">
                    <FaCheck />
                </div>
                <AlertDialogContent className="py-10">
                    <div>
                        <div className="flex justify-center pb-3">
                            <p>
                                <IoCheckmarkCircleOutline className=" text-7xl" />
                            </p>
                        </div>
                        <h3 className="text-4xl font-semibold text-center">Confirm Chalan!</h3>
                        <p className="text-center mt-4 text-lg">
                       This action cannot be undone.
                        </p>
                    </div>
                    <div className="flex justify-center gap-8">
                        <Button
                            className="bg-red-100 text-black min-w-20"
                            onClick={() => setOpen(false)}
                            label={"Cancel"}
                        />
                        <Button
                            className="border min-w-20"
                            disabled={isLoading}
                            label={`${isLoading ? "Saving.." : "Save"}`}
                            onClick={handleDelete}
                        />
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ChalanAction;
