import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import RoleTableSearch from './RoleTableSearch'
import { Link } from 'react-router-dom'

const RoleTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <RoleTableSearch />            
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/roles/role-create"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Create Role
                </Button>
            </Link>
        </div>
    )
}

export default RoleTableTools
