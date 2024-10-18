import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteJenisSuratKeluar,
    getJenisSuratKeluars,
    useAppDispatch,
    useAppSelector,
} from '../store'

const JenisSuratKeluarDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.jenisSuratKeluarsList.data.deleteConfirmation
    )
    const selectedJenisSuratKeluar = useAppSelector(
        (state) => state.jenisSuratKeluarsList.data.jenisSuratKeluar
    )
    const tableData = useAppSelector(
        (state) => state.jenisSuratKeluarsList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        try{
            const success = await deleteJenisSuratKeluar(selectedJenisSuratKeluar)
            if (success) {
                dispatch(getJenisSuratKeluars(tableData))
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
            title="Delete product"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Are you sure you want to delete this product? All record related
                to this product will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default JenisSuratKeluarDeleteConfirmation
