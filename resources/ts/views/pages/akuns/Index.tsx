import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import AkunTable from './components/AkunTable'
import AkunTableTools from './components/AkunTableTools'

injectReducer('akunsList', reducer)

const AkunsIndex = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Akun</h3>
                <AkunTableTools />
            </div>
            <AkunTable />
        </AdaptableCard>
    )
}

export default AkunsIndex
