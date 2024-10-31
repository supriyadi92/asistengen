import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import JurnalTableSearch from './JurnalTableSearch'
import { Link } from 'react-router-dom'

const JurnalTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <JurnalTableSearch />            
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/jurnals/jurnal-create"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Create Jurnal
                </Button>
            </Link>
        </div>
    )
}

export default JurnalTableTools
