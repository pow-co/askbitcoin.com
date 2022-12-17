import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { wrapRelayx } from 'stag-relayx'
import { useBitcoin } from '../context/BitcoinContext'
import { useRelay } from '../context/RelayContext'
import { SuccessSnackbar, ErrorSnackbar } from './BoostButton'

const SuperBoostPopup = ({ contentTxId, onClose }) => {
    const { relayOne } = useRelay()
    const { authenticated, exchangeRate } = useBitcoin()
    const [difficulty, setDifficulty] = useState(0.025)
    const [inputTag, setInputTag] = useState("")
    const [tag, setTag] = useState("")
    const [price,setPrice] = useState(0.05)

    useEffect(() => {
      setTag(Buffer.from(inputTag, 'utf8').toString('hex'))
    },[inputTag])

    useEffect(()=>{
        getPriceForDifficulty(difficulty).then((res)=>setPrice(res.toFixed(2)))
    },[difficulty])

    const getPriceForDifficulty = async (difficulty) => {

        const resp = await axios.get(`https://pow.co/api/v1/boostpow/${contentTxId}/new?difficulty=${difficulty}`)
        const satoshis = resp?.data?.outputs[0]?.amount
        console.log(satoshis)
        let price = (satoshis/1e8) * exchangeRate / 2
        return price
    }

    const boost = async () => {
      if (!authenticated){
        throw new Error("please, log in!")
      }

      console.log(tag, inputTag) //656475636174696f6e education

      const stag = wrapRelayx(relayOne)
      const {txid, txhex, job} = await stag.boost.buy({
        content: contentTxId,
        value: 124_000,
        difficulty: difficulty,
        tag: tag
      })
      relayOne.send({
        currency: 'BSV',
        amount: 0.00052,
        to: '1MqPZFc31jUetZ5hxVtG4tijJSugAcSZCQ' // askbitcoin.ai revenue address
      })
      .then(result => {
        console.log('relayone.send.reward.result', result)
      })
      .catch(error => {
        console.log('relayone.send.reward.error', error)
      })
    
      return {txid, txhex, job}

      /* 
      txid:63fdb97fbc68d896ba57c22892071b4009fe85e8f9c8f43b7d43d9485129f14c
      txhex:01000000013c390ebf0f498201b6e9558d3735627ced8c9373ec9d65d34fbfb7086400b059020000006a47304402201ecf7cccf805c602e120a694a0d2fca96385d6ae9ba566774c8de35eb41ab54f02205b6e387f256368e8164b44420a8a580ce108fe8396e62b26230c53f59d97377f4121030a094087daa4ff59e49112688a3054670ecdcea3c80eb8b81a4676adcf2cd8e0ffffffff0360e4010000000000ad08626f6f7374706f7775040000000020c7fcac706c95edb1daa6b5b704aa90a2d83f38471391fb9654d00000657cf97a04d8ff271d00048fc9a374007e7c557a766b7e52796b557a8254887e557a8258887e7c7eaa7c6b7e7e7c8254887e6c7e7c8254887eaa01007e816c825488537f7681530121a5696b768100a0691d00000000000000000000000000000000000000000000000000000000007e6c539458959901007e819f6976a96c88ac00000000000000002f006a2231487948587459577947655072485669736e4e645339333156743643716f7555795a0972656c6179782e696f29220000000000001976a914d8c851f9fcc01c53f6c6e62e259b065d2b85b9d688ac00000000
      job:
      {
        "difficulty": 0.025,
        "profitability": 4960000,
        "id": "15039",
        "txid": "63fdb97fbc68d896ba57c22892071b4009fe85e8f9c8f43b7d43d9485129f14c",
        "content": "7af97c650000d05496fb911347383fd8a290aa04b7b5a6dab1ed956c70acfcc7",
        "script": "08626f6f7374706f7775040000000020c7fcac706c95edb1daa6b5b704aa90a2d83f38471391fb9654d00000657cf97a04d8ff271d00048fc9a374007e7c557a766b7e52796b557a8254887e557a8258887e7c7eaa7c6b7e7e7c8254887e6c7e7c8254887eaa01007e816c825488537f7681530121a5696b768100a0691d00000000000000000000000000000000000000000000000000000000007e6c539458959901007e819f6976a96c88ac",
        "vout": 0,
        "value": 124000,
        "category": "00000000",
        "tag": "",
        "userNonce": "8fc9a374",
        "additionalData": "",
        "timestamp": "2022-12-14T17:23:49.000Z",
        "updatedAt": "2022-12-14T17:23:49.000Z",
        "createdAt": "2022-12-14T17:23:49.000Z",
        "tx_hex": null,
        "spent": false,
        "spent_txid": null,
        "spent_vout": null
       */
        
    }

    const handleBoost = async (e) => {

      try {
        let {txid, txhex, job} = await toast.promise(boost(contentTxId), {
          pending: 'Transaction is pending 🚀',
          success: {
            render({data}){
              return <SuccessSnackbar difficulty={data.job.difficulty} tx_id={data.txid}/>
            },
            icon:false
          },
          error: {
            render({data}){
              return <ErrorSnackbar message={data.message}/>
            },
            icon:false
          }
        }, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    
        console.log('bitcoin.boost.result', {txid, txhex,job});
        onClose()
      } catch (error) {
        console.log(error)
      }

        

    }

    const handleChangeDifficulty = (e) => {
        e.preventDefault()
        setDifficulty(e.target.value)
    }
    const handleChangeTag = (e) => {
      e.preventDefault()
      setInputTag(e.target.value)
  }
  return (
    <div onClick={(e)=> e.stopPropagation()} className='fixed inset-0'>
        <div className='flex flex-col h-screen'>
            <div onClick={onClose} className='grow cursor-pointer'/>
            <div className='flex'>
                <div onClick={onClose} className='grow cursor-pointer'/>
                <div className='flex flex-col w-[420px] h-[500px] rounded-t-lg bg-gray-100 dark:bg-gray-800'>
                    <div className='flex items-center p-5 border-b border-b-gray-300 dark:border-b-gray-700'>
                        <svg className='' width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.5 65C50.4493 65 65 50.4493 65 32.5C65 14.5507 50.4493 0 32.5 0C14.5507 0 0 14.5507 0 32.5C0 50.4493 14.5507 65 32.5 65Z" fill="#CEDEFD"/>
                            <path d="M32.4999 52.5876C43.5945 52.5876 52.5886 43.5936 52.5886 32.4989C52.5886 21.4042 43.5945 12.4102 32.4999 12.4102C21.4052 12.4102 12.4111 21.4042 12.4111 32.4989C12.4111 43.5936 21.4052 52.5876 32.4999 52.5876Z" fill="#6B9CFA"/>
                            <path d="M44.9113 32.8604C44.9113 37.5655 42.2948 41.7715 38.4331 43.8773C36.6715 44.8413 34.646 41.5305 32.5 41.5305C30.4343 41.5305 28.4892 44.7667 26.7735 43.8773C22.7971 41.8059 20.083 37.6516 20.083 32.8604C20.083 26.0035 25.6431 20.4434 32.5 20.4434C39.3569 20.4434 44.9113 26.0035 44.9113 32.8604Z" fill="#085AF6"/>
                            <path d="M40.1719 32.6561C40.1719 35.6054 38.5079 38.1645 36.0692 39.4499C35.002 40.0122 33.7855 36.2423 32.4945 36.2423C31.1288 36.2423 29.8492 40.0696 28.7418 39.4499C26.4007 38.1359 24.8228 35.5308 24.8228 32.6561C24.8228 28.4214 28.2598 24.9844 32.4945 24.9844C36.7291 24.9844 40.1719 28.4157 40.1719 32.6561Z" fill="white"/>
                        </svg>
                        <p className='ml-5 text-2xl font-bold'>Boostpow</p>
                    </div>
                    <div className='grow flex flex-col justify-center items-center'>
                        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-r-md py-1 pr-2.5">
                        Custom difficulty
                        </div>
                        <input
                        className="border border-gray-300 dark:border-gray-700 rounded-l-md text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 py-1 pl-2.5 text-base"
                        type="number"
                        autoFocus
                        min={0.025}
                        step={0.1}
                        value={difficulty}
                        onChange={handleChangeDifficulty}
                        />
                        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-r-md py-1 pr-2.5">
                        Tag
                        </div>
                        <input
                        className="border border-gray-300 dark:border-gray-700 rounded-l-md text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 py-1 pl-2.5 text-base"
                        type="text"
                        value={inputTag}
                        onChange={handleChangeTag}
                        />
                    </div>
                    <div className='mb-20 sm:mb-0 p-5 flex items-center text-center justify-center'>
                        <button onClick={handleBoost} className="text-white bg-gradient-to-tr from-blue-500 to-blue-600 leading-6 py-1 px-10 font-bold border-none rounded cursor-pointer disabled:opacity-50 transition duration-500 transform hover:-translate-y-1">Boost ${price}</button>
                    </div>
                </div>
                <div onClick={onClose} className='grow cursor-pointer'/>    
            </div>
        </div>
    </div>
  )
}

export default SuperBoostPopup
