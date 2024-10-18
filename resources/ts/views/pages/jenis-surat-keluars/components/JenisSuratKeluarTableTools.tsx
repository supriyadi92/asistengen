import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import JenisSuratKeluarTableSearch from './JenisSuratKeluarTableSearch'
import { Link } from 'react-router-dom'

const JenisSuratKeluarTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <JenisSuratKeluarTableSearch />            
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/suratmasuks/surat-create"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Create Jenis Surat Keluar
                </Button>
            </Link>
        </div>
    )
}

export default JenisSuratKeluarTableTools
