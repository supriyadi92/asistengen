import { useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getJurnals,
    setTableData,
    setSelectedJurnal,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import JurnalDeleteConfirmation from './JurnalDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'

type Jurnal = {
	id: string,
    
	tanggal: string,
	nomor_bukti: string,
	kode_pembantu: string,
	uraian: string,
	kategori_jurnal_id: number,
	akun_debet_id: number,
	akun_kredit_id: number,
	jumlah_debet: number,
	jumlah_kredit: number,
	keterangan: string,
	posting_id: number,
}

const ActionColumn = ({ row }: { row: Jurnal }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        console.log(row);
        navigate(`/app/jurnals/jurnal-edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedJurnal(row))
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

const JurnalsTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.jurnalsList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.jurnalsList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.jurnalsList.data.loading
    )

    const data = useAppSelector(
        (state) => state.jurnalsList.data.jurnalList
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
        dispatch(getJurnals({ pageIndex, pageSize, sort, query, filterData }))
    }

    const columns: ColumnDef<Jurnal>[] = useMemo(
        () => [
            {
                header: "No",
                id: 'rowNumber',
            },            
            
            {
                header: "Tanggal",
                accessorKey: "tanggal",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.tanggal}</span>
                },
            },
            {
                header: "Nomor Bukti",
                accessorKey: "nomor_bukti",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.nomor_bukti}</span>
                },
            },
            {
                header: "Kode Pembantu",
                accessorKey: "kode_pembantu",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.kode_pembantu}</span>
                },
            },
            {
                header: "Uraian",
                accessorKey: "uraian",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.uraian}</span>
                },
            },
            {
                header: "Kategori Jurnal Id",
                accessorKey: "kategori_jurnal_id",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.kategori_jurnal_id}</span>
                },
            },
            {
                header: "Akun Debet Id",
                accessorKey: "akun_debet_id",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.akun_debet_id}</span>
                },
            },
            {
                header: "Akun Kredit Id",
                accessorKey: "akun_kredit_id",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.akun_kredit_id}</span>
                },
            },
            {
                header: "Jumlah Debet",
                accessorKey: "jumlah_debet",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.jumlah_debet}</span>
                },
            },
            {
                header: "Jumlah Kredit",
                accessorKey: "jumlah_kredit",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.jumlah_kredit}</span>
                },
            },
            {
                header: "Keterangan",
                accessorKey: "keterangan",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.keterangan}</span>
                },
            },
            {
                header: "Posting Id",
                accessorKey: "posting_id",
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.posting_id}</span>
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
            <JurnalDeleteConfirmation />
        </>
    )
}

export default JurnalsTable
