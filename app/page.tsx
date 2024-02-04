import Image from 'next/image';
import Hassistant from '@/components/Hassistant';
import RssFeed from '@/components/RssFeed';

export default function Home() {
	return (
		<div className='flex'>
			<div className="w-[50%] h-screen flex">
				<Hassistant />
			</div>
			<div className="w-[50%] h-screen flex bg-[#fafafa]">
				<RssFeed />
			</div>
		</div>
	);
}
