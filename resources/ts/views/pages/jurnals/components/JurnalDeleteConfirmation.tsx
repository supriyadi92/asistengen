import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteJurnal,
    getJurnals,
    useAppDispatch,
    useAppSelector,
} from '../store'

const JurnalDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.jurnalsList.data.deleteConfirmation
    )
    const selectedJurnal = useAppSelector(
        (state) => state.jurnalsList.data.jurnal
    )
    const tableData = useAppSelector(
        (state) => state.jurnalsList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        try{
            const success = await deleteJurnal(selectedJurnal)
            if (success) {
                dispatch(getJurnals(tableData))
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
            title="Delete Jurnal"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Are you sure you want to delete this Jurnal? This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default JurnalDeleteConfirmation
