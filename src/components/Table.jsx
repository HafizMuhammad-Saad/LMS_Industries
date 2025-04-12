// import * as React from "react"

// import { cn } from "@/lib/utils"

// function Table({
//   className,
//   ...props
// }) {
//   return (
//     <div data-slot="table-container" className="relative w-full overflow-x-auto">
//       <table
//         data-slot="table"
//         className={cn("w-full caption-bottom text-sm", className)}
//         {...props} />
//     </div>
//   );
// }

// function TableHeader({
//   className,
//   ...props
// }) {
//   return (
//     <thead
//       data-slot="table-header"
//       className={cn("[&_tr]:border-b", className)}
//       {...props} />
//   );
// }

// function TableBody({
//   className,
//   ...props
// }) {
//   return (
//     <tbody
//       data-slot="table-body"
//       className={cn("[&_tr:last-child]:border-0", className)}
//       {...props} />
//   );
// }

// function TableFooter({
//   className,
//   ...props
// }) {
//   return (
//     <tfoot
//       data-slot="table-footer"
//       className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
//       {...props} />
//   );
// }

// function TableRow({
//   className,
//   ...props
// }) {
//   return (
//     <tr
//       data-slot="table-row"
//       className={cn(
//         "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
//         className
//       )}
//       {...props} />
//   );
// }

// function TableHead({
//   className,
//   ...props
// }) {
//   return (
//     <th
//       data-slot="table-head"
//       className={cn(
//         "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
//         className
//       )}
//       {...props} />
//   );
// }

// function TableCell({
//   className,
//   ...props
// }) {
//   return (
//     <td
//       data-slot="table-cell"
//       className={cn(
//         "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
//         className
//       )}
//       {...props} />
//   );
// }

// function TableCaption({
//   className,
//   ...props
// }) {
//   return (
//     <caption
//       data-slot="table-caption"
//       className={cn("text-muted-foreground mt-4 text-sm", className)}
//       {...props} />
//   );
// }

// export {
//   Table,
//   TableHeader,
//   TableBody,
//   TableFooter,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableCaption,
// }


import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react"
import { getUsers  } from "../utils/supabaseClient"
import { CircularProgress } from '@mui/material';
import { Box } from 'lucide-react';
import { Button } from 'react-bootstrap';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'Name', width: 130 },
  { field: 'role', headerName: 'Role', width: 130 },
  {
    field: 'action',
    headerName: 'Actions',
    width: 90,
    sortable: false,
    // renderCell: (params) => (
    //   <>
    //     <Button size="small" variant="contained" color="light" onClick={() => handleView(params.row)}>View</Button>
    //   </>
    // ),
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'text',
    width: 160,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 90,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {

  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState([])

  const userDetails = async () => {
    setLoading(true)
    const users = await getUsers()
    setRows(users.data)
    setLoading(false)
  }
  useEffect(() => {
    userDetails()
  }, [])
  if (loading) {
    return (
      <Box >
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    );

  }

}