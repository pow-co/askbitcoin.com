import React from 'react'
import { UserIcon, PostDescription, PostMedia } from '.'
import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'
import likeTwetch from '../services/twetch/like-twetch'
import BoostButton from './BoostButton'
import { useEffect } from 'react'


const DetailPostCard = ({ post }) => {
    const router = useRouter();

    const zenMode = true;

  const navigate = (e) => {
    e.stopPropagation();
    if(post.answers){
      router.push(`/questions/${post.tx_id}`)
    } else {
      router.push(`/answers/${post.tx_id}`)
    }
  } 

  const handleLike = (e) => {

  }
  if (!post){
    return <></>
  } else {
  return (
      <div onClick={navigate}  className='grid grid-cols-12 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 hover:dark:bg-gray-500 mt-0.5 first:rounded-t-lg'>
        <div className='col-span-12'>
          <div className='mb-0.5 px-4 pt-4 pb-1 grid items-start grid-cols-12 max-w-screen cursor-pointer'>
            {!zenMode && <div className='col-span-1'>
              {/* <Link  href={`/u/${post.userId}`}>
                <a onClick={(e)=>e.stopPropagation()}>
                  <UserIcon src={post.userByUserId.icon} size={46}/>
                </a>
              </Link> */}
              <a>
              <UserIcon src={`https://bitpic.network/u/0`} size={46}/>
              </a>
            </div>}
            <div className='col-span-12 ml-6'>
              <div className='flex'>
                {/* <Link  href={`/u/${post.userId}`}>
                  <div onClick={(e)=>e.stopPropagation()} className='text-base leading-4 font-bold text-gray-900 dark:text-white cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis	hover:underline'>
                    {post.userByUserId.name}<span className='ml-1 font-normal text-gray-500 dark:text-gray-300'>@{post.userId}</span>
                  </div>
                </Link> */}
               {!zenMode &&  <div onClick={(e)=>e.stopPropagation()} className='text-base leading-4 font-bold text-gray-900 dark:text-white cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis	hover:underline'>
                    1anon
                  </div>
                  }
                <div className='grow'/>
                <a target="_blank" rel="noreferrer" href={`https://whatsonchain.com/tx/${post.tx_id}`} className='text-xs leading-5 whitespace-nowrap text-gray-500 dark:text-gray-300 hover:text-gray-700 hover:dark:text-gray-500'>
                  {moment(post.createdAt).fromNow()}
                </a>
                {/* <a href={`https://twetch.com/t/${post.tx_id}`} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}>
                  <div className='flex items-center ml-4 h-5 w-5 text-gray-500 dark:text-gray-300 hover:text-gray-700 hover:dark:text-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg> 
                    <svg viewBox="0 0 102 110" className="bg-gray-700 dark:bg-transparent rounded p-1">
                      <path d="M3.66391 55.0011C-1.39212 46.1876 -1.04744 35.7272 3.66391 27.5017C8.37755 35.7272 8.72222 46.1876 3.66391 55.0011ZM3.66391 55.0011C-1.04744 63.2266 -1.39212 73.6871 3.66391 82.5006C8.72222 73.6871 8.37755 63.2266 3.66391 55.0011ZM51.0011 0C46.2898 8.22548 45.9451 18.6859 51.0011 27.4994C56.0572 18.6859 55.7125 8.22548 51.0011 0ZM51.0011 27.5017C46.2898 35.7272 45.9451 46.1876 51.0011 55.0011C56.0572 46.1876 55.7125 35.7272 51.0011 27.5017ZM51.0011 55.0011C46.2898 63.2266 45.9451 73.6871 51.0011 82.5006C56.0572 73.6871 55.7125 63.2266 51.0011 55.0011ZM51.0011 82.5006C46.2898 90.7261 45.9451 101.186 51.0011 110C56.0572 101.186 55.7125 90.7261 51.0011 82.5006ZM98.3361 27.5017C93.6247 35.7272 93.2801 46.1876 98.3361 55.0011C103.392 46.1876 103.047 35.7272 98.3361 27.5017ZM98.3361 55.0011C93.6247 63.2266 93.2801 73.6871 98.3361 82.5006C103.392 73.6871 103.047 63.2266 98.3361 55.0011ZM27.3325 13.7497C32.3908 22.5655 41.5647 27.4925 51.0011 27.4994C46.2761 19.2808 37.4469 13.7497 27.3325 13.7497ZM27.3325 13.7497C37.4469 13.7497 46.2761 8.21859 51.0011 0C41.5647 0.00689093 32.3908 4.93621 27.3325 13.7497ZM27.3325 13.7497C22.2765 22.5655 22.6212 33.026 27.3325 41.2514C32.0462 33.026 32.3908 22.5655 27.3325 13.7497ZM3.66619 27.4994C13.1026 27.4925 22.2765 22.5632 27.3325 13.7497C17.2182 13.7497 8.38896 19.2808 3.66619 27.4994ZM74.6675 13.7497C79.7258 22.5655 88.8997 27.4925 98.3361 27.4994C93.611 19.2808 84.7818 13.7497 74.6675 13.7497ZM74.6675 13.7497C69.6114 22.5655 69.9561 33.026 74.6675 41.2514C79.3811 33.026 79.7258 22.5655 74.6675 13.7497ZM51.0011 27.4994C60.4375 27.4925 69.6114 22.5632 74.6675 13.7497C64.5531 13.7497 55.7239 19.2808 51.0011 27.4994ZM51.0011 0C55.7239 8.21859 64.5554 13.7497 74.6675 13.7497C69.6114 4.93621 60.4375 0.00689093 51.0011 0ZM27.3325 41.2491C32.3908 50.0649 41.5647 54.992 51.0011 54.9989C46.2761 46.7803 37.4469 41.2491 27.3325 41.2491ZM27.3325 41.2491C37.4469 41.2491 46.2761 35.718 51.0011 27.4994C41.5647 27.5063 32.3908 32.4356 27.3325 41.2491ZM27.3325 41.2491C22.2765 50.0649 22.6212 60.5254 27.3325 68.7509C32.0462 60.5254 32.3908 50.0649 27.3325 41.2491ZM3.66619 55.0011C13.1026 54.9943 22.2765 50.0649 27.3325 41.2514C17.2182 41.2491 8.38896 46.7803 3.66619 55.0011ZM3.66619 27.4994C8.38896 35.718 17.2205 41.2491 27.3325 41.2491C22.2765 32.4356 13.1003 27.5063 3.66619 27.4994ZM74.6675 41.2491C79.7258 50.0649 88.8997 54.992 98.3361 54.9989C93.611 46.7803 84.7818 41.2491 74.6675 41.2491ZM74.6675 41.2491C84.7818 41.2491 93.611 35.718 98.3361 27.4994C88.8997 27.5063 79.7258 32.4356 74.6675 41.2491ZM74.6675 41.2491C69.6114 50.0649 69.9561 60.5254 74.6675 68.7509C79.3811 60.5254 79.7258 50.0649 74.6675 41.2491ZM51.0011 55.0011C60.4375 54.9943 69.6114 50.0649 74.6675 41.2514C64.5531 41.2491 55.7239 46.7803 51.0011 55.0011ZM51.0011 27.4994C55.7239 35.718 64.5554 41.2491 74.6675 41.2491C69.6114 32.4356 60.4375 27.5063 51.0011 27.4994ZM27.3325 68.7509C32.3908 77.5667 41.5647 82.4937 51.0011 82.5006C46.2761 74.282 37.4469 68.7509 27.3325 68.7509ZM27.3325 68.7509C37.4469 68.7509 46.2761 63.2197 51.0011 55.0011C41.5647 55.008 32.3908 59.9351 27.3325 68.7509ZM27.3325 68.7509C22.2765 77.5667 22.6212 88.0271 27.3325 96.2526C32.0462 88.0248 32.3908 77.5644 27.3325 68.7509ZM3.66619 82.5006C13.1026 82.4937 22.2765 77.5644 27.3325 68.7509C17.2182 68.7509 8.38896 74.282 3.66619 82.5006ZM3.66619 55.0011C8.38896 63.2197 17.2205 68.7509 27.3325 68.7509C22.2765 59.9351 13.1003 55.008 3.66619 55.0011ZM74.6675 68.7509C79.7258 77.5667 88.8997 82.4937 98.3361 82.5006C93.611 74.282 84.7818 68.7509 74.6675 68.7509ZM74.6675 68.7509C84.7818 68.7509 93.611 63.2197 98.3361 55.0011C88.8997 55.008 79.7258 59.9351 74.6675 68.7509ZM74.6675 68.7509C69.6114 77.5667 69.9561 88.0271 74.6675 96.2526C79.3811 88.0248 79.7258 77.5644 74.6675 68.7509ZM51.0011 82.5006C60.4375 82.4937 69.6114 77.5644 74.6675 68.7509C64.5531 68.7509 55.7239 74.282 51.0011 82.5006ZM51.0011 55.0011C55.7239 63.2197 64.5554 68.7509 74.6675 68.7509C69.6114 59.9351 60.4375 55.008 51.0011 55.0011ZM27.3325 96.2503C32.3908 105.066 41.5647 109.993 51.0011 110C46.2761 101.781 37.4469 96.2503 27.3325 96.2503ZM27.3325 96.2503C37.4469 96.2503 46.2761 90.7192 51.0011 82.5006C41.5647 82.5075 32.3908 87.4368 27.3325 96.2503ZM3.66619 82.5006C8.38896 90.7192 17.2205 96.2503 27.3325 96.2503C22.2765 87.4368 13.1003 82.5075 3.66619 82.5006ZM74.6675 96.2503C84.7818 96.2503 93.611 90.7192 98.3361 82.5006C88.8997 82.5075 79.7258 87.4368 74.6675 96.2503ZM51.0011 110C60.4375 109.993 69.6114 105.064 74.6675 96.2503C64.5531 96.2503 55.7239 101.781 51.0011 110ZM51.0011 82.5006C55.7239 90.7192 64.5554 96.2503 74.6675 96.2503C69.6114 87.4368 60.4375 82.5075 51.0011 82.5006Z" fill="white"></path>
                    </svg>
                  </div>
                </a> */}
              </div>
              {post.question !== undefined && (
                <div onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/questions/${post.question.tx_id}`)
                }} className='cursor-pointer relative flex flex-col bg-gray-300 dark:bg-gray-700 m-4 p-4 border-l-4 border-gray-500 '>
                  <span className='w-9 h-9 flex items-center justify-center text-center absolute -top-4 -left-4 rounded-full bg-gray-100 dark:bg-gray-600'>🧩</span>
                  <PostDescription bContent={post.question.content}/>
                </div>
              )}
              <PostDescription bContent={post.content}/>
              {/* <PostMedia files={JSON.parse(post.files)}/> */}
              <div className='ml-1'>
                <div className='grid grid-cols-12 gap-4 w-full'>
                  <div className='col-span-8'/>
                  {/* <div className='col-span-3 flex group items-center w-fit relative'>
                    <div onClick={handleLike}>
                      <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      className={
                        post.youLikedCalc > 0
                          ? "h-[40px] w-[40px] fill-red-500"
                          : "h-[40px] w-[40px] fill-gray-500 dark:fill-gray-300 group-hover:fill-red-500"
                      }
                    >
                      <path
                        className={post.youLikedCalc > 0 ? "fill-red-500" : ""}
                        fillRule={post.youLikedCalc > 0 ? "" : "evenodd"}
                        clipRule={post.youLikedCalc > 0 ? "" : "evenodd"}
                        d="M19.5001 26.6533C20.0871 26.1685 20.6722 25.6978 21.1943 25.2777C21.3294 25.1691 21.4603 25.0638 21.5858 24.9625C21.7097 24.8614 21.8321 24.7616 21.9528 24.6632C23.7278 23.2156 25.1555 22.0513 26.1406 20.9247L26.1422 20.9229C27.2803 19.6263 27.7003 18.5443 27.7003 17.4085C27.7003 16.2504 27.2875 15.2142 26.5738 14.4893C25.8204 13.7257 24.8217 13.2997 23.6905 13.2997C22.8626 13.2997 22.1372 13.5323 21.4904 14.0116C21.1216 14.2874 20.8095 14.5859 20.5374 14.9463L19.5 16.321L18.4626 14.9463C18.1927 14.5887 17.8833 14.2921 17.5184 14.0182C16.8507 13.5429 16.1168 13.2997 15.3095 13.2997C14.1687 13.2997 13.1554 13.7319 12.4364 14.4788L12.4313 14.4841L12.4262 14.4893C11.7107 15.2161 11.2997 16.2307 11.2997 17.4085C11.2997 18.5241 11.7216 19.6285 12.8578 20.9229L12.8594 20.9247C13.8445 22.0513 15.2722 23.2156 17.0472 24.6632C17.1651 24.7593 17.2844 24.8566 17.4053 24.9553C18.0595 25.4643 18.7754 26.0535 19.5001 26.6533ZM16.5952 25.9718C17.2619 26.4901 18 27.0986 18.7619 27.7296C18.9762 27.9099 19.2381 28 19.5 28C19.7619 28 20.0238 27.9099 20.2381 27.7296C20.8477 27.2248 21.4572 26.7343 22.0058 26.293C22.1429 26.1827 22.2762 26.0755 22.4048 25.9718C22.5414 25.8602 22.6769 25.7498 22.811 25.6405C24.546 24.2262 26.0582 22.9935 27.119 21.7803C28.4048 20.3155 29 18.9408 29 17.4085C29 15.9437 28.4762 14.569 27.5 13.5775C26.5 12.5634 25.1667 12 23.6905 12C22.5952 12 21.5952 12.3155 20.7143 12.969C20.6092 13.0476 20.5066 13.1285 20.4067 13.2125C20.0764 13.4899 19.7742 13.8001 19.5 14.1634C19.2258 13.8001 18.9236 13.4899 18.5933 13.2125C18.4934 13.1285 18.3908 13.0476 18.2857 12.969C17.4048 12.338 16.4048 12 15.3095 12C13.8333 12 12.4762 12.5634 11.5 13.5775C10.5238 14.569 10 15.9211 10 17.4085C10 18.9183 10.5952 20.3155 11.881 21.7803C12.9418 22.9935 14.454 24.2262 16.189 25.6405C16.3231 25.7498 16.4586 25.8602 16.5952 25.9718Z"
                      ></path>
                    </svg>
                    </div>
                    <p
                      className={
                        post.youLikedCalc > 0 ? "text-red-500" : "text-gray-500 dark:text-gray-300 group-hover:text-red-500"
                      }
                    >
                      0{post.numLikes}
                    </p>
                  </div> */}
                  <div className='col-span-2 flex group items-center w-fit relative'>
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      className="h-[40px] w-[40px] fill-gray-500 dark:fill-gray-300 group-hover:fill-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.7698 26.04L16.7796 26.0214C16.8013 25.98 16.8245 25.9351 16.8491 25.8873C17.03 25.5371 17.2911 25.0314 17.6274 24.6275C18.0608 24.1068 18.7281 23.6137 19.6907 23.6137C22.7525 23.6137 24.8033 23.173 26.0492 22.4503C27.1805 21.794 27.7035 20.8819 27.7035 19.5258C27.7035 16.3261 24.3811 13.2965 19.6907 13.2965C15.2771 13.2965 12.2965 16.1275 12.2965 19.5258C12.2965 20.3629 12.6319 22.2529 13.4911 23.5026L13.4978 23.5125L13.4978 23.5125C14.3586 24.7897 15.3301 25.7902 16.4883 26.5864C16.5026 26.5622 16.5179 26.5356 16.5341 26.5064C16.6042 26.3801 16.6748 26.2365 16.7606 26.059L16.7698 26.04ZM17.9278 26.6233C17.9537 26.574 17.9795 26.5244 18.0053 26.4748C18.4108 25.6944 18.8183 24.9101 19.6907 24.9101C25.9691 24.9101 29 23.1358 29 19.5258C29 15.3652 24.8247 12 19.6907 12C14.7423 12 11 15.2428 11 19.5258C11 20.5354 11.3711 22.7075 12.4227 24.2371C13.4124 25.7055 14.5567 26.8681 15.9485 27.7858C16.1649 27.9388 16.3814 28 16.5979 28C17.2474 28 17.5876 27.327 17.9278 26.6233Z"
                      ></path>
                    </svg>
                    <p className="text-gray-500 dark:text-gray-300 group-hover:text-green-500">
                        {post.answers !== undefined && post.answers.length}
                      </p>
                  </div>
                  {/* <div className='col-span-3 flex group items-center w-fit relative'>
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      className={
                        post.youBranchedCalc > 0
                          ? "h-[40px] w-[40px] fill-green-500"
                          : "h-[40px] w-[40px] fill-gray-500 dark:fill-gray-300 group-hover:fill-green-500"
                      }
                    >
                      {post.youBranchedCalc > 0 ? (
                        <path
                          d="M29.2101 13.5264C28.9718 13.2882 28.674 13.0499 28.3762 12.8712H28.3166C26.4702 11.7396 24.0877 11.68 22.2413 12.8712C20.6927 13.8242 19.6801 15.5515 19.6206 17.398C18.8463 16.5045 17.8337 15.9089 16.6425 15.6111C15.9873 15.4324 15.3321 15.4324 14.7365 15.492C14.4387 15.492 14.1409 15.5515 13.8431 15.6707L11.0436 16.5045C10.7458 16.5641 10.5671 16.8619 10.5671 17.1597C10.5671 17.5171 10.6267 17.8745 10.6863 18.1723C10.6863 18.1723 10.6863 18.1723 10.6863 18.2318C11.1628 20.3761 12.8305 22.0438 14.9747 22.5203C15.4512 22.6394 15.8682 22.699 16.2851 22.699C17.4763 22.699 18.608 22.3416 19.6206 21.6269V27.3448C19.6206 27.7022 19.9184 28 20.2758 28C20.6331 28 20.9309 27.7022 20.9309 27.3448V19.3635C21.5861 19.6018 22.3009 19.7209 22.956 19.7209C24.0282 19.7209 25.0407 19.4231 25.9937 18.8274C26.5298 18.4701 27.0063 18.0531 27.4232 17.5766C27.6019 17.3384 27.7806 17.1001 27.9593 16.8023L29.3292 14.2412C29.5079 14.0625 29.4483 13.7051 29.2101 13.5264Z"
                          className="fill-green-500"
                        ></path>
                      ) : (
                        <path d="M29.9362 13.5264C29.6791 13.2882 29.3578 13.0499 29.0366 12.8712H28.9723C26.9803 11.7396 24.4099 11.68 22.4178 12.8712C20.7471 13.8242 19.6547 15.5515 19.5904 17.398C18.7551 16.5045 17.6626 15.9089 16.3775 15.6111C15.6706 15.4324 14.9637 15.4324 14.3212 15.492C13.9999 15.492 13.6786 15.5515 13.3573 15.6707L10.3371 16.5045C10.0158 16.5641 9.823 16.8619 9.823 17.1597C9.823 17.5171 9.88726 17.8745 9.95152 18.1723C9.95152 18.1723 9.95152 18.1723 9.95152 18.2318C10.4656 20.3761 12.2649 22.0438 14.5782 22.5203C15.0923 22.6394 15.5421 22.699 15.9919 22.699C17.2771 22.699 18.498 22.3416 19.5904 21.6269V27.3448C19.5904 27.7022 19.9117 28 20.2973 28C20.6828 28 21.0041 27.7022 21.0041 27.3448V19.3635C21.711 19.6018 22.4821 19.7209 23.1889 19.7209C24.3456 19.7209 25.438 19.4231 26.4662 18.8274C27.0445 18.4701 27.5586 18.0531 28.0084 17.5766C28.2012 17.3384 28.394 17.1001 28.5867 16.8023L30.0647 14.2412C30.2575 14.0625 30.1932 13.7051 29.9362 13.5264ZM14.9637 21.2099C13.2287 20.8526 11.815 19.5422 11.4295 17.934C11.4295 17.934 11.4295 17.934 11.4295 17.8745C11.4295 17.8149 11.3652 17.6958 11.3652 17.6362L13.7428 16.981C13.9356 16.9215 14.1926 16.8619 14.4497 16.8619C14.9637 16.8023 15.4778 16.8619 15.9919 16.9215C17.6626 17.2788 18.9478 18.4105 19.4619 19.8996C18.3052 21.0908 16.5702 21.5673 14.9637 21.2099ZM27.3015 16.2067C27.173 16.3854 27.0445 16.5641 26.916 16.7428C26.5947 17.1001 26.2091 17.4575 25.7593 17.6958C24.3456 18.5296 22.4821 18.5892 21.0041 17.8149C20.9399 16.2663 21.7752 14.7772 23.1889 13.9434C24.7312 13.0499 26.659 13.0499 28.2012 13.9434C28.2654 14.0029 28.3297 14.0029 28.394 14.0625L27.3015 16.2067Z"></path>
                      )}
                    </svg>
                    <p
                      className={
                        post.youBranchedCalc > 0
                          ? "text-green-500"
                          : "text-gray-500 dark:text-gray-300 group-hover:text-green-500"
                      }
                    >
                      {post.numBranches}
                    </p>
                  </div> */}
                  <BoostButton tx_id={post.tx_id} difficulty={post.difficulty !== undefined ? post.difficulty : 0} zenMode={zenMode}/>
                  {/* <div className='col-span-3 flex group items-center w-fit relative'>
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      className="h-[40px] w-[40px] fill-gray-500 dark:fill-gray-300 hover:fill-gray-700 hover:dark:fill-gray-500"
                    >
                      <path d="M16.4198 12.7306V13.4612H26.1734C26.3926 13.4612 26.5387 13.6073 26.5387 13.8265V23.5802C26.5387 23.7994 26.3926 23.9455 26.1734 23.9455H16.4198C16.2006 23.9455 16.0545 23.7994 16.0545 23.5802V13.8265C16.0545 13.6073 16.2006 13.4612 16.4198 13.4612V12.7306V12C15.3969 12 14.5933 12.8037 14.5933 13.8265V23.5802C14.5933 24.603 15.3969 25.4067 16.4198 25.4067H26.1734C27.1963 25.4067 28 24.603 28 23.5802V13.8265C28 12.8037 27.1963 12 26.1734 12H16.4198V12.7306Z"></path>
                      <path d="M23.6898 26.5758H13.7169C13.5708 26.5758 13.4612 26.4662 13.4612 26.32V16.3107C13.4612 15.9089 13.1324 15.5801 12.7306 15.5801C12.3288 15.5801 12 15.9089 12 16.3107V26.2835C12 27.2333 12.7671 28.0004 13.7169 28.0004H23.6898C24.0916 28.0004 24.4204 27.6717 24.4204 27.2698C24.4204 26.9045 24.0916 26.5758 23.6898 26.5758Z"></path>
                    </svg>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailPostCard