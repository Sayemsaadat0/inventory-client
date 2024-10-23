import { FC } from 'react';
import Loader from '../Loader';

export type SharedTableColumn = {
    title: string;
    dataKey: string;
    row: (data: any) => React.ReactNode;
};

export type SharedTableProps = {
    columns: SharedTableColumn[];
    data: any[];
    isLoading: boolean;
};

const SharedTable: FC<SharedTableProps> = ({ columns, data, isLoading }) => {
    return (
        <div className="overflow-x-auto max-w-full text-[18px] ">
            <div className="w-full">
                <table className="w-full text-left ">
                    <thead className="sticky  z-10 top-0 w-full h-fit bg-black/70">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className="px-5 py-3 text-[14px] border-r border-black/10 tableAction font-normal"
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="w-full backdrop-blur-md bg-black/50">
                        {!isLoading &&
                            data &&
                            data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="">
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="px-2  border border-black/10  xl:px-5 py-3 h-fit  break-words"
                                        >
                                            {column.row(row)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className='bg-black/50 backdrop-blur-sm '>
                    {isLoading && (
                        <div className="flex justify-center py-3 items-center h-10 my-6">
                            <Loader />
                        </div>
                    )}
                    {!isLoading && data?.length === 0 && (
                        <div className="flex  justify-center items-center my-6 py-3">
                            <p className="">No Data Available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SharedTable;
