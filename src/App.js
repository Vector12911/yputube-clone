import React, { useEffect, useState } from 'react';
import sample from './sample.json'


function App() {
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      // const response = await fetch('https://ce4kvluf13.execute-api.ap-south-1.amazonaws.com/stage/video-list');
      // const data = await response.json();
      // console.log(data);
      console.log(sample);
      setVideoList(sample);
    } catch (error) {
      console.log(error);
    }

  }

  const getSearch = async (query) => {
    try {
      if (!query || query.length < 2) {
        setVideoList(sample);
        return;
      }
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyAF-ByPKNvBqma0OD-IB-viyqvF9SGU_BM`);
      const data = await response.json();
      // console.log(data);
      setVideoList(data.items);
    } catch (error) {
      setVideoList(sample)
      console.log(error);
    }
  }

  return (
    <div className="App relative bg-gray-600">
      <div className='header flex h-20 justify-between px-20 bg-gray-800 items-center sticky top-0 z-[100] shadow-md'>
        <div className='logo flex-[25%] max-w-[25%] flex justify-center text-white'>YOUTUBE</div>
        <div className='flex-[50%] max-w-[50%] relative' >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute top-2 left-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input placeholder='search...' type='text' className='pl-9 w-full px-3 py-2 focus:outline-none' onChange={(e) => getSearch(e.target.value)} />
        </div>
        <div className='flex-[25%] max-w-[25%] flex justify-center text-white'>Login </div>
      </div>
      <section className="main-containt">
        <div className="m-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {
            videoList.map((obj, index) => (
              <div key={obj['id']['videoId']} >
                <img className="thumbnail w-full cursor-pointer  rounded transition transform hover:scale-105 ease-out duration-500"
                  src={obj['snippet']['thumbnails']['high']['url']} alt='' />
                <div className='info bg-gray-800 px-4 py-2 text-white'>
                  <p className='title font-bold'>{obj['snippet']['title']}</p>
                  <p className='title'>{obj['snippet']['description']}</p>
                  <p className='title text-gray-500'>{obj['snippet']['channelTitle']}</p>
                  <p className='title text-gray-500'>Published at {new Date(obj['snippet']['publishedAt']).toDateString()}</p>
                </div>
              </div>
            ))
          }


        </div>

      </section>
    </div>
  );
}

export default App;
