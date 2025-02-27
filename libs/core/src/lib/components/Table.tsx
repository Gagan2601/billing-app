interface TableProps {
    headers: string[];
    children: React.ReactNode;
}

export const Table = ({ headers, children }: TableProps) => (
    <div className="overflow-x-auto">
        <table className="w-full">
            <thead className="bg-gray-50">
                <tr>
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {children}
            </tbody>
        </table>
    </div>
);