import { useRouter } from 'next/router'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useRelay } from '../context/RelayContext'
import { BoostButton } from 'myboostpow-lib'
import { useTheme } from 'next-themes'

const MarketItem = ({item, token}) => {
    const router = useRouter()
    const theme = useTheme()
    const { relayOne } = useRelay()
    if (!item.satoshis){ // not for sale = do not display todo
        return <></>
    }

    const handleBoostLoading = () => {
      toast('Publishing Your Boost Job to the Network', {
          icon: '⛏️',
          style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          },
        });
    };
  
    const handleBoostSuccess = () => {
      toast('Success!', {
          icon: '✅',
          style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          },
        });
    };
  
    const handleBoostError = () => {
      toast('Error!', {
          icon: '🐛',
          style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          },
      });
    };


    const handleBuy = async (e) => {
        e.preventDefault()
        const resp = await toast.promise(buyItem(item), {
            pending: 'Transaction is pending 🚀',
            success: {
            render({data}){
                return <SuccessSnackbar tx_id={data.txid}/>
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
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
        theme: "light",
        })

    }

    const buyItem = async (runItem) => {
        const ownerResponse = await relayOne.alpha.run.getOwner();
        
        try {

            const response = await axios.post(
                "https://staging-backend.relayx.com/api/dex/buy",
                    {
                    address: ownerResponse,
                    location: token.origin,
                    txid: runItem.txid,
                    }
            );
    
            const sendResponse = await relayOne.send(response.data.data.rawtx);
            console.log(sendResponse)
            return sendResponse
            
        } catch (error) {

            throw error
            
        }
            
    };
    
  return (
    <div
        className="rounded-xl border-xl bg-gray-900 w-full relative overflow-hidden ease-in duration-300 flex flex-col"
        href="#"
    >
        <img
        src={`https://berry2.relayx.com/${item.berry.txid}`}
        className="h-[261px] select-none object-cover w-full"
        />
        <div className="flex flex-col select-none bg-gray-100 dark:bg-gray-800 p-4 rounded-b-xl max-w-full">
            <p className="text-lg font-bold flex items-center justify-between">
                {token.name} #{item.props.no}
            </p>
            <div className="flex justify-between mt-2 items-center">
                <p className="text-lg font-semibold text-ellipsis whitespace-nowrap mr-4 grow opacity-70">
                {(item.satoshis * 1e-8).toFixed(3)} BSV
                </p>
            </div>
            <div className="flex items-center mt-2 justify-around">
                <button onClick={handleBuy} className="text-white bg-gradient-to-tr from-blue-500 to-blue-600 leading-6 py-1 px-10 font-bold border-none rounded cursor-pointer flex items-center text-center justify-center disabled:opacity-50 transition duration-500 transform hover:-translate-y-1">
                Buy
                </button>
                <div className='cursor-pointer'>
                    <BoostButton
                      content={item.txid}
                      difficulty={0}
                      //@ts-ignore
                      theme={theme.theme}
                      showDifficulty={false}
                      onSending={handleBoostLoading}
                      onError={handleBoostError}
                      onSuccess={handleBoostSuccess}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default MarketItem