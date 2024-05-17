import { fetchCustomers, fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { CardsSkeleton } from '@/app/ui/skeletons';

import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Customers',
};
export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const customers = await fetchFilteredCustomers(query);
  
    // const customers = await fetchCustomers();

    return (
        <div>
            <Suspense  key={query + currentPage} fallback={<CardsSkeleton />}>
                <CustomersTable customers={customers} />
            </Suspense>
        </div>
    );
}