import AsistenService from './AsistenService'

export async function apiGetAllKategoriJurnals<T, U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: '/kategorijurnals/get',
        method: 'post',
        data,
    })
}

export async function apiGetKategoriJurnals<T, U extends Record<string, unknown>>(
    data: U
) {
    return AsistenService.fetchData<T>({
        url: '/kategorijurnals/list',
        method: 'post',
        data,
    })
}

export async function apiGetKategoriJurnal<T, U extends Record<string, unknown>>(
    params: U
) {
    return AsistenService.fetchData<T>({
        url: `/kategorijurnals/${params.id}/edit`,
        method: 'get',
    })
}

export async function apiCreateKategoriJurnal<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: '/kategorijurnals',
        method: 'post',
        data,
    })
}

export async function apiUpdateKategoriJurnal<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: `/kategorijurnals/${data.id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteKategoriJurnal<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: `/kategorijurnals/${data.id}`,
        method: 'delete'
    })
}