import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteAkun,
    getAkuns,
    useAppDispatch,
    useAppSelector,
} from '../store'

const AkunDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.akunsList.data.deleteConfirmation
    )
    const selectedAkun = useAppSelector(
        (state) => state.akunsList.data.akun
    )
    const tableData = useAppSelector(
        (state) => state.akunsList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        try{
            const success = await deleteAkun(selectedAkun)
            if (success) {
                dispatch(getAkuns(tableData))
                toast.push(
                    <Notification
                        title={'Successfuly Deleted'}
                        type="success"
                        duration={2500}
                    >
                        Product successfuly deleted
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
            }
        } catch(error){

                toast.push(
                    <Notification
                        title={'Failed to Deleted'}
                        type="danger"
                        duration={2500}
                    >
                        {(error as any).message}
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )        
            
        }
        
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Delete Akun"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Are you sure you want to delete this Akun? This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default AkunDeleteConfirmation
