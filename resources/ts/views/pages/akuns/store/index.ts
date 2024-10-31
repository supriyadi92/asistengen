import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, AkunsState } from './akunsSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: AkunsState
        }
    }
> = useSelector

export * from './akunsSlice'
export { useAppDispatch } from '@/store'
export default reducer
