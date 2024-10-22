// // import UsersForm from "./UsersForm"

// const Users = () => {
//     return (
//         <div>
//             <div className="flex justify-center items-center ">
//                 <img className="w-[40%] aspect-square" src="https://i.ibb.co.com/P9BQ24g/UNDER.png" alt="" />
//             </div>
//         </div>
//     )
// }

// export default Users

import { fakseUserData } from "../../../../data/dummy.data";
import SharedTable from "../../../shared/table/SharedTable";
import Title from "../../../shared/Title";
import UsersForm from "./UsersForm";
const Users = () => {
    const columns = [
        {
            title: "User",
            dataKey: "username",
            row: (data: any) => (
                <div className="flex gap-5 items-center">
                    <img
                        className="w-12 rounded-full object-cover aspect-square"
                        src={data?.user_image || 'https://i.pinimg.com/564x/7d/90/24/7d9024c49129dfb45e11ce9a489d2c74.jpg'}
                        alt={data?.username}
                    />
                    <span>{data.username}</span>
                </div>
            ),
        },
        {
            title: "Email",
            dataKey: "email",
            row: (data: any) => (
                <div>
                    <p>{data.email}</p>
                </div>
            ),
        },
        {
            title: "Phone Number",
            dataKey: "phone_number",
            row: (data: any) => (
                <div>
                    <p>{data.phone_number}</p>
                </div>
            ),
        },
        {
            title: "Company Name",
            dataKey: "company_name",
            row: (data: any) => (
                <div>
                    <p>{data.company_name}</p>
                </div>
            ),
        },
        {
            title: "Company Logo",
            dataKey: "company_logo",
            row: (data: any) => (
                <div className="flex justify-center">
                    <img
                        className="w-12 rounded-full object-cover aspect-square"
                        src={data?.company_logo || 'https://example.com/default_logo.png'}
                        alt={data?.company_name}
                    />
                </div>
            ),
        },
        {
            title: "Role",
            dataKey: "role",
            row: (data: any) => (
                <div>
                    <p>{data.role}</p>
                </div>
            ),
        },
        {
            title: "Action",
            dataKey: "action",
            row: (data: any) => (
                <div className="flex justify-end">
                    <TableAction data={data} />
                </div>
            ),
        },
    ];

    const TableAction = ({ data }: { data: any }) => {
        console.log(data)
        return (
            <div>
                {/* <UsersForm handleFormSubmit={() => undefined} isLoading={false} /> */}
            </div>
        );
    };

    return (
        <div className="space-y-5">
            <div className="flex justify-between">
                <Title title={`All Users (${fakseUserData?.length || 0})`} />
                {/* <UsersForm handleFormSubmit={() => undefined} isLoading={false} /> */}
            </div>
            <div>
                <SharedTable
                    columns={columns}
                    isLoading={false}
                    data={fakseUserData || []}
                />
            </div>
        </div>
    );
};

export default Users;
