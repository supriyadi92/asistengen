import { useEffect, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import {
    getAkun,
    updateAkun,
    useAppDispatch,
    useAppSelector,
} from '../akuns/store'
import { apiCreateAkun } from '@/services/AkunsService'
import reducer from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import AdaptableCard from '@/components/shared/AdaptableCard'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Steps from '@/components/ui/Steps'
import StickyFooter from '@/components/shared/StickyFooter'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import isEmpty from 'lodash/isEmpty'
import { values } from 'lodash'

type Options = {
    label: string
    value: string
}

type FormFieldsName = {
    
	kode: required|string,
	nama: string,
	pos_akun: string,
	pos_laporan: string,
	saldo_awal_debet: number,
	saldo_awal_kredit: number,
}

const initialData = {
    
	kode: '',
	nama: '',
	pos_akun: '',
	pos_laporan: '',
	saldo_awal_debet: '',
	saldo_awal_kredit: '',
}

type SetSubmitting = (isSubmitting: boolean) => void

injectReducer('akunCreate', reducer)

const AkunCreate = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const akunData = useAppSelector(
        (state) => state.akunCreate.data   // .akunEdit.data.akun.data
    )
    const loading = useAppSelector(
        (state) => state.akunCreate.data.loading
    )

    const validationSchema = Yup.object().shape({
        
	kode: Yup.string().required('Kode Required'),
	nama: Yup.string().required('Nama Required'),
	pos_akun: Yup.string().required('Pos_Akun Required'),
	pos_laporan: Yup.string().required('Pos_Laporan Required'),
	saldo_awal_debet: Yup.string().required('Saldo_Awal_Debet Required'),
	saldo_awal_kredit: Yup.string().required('Saldo_Awal_Kredit Required'),
    })

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        try {
            setSubmitting(true)
            const success = await apiCreateAkun(values)
            setSubmitting(false)
            if (success) {
                popNotification('added')
            }
        } catch (error: any) {
            toast.push(
                <Notification
                    title={'Failed added data'}
                    type="danger"
                    duration={2500}
                >
                    {error.data ? error.data[Object.keys(error.data)[0]] : ''}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            setSubmitting(false)
        }
    }

    const handleDiscard = () => {
        navigate('/app/akuns/index')
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Successfuly ${keyword}`}
                type="success"
                duration={2500}
            >
                Product successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/akuns/index')
    }
    return (
        <>

            <Formik
                initialValues={initialData}
                validationSchema={validationSchema}
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    handleFormSubmit(formData, setSubmitting);
                }}
            >
                {({ errors, touched, isSubmitting, setFieldValue }) => (
                    <Form>
                        <FormContainer>
                            {Object.keys(errors).length > 0 && (
                                <Alert closable type="danger">
                                    {Object.keys(errors)[0]} required ..!!
                                </Alert>
                            )}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="lg:col-span-2">
                                    <AdaptableCard divider isLastChild className="mb-4">                    
                                            
<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>        <div className="col-span-1">
            <FormItem
                label="Kode"
                invalid={(errors.kode && touched.kode) as boolean}
                errorMessage={errors.kode?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="kode"
                    placeholder="Kode"
                    component={Input}
                />
            </FormItem>
        </div>        <div className="col-span-1">
            <FormItem
                label="Nama"
                invalid={(errors.nama && touched.nama) as boolean}
                errorMessage={errors.nama?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="nama"
                    placeholder="Nama"
                    component={Input}
                />
            </FormItem>
        </div></div><div className='grid grid-cols-1 md:grid-cols-2 gap-4'>        <div className="col-span-1">
            <FormItem
                label="Pos Akun"
                invalid={(errors.pos_akun && touched.pos_akun) as boolean}
                errorMessage={errors.pos_akun?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="pos_akun"
                    placeholder="Pos Akun"
                    component={Input}
                />
            </FormItem>
        </div>        <div className="col-span-1">
            <FormItem
                label="Pos Laporan"
                invalid={(errors.pos_laporan && touched.pos_laporan) as boolean}
                errorMessage={errors.pos_laporan?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="pos_laporan"
                    placeholder="Pos Laporan"
                    component={Input}
                />
            </FormItem>
        </div></div><div className='grid grid-cols-1 md:grid-cols-2 gap-4'>        <div className="col-span-1">
            <FormItem
                label="Saldo Awal Debet"
                invalid={(errors.saldo_awal_debet && touched.saldo_awal_debet) as boolean}
                errorMessage={errors.saldo_awal_debet?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="saldo_awal_debet"
                    placeholder="Saldo Awal Debet"
                    component={Input}
                />
            </FormItem>
        </div>        <div className="col-span-1">
            <FormItem
                label="Saldo Awal Kredit"
                invalid={(errors.saldo_awal_kredit && touched.saldo_awal_kredit) as boolean}
                errorMessage={errors.saldo_awal_kredit?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="saldo_awal_kredit"
                    placeholder="Saldo Awal Kredit"
                    component={Input}
                />
            </FormItem>
        </div></div>                   
                                    </AdaptableCard>
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={handleDiscard}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>                
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default AkunCreate
