import AsistenService from './AsistenService'

export async function apiGetAllJenisSuratKeluars<T, U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: '/jenissuratkeluars/get',
        method: 'post',
        data,
    })
}

export async function apiGetJenisSuratKeluars<T, U extends Record<string, unknown>>(
    data: U
) {
    return AsistenService.fetchData<T>({
        url: '/jenissuratkeluars/list',
        method: 'post',
        data,
    })
}

export async function apiGetJenisSuratKeluar<T, U extends Record<string, unknown>>(
    params: U
) {
    return AsistenService.fetchData<T>({
        url: `/jenissuratkeluars/${params.id}/edit`,
        method: 'get',
    })
}

export async function apiCreateJenisSuratKeluar<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: '/jenissuratkeluars',
        method: 'post',
        data,
    })
}

export async function apiUpdateJenisSuratKeluar<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: `/jenissuratkeluars/${data.id}`,
        method: 'put',
        data,
    })
}

export async function apiDeleteJenisSuratKeluar<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return AsistenService.fetchData<T>({
        url: `/jenissuratkeluars/${data.id}`,
        method: 'delete'
    })
}