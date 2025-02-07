import React from 'react';
import Heading from '@/components/ui/Heading';

interface TableRow {
    [key: string]: React.ReactNode; // Adjust the type based on your data
}

type TableProps = {
    data: TableRow[];
    headers: {
        id: string;
        title: string;
        columns: Array<{
            key: string;
            title: string;
            className: string;
        }>;
    };
};

const Table = ({ data, headers }: TableProps) => {
    return (
        <div>
            {headers && (
                <Heading level={2} id={headers.id}>{headers.title}</Heading>
            )}
            <table className="table-auto w-full text-start">
                <thead className="text-zinc-700 uppercase bg-zinc-300 px-6 py-3 border-b-2 border-zinc-50">
                    <tr>
                        {headers && headers.columns.map((column, index) => (
                            <th key={index} className={column.className}>{column.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-slate-100 even:bg-zinc-100">
                            {Object.entries(row).map(([key, value], index) => {
                                const column = headers.columns.find(col => col.key === key);
                                const className = column ? column.className : 'default-class';
                                return (
                                    <td key={index} className={className}>
                                        {value}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
