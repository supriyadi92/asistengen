import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getAkuns,
    setTableData,
    setSelectedAkun,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import AkunDeleteConfirmation from './AkunDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'

type Akun = {
    
	kode: required|string,
	nama: string,
	pos_akun: string,
	pos_laporan: string,
	saldo_awal_debet: number,
	saldo_awal_kredit: number,
}

const ActionColumn = ({ row }: { row: Akun }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        console.log(row);
        navigate(`/app/akuns/akun-edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedAkun(row))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const AkunsColumn = ({ row }: { row: Akun }) => {
    const avatar = row.img ? (
        <Avatar src={row.img} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row.nomor_surat.length > 10 ?
                    `${row.nomor_surat.substring(0, 10)}...` : row.nomor_surat
                }
            </span>
        </div>
    )
}

const AkunsTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.akunsList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.akunsList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.akunsList.data.loading
    )

    const data = useAppSelector(
        (state) => state.akunsList.data.akunList
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getAkuns({ pageIndex, pageSize, sort, query, filterData }))
    }

    const columns: ColumnDef<Akun>[] = useMemo(
        () => [
            {
                header: "No",
                id: 'rowNumber',
            },            
            
            {
                header: "Kode",
                accessorKey: "kode",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.kode}</span>
                },
            },
            {
                header: "Nama",
                accessorKey: "nama",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.nama}</span>
                },
            },
            {
                header: "Pos Akun",
                accessorKey: "pos_akun",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.pos_akun}</span>
                },
            },
            {
                header: "Pos Laporan",
                accessorKey: "pos_laporan",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.pos_laporan}</span>
                },
            },
            {
                header: "Saldo Awal Debet",
                accessorKey: "saldo_awal_debet",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.saldo_awal_debet}</span>
                },
            },
            {
                header: "Saldo Awal Kredit",
                accessorKey: "saldo_awal_kredit",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.saldo_awal_kredit}</span>
                },
            },

            {
                header: 'Action',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <AkunDeleteConfirmation />
        </>
    )
}

export default AkunsTable
