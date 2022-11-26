import React from 'react'
import { toast } from 'react-toastify'
import { useBitcoin } from '../context/BitcoinContext'
import axios from 'axios'

const BoostButton = ({ tx_id, difficulty, zenMode }) => {
  const { boost } = useBitcoin()

const handleBoost = async (e) => {
  e.stopPropagation()
  e.preventDefault()


  const value = 0.05
  const currency="USD"

  

    try {

      let result = await toast.promise(boost(tx_id, value, currency), {
        pending: 'Transaction is pending 🚀',
        success: 'Transaction successful 🥳',
        error: {
          render({data}){
            return `${data}`
          }
        }
      }, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })

      console.log('bitcoin.boost.result', result);

      const { txid } = result;

      console.log('TXID', txid);

      // Post the new boostpow job transaction to the indexer API at pow.co
      axios
        .get(`https://pow.co/api/v1/boost/jobs/${txid}`)
        .then(({ data }) => {
          console.log(`pow.co/api/v1/jobs/${result.txid}.result`, data);
         })
        .catch((error) => {
          console.error(`pow.co/api/v1/jobs/${result.txid}`, error);
        });

      axios
        .post(`https://pow.co/api/v1/boost/jobs`, {
          transaction: result.rawTx
        })
        .then(({ data }) => {
          console.log(`post.pow.co/api/v1/jobs.result`, data);
        })
        .catch((error) => {
          console.error(`post.pow.co/api/v1/jobs`, error);
        });
        console.log('relay.quote', result);
    } catch (error){
      console.error('useBitcoin.boost.error', error);
    }
}
  return (
    <div onClick={handleBoost} className='col-span-2 flex group items-center w-fit relative '>
        <div className='hidden group-hover:block animate-ping absolute left-[18px] min-h-[33px] min-w-[33px] rounded-full bg-blue-200'></div>
        <div className='hidden group-hover:block animate-ping  delay-75 absolute left-[24px] min-h-[22px] min-w-[22px] rounded-full bg-blue-400'></div>
        <div className='hidden group-hover:block animate-ping  delay-100 absolute left-[29px] min-h-[11px] min-w-[11px] rounded-full bg-blue-600'></div>
        <svg viewBox='0 0 65 65' className='relative min-h-[69px] min-w-[69px] stroke-1 stroke-gray-500 dark:stroke-gray-300 rounded-full group-hover:stroke-blue-500'>
            <path
                d="M40.1719 32.6561C40.1719 35.6054 38.5079 38.1645 36.0692 39.4499C35.002 40.0122 33.7855 36.2423 32.4945 36.2423C31.1288 36.2423 29.8492 40.0696 28.7418 39.4499C26.4007 38.1359 24.8228 35.5308 24.8228 32.6561C24.8228 28.4214 28.2598 24.9844 32.4945 24.9844C36.7291 24.9844 40.1719 28.4157 40.1719 32.6561Z"
                className='stroke-gray-500 dark:stroke-gray-300 group-hover:stroke-blue-500'
                fill='transparent'
            ></path>
        </svg>
        {!zenMode && <p className="text-gray-500 dark:text-gray-300 group-hover:text-blue-500 -ml-3">
             {difficulty.toFixed(3)} 
        </p>}
    </div>
   
  )
}

export default BoostButton