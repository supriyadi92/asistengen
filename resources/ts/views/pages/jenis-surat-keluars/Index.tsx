import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import JenisSuratKeluarTable from './components/JenisSuratKeluarTable'
import JenisSuratKeluarTableTools from './components/JenisSuratKeluarTableTools'

injectReducer('jenisSuratKeluarsList', reducer)

const JenisSuratKeluarsIndex = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Jenis Surat Keluar</h3>
                <JenisSuratKeluarTableTools />
            </div>
            <JenisSuratKeluarTable />
        </AdaptableCard>
    )
}

export default JenisSuratKeluarsIndex
