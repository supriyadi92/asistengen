    {
        key: 'appsJurnal.jurnals',
        path: `${APP_PREFIX_PATH}/jurnals/index`,
        component: lazy(() => import('@/views/jurnals/Index')),
        authority: [ADMINISTRASI, USER],
    },
    {
        key: 'appsJurnal.jurnalCreate',
        path: `${APP_PREFIX_PATH}/jurnals/jurnal-create`,
        component: lazy(() => import('@/views/jurnals/Create')),
        authority: [ADMINISTRASI, USER],
        meta: {
            header: 'Add New Jurnal',
        },
    },
    {
        key: 'appsJurnal.jurnalEdit',
        path: `${APP_PREFIX_PATH}/jurnals/jurnal-edit/:jurnalId`,
        component: lazy(() => import('@/views/jurnals/Edit')),
        authority: [ADMINISTRASI, USER],
        meta: {
            header: 'Edit Jurnal',
        },
    },