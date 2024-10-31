import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetRoles,
    apiGetAllRoles,
    apiGetRole,
    apiUpdateRole,
    apiDeleteRole,
} from '@/services/RolesService'
import type { TableQueries } from '@/@types/common'

type Options = {
    label: string
    value: string
}
type Role = {
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

type Roles = Role[]

type RoleList = {
    draw: number
    recordsFiltered: number
    recordsTotal: number
    data: Roles
}

type GetRolesResponse = {
    data: RoleList
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

export type RolesState = {
    loading: boolean
    deleteConfirmation: boolean
    role: Role
    tableData: TableQueries
    filterData: FilterQueries
    roleList: Role[]
    roleList: Roles
}

type GetRolesRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'roles'

export const getRoles = createAsyncThunk(
    SLICE_NAME + '/getRoles',
    async (data: GetRolesRequest) => {
        const response = await apiGetRoles<
            GetRolesResponse,
            GetRolesRequest
        >(data)
        return response.data
    }
)

export const getAllRoles = createAsyncThunk(
    SLICE_NAME + '/getAllRoles',
    async (data: GetRolesRequest) => {
        const response = await apiGetAllRoles<
            GetRolesResponse,
            GetRolesRequest
        >(data)
        return response.data
    }
)

export const getRole = createAsyncThunk(
    SLICE_NAME + '/getRole',
    async (data: { id: string }) => {
        const response = await apiGetRole<
            Role,
            { id: string }
        >(data)
        return response.data
    }
)

export const updateRole = createAsyncThunk(
    SLICE_NAME + '/updateRole',
    async (data: Role) => {
        const response = await apiUpdateRole<
            Role,
            Role
        >(data)
        return response.data
    }
)

export const deleteRole = async (data: Role) => {
    const response = await apiDeleteRole<
        boolean,
        Role
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

const initialState: RolesState = {
    loading: false,
    deleteConfirmation: false,
    role: {
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
    roleList: [],
    roleList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    },
}

const rolesSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.roleList = action.payload
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
        setSelectedRole: (state, action) => {
            state.role = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoles.fulfilled, (state, action) => {
                state.roleList = action.payload.data.data;
                state.tableData.total = action.payload.data.recordsTotal
                state.loading = false
            })
            .addCase(getRoles.pending, (state) => {
                state.loading = true
            })
            .addCase(getRoles.rejected, (state) => {
                state.loading = true
            })
            .addCase(getAllRoles.fulfilled, (state, action) => {
                state.roleList = action.payload.data;
                state.loading = false
            })
            .addCase(getAllRoles.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllRoles.rejected, (state) => {
                state.loading = false
            })
            .addCase(getRole.fulfilled, (state, action) => {
                state.role = action.payload;
                // state.tableData.total = action.payload.data.recordsTotal
                // state.filterData.name = 'Darsono';
                state.loading = false                
            })
            .addCase(getRole.pending, (state) => {
                state.loading = true
            })
            .addCase(getRole.rejected, (state) => {
                state.loading = false
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                // state.role = action.payload;
                state.loading = false
            })
            .addCase(updateRole.pending, (state) => {
                state.loading = true
            })
            .addCase(updateRole.rejected, (state) => {
                state.loading = false
            })
    },
})

export const {
    // updateProductList,
    setTableData,
    // setFilterData,
    toggleDeleteConfirmation,
    setSelectedRole,
} = rolesSlice.actions

export default rolesSlice.reducer
