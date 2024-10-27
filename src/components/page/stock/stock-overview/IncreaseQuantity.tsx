import { FC } from "react";
import { useFormik } from "formik";
import Button from "../../../ui/button";
import { Dialog, DialogContent } from "../../../ui/dialog";
import { useState } from "react";
import { toast } from "../../../../hooks/use-toast";
import { format } from "date-fns";
// import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import TextInput from "../../../shared/inputs/TextInput";
import { showDatePicker } from "../../../../lib/datePicker";


type IncreaseQuantityType = {
    handleFormSubmit: Function;
};

const IncreaseQuantity: FC<IncreaseQuantityType> = ({
    handleFormSubmit,
}) => {
    const {
        handleSubmit,
        isSubmitting,
        resetForm,
        handleChange,
        values,
    } = useFormik({
        initialValues: {
            date: format(new Date(), "yyyy-MM-dd"),
            quantity: 0
        },
        onSubmit: async (data: any) => {
            try {
                await handleFormSubmit(data);
                toast({
                    variant: "default",
                    description: "Quantity Successfully",
                });
                resetForm()
            } catch (err) {
                console.log(err)
                toast({
                    variant: "destructive",
                    description: 'AN ERROR ',
                });
            }
        },
    });

    const [open, setOpen] = useState(false);
    console.log(values)
    return (
        <div>
            <Dialog onOpenChange={() => setOpen(!open)} open={open}>
                <div className={`bg-green-100 rounded-full text-black px-2  w-fit  cursor-pointer`}
                    onClick={() => setOpen(!open)}>
                    +
                    {/* <IoIosCheckmarkCircleOutline className="text-2xl" /> */}
                </div>
                <DialogContent>
                    <div className="p-5 md:p-10 space-y-5">
                        <div className="">
                            <p>Increase Quantity</p>
                        </div>
                        <form
                            className="space-y-6"
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <TextInput
                                className="w-full border  bg-black/20"
                                label=" Date"
                                readOnly
                                id="date"
                                placeholder="date"
                                value={values.date}
                                onClick={(e) => showDatePicker(e)}
                                onChange={handleChange}
                                type="date"
                            />
                            <TextInput
                                className="w-full border bg-black/20"
                                label="Quantity"
                                id="quantity"
                                placeholder="quantity"
                                value={values.quantity}
                                onChange={handleChange}
                                type="number"
                            />
                            <div className="w-full flex justify-center">
                                <Button
                                    onClick={() => setOpen(!open)}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full"
                                    variant={"regulerOutlineBtn"}
                                    label={isSubmitting ? "Saving.." : "Save"}
                                />
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default IncreaseQuantity;
