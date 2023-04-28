import { ArrowRightIcon } from '@heroicons/react/20/solid'

export default function GameModeCard({ title, description, onClick }) {
  return (
    <div
      className="py-6 px-4 bg-blue-500 hover:cursor-pointer hover:shadow-xl text-left text-white rounded-lg handDrawn"
      onClick={onClick}
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='w-10/12'>
          <h2 className="text-xl font-semibold font-display">{title}</h2>
          <p className='font-normal'>{description}</p>
        </div>
        <ArrowRightIcon className='h-6 w-6' />
        <div>
        </div>
      </div>
    </div>
  );
}
