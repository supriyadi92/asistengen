import AsistenService from './AsistenService'

export async function apiGetAllJurnals<T, U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: '/jurnals/get',
        method: 'post',
        data,
    })
}

export async function apiGetJurnals<T, U extends Record<string, unknown>>(
    data: U
) {
    return AsistenService.fetchData<T>({
        url: '/jurnals/list',
        method: 'post',
        data,
    })
}

export async function apiGetJurnal<T, U extends Record<string, unknown>>(
    params: U
) {
    return AsistenService.fetchData<T>({
        url: `/jurnals/${params.id}/edit`,
        method: 'get',
    })
}

export async function apiCreateJurnal<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: '/jurnals',
        method: 'post',
        data,
    })
}

export async function apiUpdateJurnal<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: `/jurnals/${data.id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteJurnal<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: `/jurnals/${data.id}`,
        method: 'delete'
    })
}