    {
        key: 'appsKategoriJurnal.kategorijurnals',
        path: `${APP_PREFIX_PATH}/kategorijurnals/index`,
        component: lazy(() => import('@/views/kategorijurnals/Index')),
        authority: [ADMINISTRASI, USER],
    },
    {
        key: 'appsKategoriJurnal.kategoriJurnalCreate',
        path: `${APP_PREFIX_PATH}/kategorijurnals/kategori-jurnal-create`,
        component: lazy(() => import('@/views/kategorijurnals/Create')),
        authority: [ADMINISTRASI, USER],
        meta: {
            header: 'Add New Kategori Jurnal',
        },
    },
    {
        key: 'appsKategoriJurnal.kategoriJurnalEdit',
        path: `${APP_PREFIX_PATH}/kategorijurnals/kategori-jurnal-edit/:kategoriJurnalId`,
        component: lazy(() => import('@/views/kategorijurnals/Edit')),
        authority: [ADMINISTRASI, USER],
        meta: {
            header: 'Edit Kategori Jurnal',
        },
    },