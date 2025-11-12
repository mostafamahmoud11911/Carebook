import { Search as SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';

export default function Search({ setQuery }: { setQuery: (query: string) => void }) {
    return (
        <div className='relative mb-3'>
            <SearchIcon size={18} className='absolute ring-0 outline-0 focus:outline-0 top-[50%] left-[7px] transform -translate-y-[50%]' />
            <Input type="text" onChange={(e) => setQuery(e.target.value)} placeholder='Search...' className='pl-8 bg-white py-[20px]' />
        </div>
    )
}
