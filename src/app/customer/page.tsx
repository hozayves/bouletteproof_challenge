'use client'
import { useState } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { useGetCustomer } from '@/hooks/useGetCustomer';
import Link from 'next/link';
import { Table } from '@/components/Table/Table';

type CustomerType = {
    id: number,
    first_name: string,
    last_name: string,
    customer_email: string,
    signup_date: string,
    last_activity: string
}

export default function CustomerPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: customers, isLoading, error } = useGetCustomer();

    const filteredCustomers = customers?.filter(customer =>
        customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const columns: ColumnDef<CustomerType>[] = [
        {
            id: "NAME",
            accessorFn: (row) => `${row.first_name} ${row.last_name}`,
            header: ({ column }) => (
                <span
                    className="font-semibold uppercase text-xs hover:cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    name
                </span>
            ),
        },
        {
            id: "EMAIL",
            accessorFn: (row) => row.customer_email,
            header: ({ column }) => (
                <span
                    className="font-semibold uppercase text-xs hover:cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    email
                </span>
            ),
        },
        {
            id: "SIGNUP_DATE",
            accessorFn: (row) => row.signup_date,
            header: ({ column }) => (
                <span
                    className="font-semibold uppercase text-xs hover:cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    signup date
                </span>
            ),
        },
        {
            id: "LAST_ACTIVITY",
            accessorFn: (row) => row.last_activity,
            header: ({ column }) => (
                <span
                    className="font-semibold uppercase text-xs hover:cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    last activity
                </span>
            ),
        },
    ];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container min-w-full p-4 rounded-lg bg-white">
            <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border rounded w-[20%]"
            />
            <Table
                data={filteredCustomers}
                columns={columns}
                pagination={{
                    pageSize: 10,
                    pageIndex: 0,
                }}
            />
        </div>
    );
}