import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetAkuns,
    apiGetAllAkuns,
    apiGetAkun,
    apiUpdateAkun,
    apiDeleteAkun,
} from '@/services/AkunsService'
import type { TableQueries } from '@/@types/common'

type Options = {
    label: string
    value: string
}
type Akun = {
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

type Akuns = Akun[]

type AkunList = {
    draw: number
    recordsFiltered: number
    recordsTotal: number
    data: Akuns
}

type GetAkunsResponse = {
    data: AkunList
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

export type AkunsState = {
    loading: boolean
    deleteConfirmation: boolean
    akun: Akun
    tableData: TableQueries
    filterData: FilterQueries
    akunList: Akuns
}

type GetAkunsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'akuns'

export const getAkuns = createAsyncThunk(
    SLICE_NAME + '/getAkuns',
    async (data: GetAkunsRequest) => {
        const response = await apiGetAkuns<
            GetAkunsResponse,
            GetAkunsRequest
        >(data)
        return response.data
    }
)

export const getAllAkuns = createAsyncThunk(
    SLICE_NAME + '/getAllAkuns',
    async (data: GetAkunsRequest) => {
        const response = await apiGetAllAkuns<
            GetAkunsResponse,
            GetAkunsRequest
        >(data)
        return response.data
    }
)

export const getAkun = createAsyncThunk(
    SLICE_NAME + '/getAkun',
    async (data: { id: string }) => {
        const response = await apiGetAkun<
            Akun,
            { id: string }
        >(data)
        return response.data
    }
)

export const updateAkun = createAsyncThunk(
    SLICE_NAME + '/updateAkun',
    async (data: Akun) => {
        const response = await apiUpdateAkun<
            Akun,
            Akun
        >(data)
        return response.data
    }
)

export const deleteAkun = async (data: Akun) => {
    const response = await apiDeleteAkun<
        boolean,
        Akun
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

const initialState: AkunsState = {
    loading: false,
    deleteConfirmation: false,
    akun: {
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
    akunList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    },
}

const akunsSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.akunList = action.payload
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
        setSelectedAkun: (state, action) => {
            state.akun = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAkuns.fulfilled, (state, action) => {
                state.akunList = action.payload.data.data;
                state.tableData.total = action.payload.data.recordsTotal
                state.loading = false
            })
            .addCase(getAkuns.pending, (state) => {
                state.loading = true
            })
            .addCase(getAkuns.rejected, (state) => {
                state.loading = true
            })
            .addCase(getAllAkuns.fulfilled, (state, action) => {
                state.akunList = action.payload.data.data;
                state.loading = false
            })
            .addCase(getAllAkuns.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllAkuns.rejected, (state) => {
                state.loading = false
            })
            .addCase(getAkun.fulfilled, (state, action) => {
                state.akun = action.payload;
                // state.tableData.total = action.payload.data.recordsTotal
                // state.filterData.name = 'Darsono';
                state.loading = false                
            })
            .addCase(getAkun.pending, (state) => {
                state.loading = true
            })
            .addCase(getAkun.rejected, (state) => {
                state.loading = false
            })
            .addCase(updateAkun.fulfilled, (state, action) => {
                // state.akun = action.payload;
                state.loading = false
            })
            .addCase(updateAkun.pending, (state) => {
                state.loading = true
            })
            .addCase(updateAkun.rejected, (state) => {
                state.loading = false
            })
    },
})

export const {
    // updateProductList,
    setTableData,
    // setFilterData,
    toggleDeleteConfirmation,
    setSelectedAkun,
} = akunsSlice.actions

export default akunsSlice.reducer
