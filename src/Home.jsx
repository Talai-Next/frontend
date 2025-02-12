import './index.css'
import LineCardInfo from './components/LineCardInfo';
import Header from './components/Header';
function Home() {

  return (
      <div className='flex flex-col w-screen'>
        <Header />
        <div className='h-[500px] bg-green-200'>
        </div>
        <div className='px-5 py-2'>
            <LineCardInfo />
        </div>
      </div>
  )
}

export default Home
