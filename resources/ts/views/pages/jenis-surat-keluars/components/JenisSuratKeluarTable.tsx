import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getJenisSuratKeluars,
    setTableData,
    setSelectedJenisSuratKeluar,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import JenisSuratKeluarDeleteConfirmation from './JenisSuratKeluarDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'

type JenisSuratKeluar = {
    
	'kode': 'string',
	'nama': 'required|string',
	'format': 'string',
}

const ActionColumn = ({ row }: { row: JenisSuratKeluar }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        console.log(row);
        navigate(`/app/jenissuratkeluars/surat-edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedJenisSuratKeluar(row))
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

const JenisSuratKeluarsColumn = ({ row }: { row: JenisSuratKeluar }) => {
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

const JenisSuratKeluarsTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.jenisSuratKeluarsList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.jenisSuratKeluarsList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.jenisSuratKeluarsList.data.loading
    )

    const data = useAppSelector(
        (state) => state.jenisSuratKeluarsList.data.jenisSuratKeluarList
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
        dispatch(getJenisSuratKeluars({ pageIndex, pageSize, sort, query, filterData }))
    }

    const columns: ColumnDef<JenisSuratKeluar>[] = useMemo(
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
                header: "Format",
                accessorKey: "format",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.format}</span>
                },
            },
            {
                header: "Posisi",
                accessorKey: "posisi",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.posisi}</span>
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
            <JenisSuratKeluarDeleteConfirmation />
        </>
    )
}

export default JenisSuratKeluarsTable
