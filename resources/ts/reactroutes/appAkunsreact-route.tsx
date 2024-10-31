    {
        key: 'appsAkun.akuns',
        path: `${APP_PREFIX_PATH}/akuns/index`,
        component: lazy(() => import('@/views/akuns/Index')),
        authority: [ADMINISTRASI, USER],
    },
    {
        key: 'appsAkun.akunCreate',
        path: `${APP_PREFIX_PATH}/akuns/akun-create`,
        component: lazy(() => import('@/views/akuns/Create')),
        authority: [ADMINISTRASI, USER],
        meta: {
            header: 'Add New Akun',
        },
    },
    {
        key: 'appsAkun.akunEdit',
        path: `${APP_PREFIX_PATH}/akuns/akun-edit/:akunId`,
        component: lazy(() => import('@/views/akuns/Edit')),
        authority: [ADMINISTRASI, USER],
        meta: {
            header: 'Edit Akun',
        },
    },