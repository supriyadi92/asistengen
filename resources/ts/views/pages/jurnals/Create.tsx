import { useEffect, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import {
    getJurnal,
    updateJurnal,
    useAppDispatch,
    useAppSelector,
} from '../jurnals/store'
import { apiCreateJurnal } from '@/services/JurnalsService'
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
    
	tanggal: string,
	nomor_bukti: string,
	kode_pembantu: string,
	uraian: string,
	kategori_jurnal_id: number,
	akun_debet_id: number,
	akun_kredit_id: number,
	jumlah_debet: number,
	jumlah_kredit: number,
	keterangan: string,
	posting_id: number,
}

const initialData = {
    
	tanggal: '',
	nomor_bukti: '',
	kode_pembantu: '',
	uraian: '',
	kategori_jurnal_id: '',
	akun_debet_id: '',
	akun_kredit_id: '',
	jumlah_debet: '',
	jumlah_kredit: '',
	keterangan: '',
	posting_id: '',
}

type SetSubmitting = (isSubmitting: boolean) => void

injectReducer('jurnalCreate', reducer)

const JurnalCreate = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const jurnalData = useAppSelector(
        (state) => state.jurnalCreate.data   // .jurnalEdit.data.jurnal.data
    )
    const loading = useAppSelector(
        (state) => state.jurnalCreate.data.loading
    )

    const validationSchema = Yup.object().shape({
        
	tanggal: Yup.string().required('Tanggal Required'),
	nomor_bukti: Yup.string().required('Nomor_Bukti Required'),
	kode_pembantu: Yup.string().required('Kode_Pembantu Required'),
	uraian: Yup.string().required('Uraian Required'),
	kategori_jurnal_id: Yup.string().required('Kategori_Jurnal_Id Required'),
	akun_debet_id: Yup.string().required('Akun_Debet_Id Required'),
	akun_kredit_id: Yup.string().required('Akun_Kredit_Id Required'),
	jumlah_debet: Yup.string().required('Jumlah_Debet Required'),
	jumlah_kredit: Yup.string().required('Jumlah_Kredit Required'),
	keterangan: Yup.string().required('Keterangan Required'),
	posting_id: Yup.string().required('Posting_Id Required'),
    })

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        try {
            setSubmitting(true)
            const success = await apiCreateJurnal(values)
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
        navigate('/app/jurnals/index')
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
        navigate('/app/jurnals/index')
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
                label="Tanggal"
                invalid={(errors.tanggal && touched.tanggal) as boolean}
                errorMessage={errors.tanggal?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="tanggal"
                    placeholder="Tanggal"
                    component={Input}
                />
            </FormItem>
        </div>        <div className="col-span-1">
            <FormItem
                label="Nomor Bukti"
                invalid={(errors.nomor_bukti && touched.nomor_bukti) as boolean}
                errorMessage={errors.nomor_bukti?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="nomor_bukti"
                    placeholder="Nomor Bukti"
                    component={Input}
                />
            </FormItem>
        </div></div><div className='grid grid-cols-1 md:grid-cols-2 gap-4'>        <div className="col-span-1">
            <FormItem
                label="Kode Pembantu"
                invalid={(errors.kode_pembantu && touched.kode_pembantu) as boolean}
                errorMessage={errors.kode_pembantu?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="kode_pembantu"
                    placeholder="Kode Pembantu"
                    component={Input}
                />
            </FormItem>
        </div>        <div className="col-span-1">
            <FormItem
                label="Uraian"
                invalid={(errors.uraian && touched.uraian) as boolean}
                errorMessage={errors.uraian?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="uraian"
                    placeholder="Uraian"
                    component={Input}
                />
            </FormItem>
        </div></div><div className='grid grid-cols-1 md:grid-cols-2 gap-4'>        <div className="col-span-1">
            <FormItem
                label="Kategori Jurnal Id"
                invalid={(errors.kategori_jurnal_id && touched.kategori_jurnal_id) as boolean}
                errorMessage={errors.kategori_jurnal_id?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="kategori_jurnal_id"
                    placeholder="Kategori Jurnal Id"
                    component={Input}
                />
            </FormItem>
        </div>        <div className="col-span-1">
            <FormItem
                label="Akun Debet Id"
                invalid={(errors.akun_debet_id && touched.akun_debet_id) as boolean}
                errorMessage={errors.akun_debet_id?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="akun_debet_id"
                    placeholder="Akun Debet Id"
                    component={Input}
                />
            </FormItem>
        </div></div><div className='grid grid-cols-1 md:grid-cols-2 gap-4'>        <div className="col-span-1">
            <FormItem
                label="Akun Kredit Id"
                invalid={(errors.akun_kredit_id && touched.akun_kredit_id) as boolean}
                errorMessage={errors.akun_kredit_id?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="akun_kredit_id"
                    placeholder="Akun Kredit Id"
                    component={Input}
                />
            </FormItem>
        </div>        <div className="col-span-1">
            <FormItem
                label="Jumlah Debet"
                invalid={(errors.jumlah_debet && touched.jumlah_debet) as boolean}
                errorMessage={errors.jumlah_debet?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="jumlah_debet"
                    placeholder="Jumlah Debet"
                    component={Input}
                />
            </FormItem>
        </div></div><div className='grid grid-cols-1 md:grid-cols-2 gap-4'>        <div className="col-span-1">
            <FormItem
                label="Jumlah Kredit"
                invalid={(errors.jumlah_kredit && touched.jumlah_kredit) as boolean}
                errorMessage={errors.jumlah_kredit?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="jumlah_kredit"
                    placeholder="Jumlah Kredit"
                    component={Input}
                />
            </FormItem>
        </div>        <div className="col-span-1">
            <FormItem
                label="Keterangan"
                invalid={(errors.keterangan && touched.keterangan) as boolean}
                errorMessage={errors.keterangan?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="keterangan"
                    placeholder="Keterangan"
                    component={Input}
                />
            </FormItem>
        </div></div><div className='grid grid-cols-1 md:grid-cols-2 gap-4'>        <div className="col-span-1">
            <FormItem
                label="Posting Id"
                invalid={(errors.posting_id && touched.posting_id) as boolean}
                errorMessage={errors.posting_id?.toString()}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="posting_id"
                    placeholder="Posting Id"
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

export default JurnalCreate
