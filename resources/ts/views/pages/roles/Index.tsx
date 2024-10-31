import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import RoleTable from './components/RoleTable'
import RoleTableTools from './components/RoleTableTools'

injectReducer('rolesList', reducer)

const RolesIndex = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Role</h3>
                <RoleTableTools />
            </div>
            <RoleTable />
        </AdaptableCard>
    )
}

export default RolesIndex
