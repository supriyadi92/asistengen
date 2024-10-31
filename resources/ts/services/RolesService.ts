import AsistenService from './AsistenService'

export async function apiGetAllRoles<T, U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: '/roles/get',
        method: 'post',
        data,
    })
}

export async function apiGetRoles<T, U extends Record<string, unknown>>(
    data: U
) {
    return AsistenService.fetchData<T>({
        url: '/roles/list',
        method: 'post',
        data,
    })
}

export async function apiGetRole<T, U extends Record<string, unknown>>(
    params: U
) {
    return AsistenService.fetchData<T>({
        url: `/roles/${params.id}/edit`,
        method: 'get',
    })
}

export async function apiCreateRole<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: '/roles',
        method: 'post',
        data,
    })
}

export async function apiUpdateRole<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: `/roles/${data.id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteRole<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: `/roles/${data.id}`,
        method: 'delete'
    })
}