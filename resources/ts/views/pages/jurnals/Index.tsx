import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import JurnalTable from './components/JurnalTable'
import JurnalTableTools from './components/JurnalTableTools'

injectReducer('jurnalsList', reducer)

const JurnalsIndex = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Jurnal</h3>
                <JurnalTableTools />
            </div>
            <JurnalTable />
        </AdaptableCard>
    )
}

export default JurnalsIndex
