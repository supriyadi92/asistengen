import AsistenService from './AsistenService'

export async function apiGetAllAkuns<T, U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: '/akuns/get',
        method: 'post',
        data,
    })
}

export async function apiGetAkuns<T, U extends Record<string, unknown>>(
    data: U
) {
    return AsistenService.fetchData<T>({
        url: '/akuns/list',
        method: 'post',
        data,
    })
}

export async function apiGetAkun<T, U extends Record<string, unknown>>(
    params: U
) {
    return AsistenService.fetchData<T>({
        url: `/akuns/${params.id}/edit`,
        method: 'get',
    })
}

export async function apiCreateAkun<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: '/akuns',
        method: 'post',
        data,
    })
}

export async function apiUpdateAkun<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: `/akuns/${data.id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteAkun<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: `/akuns/${data.id}`,
        method: 'delete'
    })
}