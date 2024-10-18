import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetJenisSuratKeluars,
    apiGetAllJenisSuratKeluars,
    apiGetJenisSuratKeluar,
    apiUpdateJenisSuratKeluar,
    apiDeleteJenisSuratKeluar,
} from '@/services/JenisSuratKeluarsService'
import type { TableQueries } from '@/@types/common'

type Options = {
    label: string
    value: string
}
type JenisSuratKeluar = {
    id?: string
    nomor_surat?: string,
    tanggal_surat?: string,
    nama_pengirim?: string,
    tanggal_terima?: string,
    jenis_surat_masuk_id: Options | string,
    perihal?: string,
    nama_peserta?: string,
    nrp_peserta?: string,
    kpa_peserta?: string,
    nopens_peserta?: string,
    pangkat_peserta?: string,
    nama_pemohon?: string,
    nomor_hp?: string,
    alamat?: string,
    keterangan?: string,
}

type JenisSuratKeluars = JenisSuratKeluar[]

type JenisSuratKeluarList = {
    draw: number
    recordsFiltered: number
    recordsTotal: number
    data: JenisSuratKeluars
}

type GetJenisSuratKeluarsResponse = {
    data: JenisSuratKeluarList
    message: string
    success: boolean
    recordsTotal: number
}

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

export type JenisSuratKeluarsState = {
    loading: boolean
    deleteConfirmation: boolean
    jenisSuratKeluar: JenisSuratKeluar
    tableData: TableQueries
    filterData: FilterQueries
    jenisSuratKeluarList: JenisSuratKeluar[]
    jenisSuratKeluarList: JenisSuratKeluars
}

type GetJenisSuratKeluarsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'jenisSuratKeluars'

export const getJenisSuratKeluars = createAsyncThunk(
    SLICE_NAME + '/getJenisSuratKeluars',
    async (data: GetJenisSuratKeluarsRequest) => {
        const response = await apiGetJenisSuratKeluars<
            GetJenisSuratKeluarsResponse,
            GetJenisSuratKeluarsRequest
        >(data)
        return response.data
    }
)

export const getAllJenisSuratKeluars = createAsyncThunk(
    SLICE_NAME + '/getAllJenisSuratKeluars',
    async (data: GetJenisSuratKeluarsRequest) => {
        const response = await apiGetAllJenisSuratKeluars<
            GetJenisSuratKeluarsResponse,
            GetJenisSuratKeluarsRequest
        >(data)
        return response.data
    }
)

export const getJenisSuratKeluar = createAsyncThunk(
    SLICE_NAME + '/getJenisSuratKeluar',
    async (data: { id: string }) => {
        const response = await apiGetJenisSuratKeluar<
            JenisSuratKeluar,
            { id: string }
        >(data)
        return response.data
    }
)

export const updateJenisSuratKeluar = createAsyncThunk(
    SLICE_NAME + '/updateJenisSuratKeluar',
    async (data: JenisSuratKeluar) => {
        const response = await apiUpdateJenisSuratKeluar<
            JenisSuratKeluar,
            JenisSuratKeluar
        >(data)
        return response.data
    }
)

export const deleteJenisSuratKeluar = async (data: JenisSuratKeluar) => {
    const response = await apiDeleteJenisSuratKeluar<
        boolean,
        JenisSuratKeluar
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

const initialState: JenisSuratKeluarsState = {
    loading: false,
    deleteConfirmation: false,
    jenisSuratKeluar: {
        id: '',
        nomor_surat: '',
        tanggal_surat: '',
        nama_pengirim: '',
        tanggal_terima: '',
        jenis_surat_masuk_id: '',
        perihal: '',
        nama_peserta: '',
        nrp_peserta: '',
        kpa_peserta: '',
        nopens_peserta: '',
        pangkat_peserta: '',
        nama_pemohon: '',
        nomor_hp: '',
        alamat: '',
        keterangan: '',
    },
    jenisSuratKeluarList: [],
    jenisSuratKeluarList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    },
}

const jenisSuratKeluarsSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.jenisSuratKeluarList = action.payload
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
        setSelectedJenisSuratKeluar: (state, action) => {
            state.jenisSuratKeluar = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getJenisSuratKeluars.fulfilled, (state, action) => {
                state.jenisSuratKeluarList = action.payload.data.data;
                state.tableData.total = action.payload.data.recordsTotal
                state.loading = false
            })
            .addCase(getJenisSuratKeluars.pending, (state) => {
                state.loading = true
            })
            .addCase(getJenisSuratKeluars.rejected, (state) => {
                state.loading = true
            })
            .addCase(getAllJenisSuratKeluars.fulfilled, (state, action) => {
                state.jenisSuratKeluarList = action.payload.data;
                state.loading = false
            })
            .addCase(getAllJenisSuratKeluars.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllJenisSuratKeluars.rejected, (state) => {
                state.loading = false
            })
            .addCase(getJenisSuratKeluar.fulfilled, (state, action) => {
                state.jenisSuratKeluar = action.payload;
                // state.tableData.total = action.payload.data.recordsTotal
                // state.filterData.name = 'Darsono';
                state.loading = false                
            })
            .addCase(getJenisSuratKeluar.pending, (state) => {
                state.loading = true
            })
            .addCase(getJenisSuratKeluar.rejected, (state) => {
                state.loading = false
            })
            .addCase(updateJenisSuratKeluar.fulfilled, (state, action) => {
                // state.jenisSuratKeluar = action.payload;
                state.loading = false
            })
            .addCase(updateJenisSuratKeluar.pending, (state) => {
                state.loading = true
            })
            .addCase(updateJenisSuratKeluar.rejected, (state) => {
                state.loading = false
            })
    },
})

export const {
    // updateProductList,
    setTableData,
    // setFilterData,
    toggleDeleteConfirmation,
    setSelectedJenisSuratKeluar,
} = jenisSuratKeluarsSlice.actions

export default jenisSuratKeluarsSlice.reducer
