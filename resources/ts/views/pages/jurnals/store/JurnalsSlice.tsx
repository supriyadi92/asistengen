import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetJurnals,
    apiGetAllJurnals,
    apiGetJurnal,
    apiUpdateJurnal,
    apiDeleteJurnal,
} from '@/services/JurnalsService'
import type { TableQueries } from '@/@types/common'

type Options = {
    label: string
    value: string
}
type Jurnal = {
    id?: string
    
	tanggal?: string,
	nomor_bukti?: string,
	kode_pembantu?: string,
	uraian?: string,
	kategori_jurnal_id?: number,
	akun_debet_id?: number,
	akun_kredit_id?: number,
	jumlah_debet?: number,
	jumlah_kredit?: number,
	keterangan?: string,
	posting_id?: number,
}

type Jurnals = Jurnal[]

type JurnalList = {
    draw: number
    recordsFiltered: number
    recordsTotal: number
    data: Jurnals
}

type GetJurnalsResponse = {
    data: JurnalList
    message: string
    success: boolean
}

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

export type JurnalsState = {
    loading: boolean
    deleteConfirmation: boolean
    jurnal: Jurnal
    tableData: TableQueries
    filterData: FilterQueries
    jurnalList: Jurnals
}

type GetJurnalsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'jurnals'

export const getJurnals = createAsyncThunk(
    SLICE_NAME + '/getJurnals',
    async (data: GetJurnalsRequest) => {
        const response = await apiGetJurnals<
            GetJurnalsResponse,
            GetJurnalsRequest
        >(data)
        return response.data
    }
)

export const getAllJurnals = createAsyncThunk(
    SLICE_NAME + '/getAllJurnals',
    async (data: GetJurnalsRequest) => {
        const response = await apiGetAllJurnals<
            GetJurnalsResponse,
            GetJurnalsRequest
        >(data)
        return response.data
    }
)

export const getJurnal = createAsyncThunk(
    SLICE_NAME + '/getJurnal',
    async (data: { id: string }) => {
        const response = await apiGetJurnal<
            Jurnal,
            { id: string }
        >(data)
        return response.data
    }
)

export const updateJurnal = createAsyncThunk(
    SLICE_NAME + '/updateJurnal',
    async (data: Jurnal) => {
        const response = await apiUpdateJurnal<
            Jurnal,
            Jurnal
        >(data)
        return response.data
    }
)

export const deleteJurnal = async (data: Jurnal) => {
    const response = await apiDeleteJurnal<
        boolean,
        Jurnal
    >(data)
    return response.data
    // return true;
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const initialState: JurnalsState = {
    loading: false,
    deleteConfirmation: false,
    jurnal: {
        id: '',
        
	tanggal: '',
	nomor_bukti: '',
	kode_pembantu: '',
	uraian: '',
	kategori_jurnal_id: '',
	akun_debet_id: '',
	akun_kredit_id: '',
	jumlah_debet: '',
	jumlah_kredit: '',
	keterangan: '',
	posting_id: '',
    },
    jurnalList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    },
}

const jurnalsSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.jurnalList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedJurnal: (state, action) => {
            state.jurnal = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getJurnals.fulfilled, (state, action) => {
                state.jurnalList = action.payload.data.data;
                state.tableData.total = action.payload.data.recordsTotal
                state.loading = false
            })
            .addCase(getJurnals.pending, (state) => {
                state.loading = true
            })
            .addCase(getJurnals.rejected, (state) => {
                state.loading = true
            })
            .addCase(getAllJurnals.fulfilled, (state, action) => {
                state.jurnalList = action.payload.data;
                state.loading = false
            })
            .addCase(getAllJurnals.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllJurnals.rejected, (state) => {
                state.loading = false
            })
            .addCase(getJurnal.fulfilled, (state, action) => {
                state.jurnal = action.payload;
                // state.tableData.total = action.payload.data.recordsTotal
                // state.filterData.name = 'Darsono';
                state.loading = false                
            })
            .addCase(getJurnal.pending, (state) => {
                state.loading = true
            })
            .addCase(getJurnal.rejected, (state) => {
                state.loading = false
            })
            .addCase(updateJurnal.fulfilled, (state, action) => {
                // state.jurnal = action.payload;
                state.loading = false
            })
            .addCase(updateJurnal.pending, (state) => {
                state.loading = true
            })
            .addCase(updateJurnal.rejected, (state) => {
                state.loading = false
            })
    },
})

export const {
    // updateProductList,
    setTableData,
    // setFilterData,
    toggleDeleteConfirmation,
    setSelectedJurnal,
} = jurnalsSlice.actions

export default jurnalsSlice.reducer
