import { FC } from "react";
import { useFormik } from "formik";
import Button from "../../../ui/button";
import { Dialog, DialogContent } from "../../../ui/dialog";
import { useState } from "react";
import { useUser } from "../../../context/UserProvider";
import { toast } from "../../../../hooks/use-toast";
import { format } from "date-fns";
import { useGetPaymentTypeData } from "../../../hooks/entities/payment-type.hook";
import SearchSelectInput from "../../../shared/inputs/SearchSelectInput";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";


type CollectBillPaymentFormType = {
    handleFormSubmit: Function;
    instance?: any;
};

const CollectBillPaymentForm: FC<CollectBillPaymentFormType> = ({
    handleFormSubmit,
    instance,
}) => {
    const { user } = useUser();
    const {
        handleSubmit,
        setFieldValue,
        isSubmitting,
        resetForm,
    } = useFormik({
        initialValues: {
            payment_type: "",
            settlement_date: format(new Date(), "yyyy-MM-dd"),
            isPaid: "COMPLETE",
            workspace_id: user?.workspace_id || "no workspace id found",
        },
        onSubmit: async (data: any) => {
            try {
                await handleFormSubmit(data);
                toast({
                    variant: "default",
                    description: "Bill Collected Successfully",
                });
                resetForm()
            } catch (err) {
                console.log(err)
                toast({
                    variant: "destructive",
                    description: 'AN  ERROR ',
                });
            }
        },
    });

    const [open, setOpen] = useState(false);

    const { data: payementTypeData, isLoading } = useGetPaymentTypeData()

    const paymentTypeOption = !isLoading && payementTypeData && payementTypeData.map((i: any) => ({
        label: i.payment_type,
        value: i.id,
    }));

    const handlePaymentTypeSelect = (item: any) => {
        setFieldValue("payment_type", item.label);
    };



    return (
        <div>
            <Dialog onOpenChange={() => setOpen(!open)} open={open}>
                <div className={`bg-green-100 rounded-full text-black p-1 ${instance?.payment_type !== null ? "bg-gray-600 text-gray-100 cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={() => instance?.payment_type === null && setOpen(!open)}>
                    <IoIosCheckmarkCircleOutline className="text-2xl" />
                </div>
                <DialogContent>
                    <div className="p-5 md:p-10 space-y-5">
                        <div className="">
                            <p>Confirm Payment Method To Continue</p>
                        </div>
                        <form
                            className="space-y-6"
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            <SearchSelectInput
                                inputClassName="placeholder:text-white border border-white bg-black/20 py-2 w-full"
                                title="Payment Method"
                                data={paymentTypeOption}
                                onSelect={handlePaymentTypeSelect}
                                placeholder="Select Payment Methods"
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

export default CollectBillPaymentForm;
