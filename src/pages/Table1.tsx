
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Country {
    name: string;
    code: string;
}

interface Representative {
    name: string;
    code: string;
}

interface Customer {
    id: number;
    name: string;
    country: Country;
    company: string;
    date: string;
    status: string;
    verified: boolean;
    activity: number;
    representative: Representative;
    balance: number;
}

export default function PaginatorTemplateDemo() {

    const [customers, setCustomers] = useState<Customer[]>([
        {
            "id": 1,
            "name": "Customer 1",
            "country": { "name": "USA", "code": "US" },
            "company": "Company 1",
            "date": "2023-06-17",
            "status": "qualified",
            "verified": true,
            "activity": 35,
            "representative": { "name": "Alice", "code": "AL" },
            "balance": 5312.42
        },
        {
            "id": 2,
            "name": "Customer 2",
            "country": { "name": "India", "code": "IN" },
            "company": "Company 2",
            "date": "2022-10-21",
            "status": "negotiation",
            "verified": false,
            "activity": 72,
            "representative": { "name": "Bob", "code": "BO" },
            "balance": 2091.77
        },
        {
            "id": 3,
            "name": "Customer 3",
            "country": { "name": "Germany", "code": "DE" },
            "company": "Company 3",
            "date": "2021-04-05",
            "status": "unqualified",
            "verified": true,
            "activity": 64,
            "representative": { "name": "Charlie", "code": "CH" },
            "balance": 8420.95
        },
        {
            "id": 4,
            "name": "Customer 4",
            "country": { "name": "Brazil", "code": "BR" },
            "company": "Company 4",
            "date": "2020-11-13",
            "status": "new",
            "verified": false,
            "activity": 12,
            "representative": { "name": "Diana", "code": "DI" },
            "balance": 450.25
        },
        {
            "id": 5,
            "name": "Customer 5",
            "country": { "name": "Japan", "code": "JP" },
            "company": "Company 5",
            "date": "2023-01-01",
            "status": "renewal",
            "verified": true,
            "activity": 88,
            "representative": { "name": "Ethan", "code": "ET" },
            "balance": 7642.31
        },
        {
            "id": 6,
            "name": "Customer 6",
            "country": { "name": "USA", "code": "US" },
            "company": "Company 6",
            "date": "2024-02-18",
            "status": "qualified",
            "verified": false,
            "activity": 27,
            "representative": { "name": "Alice", "code": "AL" },
            "balance": 2345.67
        },
        {
            "id": 7,
            "name": "Customer 7",
            "country": { "name": "India", "code": "IN" },
            "company": "Company 7",
            "date": "2022-07-24",
            "status": "negotiation",
            "verified": true,
            "activity": 53,
            "representative": { "name": "Bob", "code": "BO" },
            "balance": 1250.75
        },
        {
            "id": 8,
            "name": "Customer 8",
            "country": { "name": "Germany", "code": "DE" },
            "company": "Company 8",
            "date": "2023-03-29",
            "status": "unqualified",
            "verified": false,
            "activity": 78,
            "representative": { "name": "Charlie", "code": "CH" },
            "balance": 3911.82
        },
        {
            "id": 9,
            "name": "Customer 9",
            "country": { "name": "Brazil", "code": "BR" },
            "company": "Company 9",
            "date": "2020-12-10",
            "status": "new",
            "verified": true,
            "activity": 42,
            "representative": { "name": "Diana", "code": "DI" },
            "balance": 1120.60
        },
        {
            "id": 10,
            "name": "Customer 10",
            "country": { "name": "Japan", "code": "JP" },
            "company": "Company 10",
            "date": "2021-08-15",
            "status": "renewal",
            "verified": false,
            "activity": 91,
            "representative": { "name": "Ethan", "code": "ET" },
            "balance": 2876.90
        }
        // ...continue until id: 100
    ]
    );


    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;


    return (
        <div className="card">
            <DataTable value={customers} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                <Column field="country.name" header="Country" style={{ width: '25%' }}></Column>
                <Column field="company" header="Company" style={{ width: '25%' }}></Column>
                <Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    );
}
