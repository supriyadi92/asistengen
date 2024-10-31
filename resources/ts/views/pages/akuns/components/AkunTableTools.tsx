import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import AkunTableSearch from './AkunTableSearch'
import { Link } from 'react-router-dom'

const AkunTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <AkunTableSearch />            
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/akuns/akun-create"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Create Akun
                </Button>
            </Link>
        </div>
    )
}

export default AkunTableTools
