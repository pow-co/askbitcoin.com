import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useRouter } from "next/router"
import axios from 'axios';
import {
    Editable,
    withReact,
    Slate,
    ReactEditor,
    useFocused,
} from "slate-react";
import { createEditor, Node } from "slate";

import { toast } from "react-hot-toast"

import { useRelay } from '../context/RelayContext';
import { useTuning } from '../context/TuningContext';
import { PostCard } from '.';
import { useBitcoin } from '../context/BitcoinContext';

import { FormattedMessage, useIntl } from 'react-intl';


const Composer = ({ reply_tx, onSuccess }) => {
  const { relayOne } = useRelay()
    const router = useRouter()
    const [boostTag, setBoostTag] = useState("")
    const [twetchPost, setTwetchPost] = useState()
    const [placeholder, setPlaceholder] = useState(<FormattedMessage id="Ask Bitcoin a question"/>)
    const { tag, setTag } = useTuning() 
    const { send, authenticated, exchangeRate } = useBitcoin()
    const blankSlateValue = [{ type: "paragraph", children: [{ text: "" }] }];
    const [editor, setEditor] = useState(() => withReact(createEditor()));
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const [value, setValue] = useState(blankSlateValue);

    const intl = useIntl()

    


    useEffect(()=>{
      if(reply_tx){
        setPlaceholder(<FormattedMessage id="Add your answer"/>)
      } else {
        switch (tag){
          //case "1F9E9":
            case "question":
            setPlaceholder(<FormattedMessage id="Ask Bitcoin a question"/>)
            break;
          //case "1F4A1":
            case "answer":
            setPlaceholder("What do you have in mind?")
            break;
          //case "1F48E":
            case "project":
            setPlaceholder("What are you building?")
            break;
          default: 
            setPlaceholder(<FormattedMessage id="Ask Bitcoin a question"/>)
        }
      }
      
    },[tag, reply_tx])


    const handlePostLoading = () => {
      toast('Publishing Your post to the Network', {
          icon: '⛏️',
          style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          },
        });
    };
  
    const handlePostSuccess = () => {
      toast('Success!', {
          icon: '✅',
          style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          },
        });
    };
  
    const handlePostError = () => {
      toast('Error!', {
          icon: '🐛',
          style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          },
      });
    };

    const serialize = nodes => {
      return nodes.map(n => Node.string(n)).join('\n')
    }


    const handlePost = async (e) => {
      e.preventDefault()
      const content = serialize(editor.children)
      
      let opReturn;
      if (reply_tx) {
        opReturn = [
          "onchain",
          "1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN",
          "answer",
          JSON.stringify({
            question_tx_id: reply_tx,
            content,
          }),
        ];
      } else {
        opReturn = [
          "onchain",
          "1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN",
          "question",
          JSON.stringify({
            content,
          }),
        ];
      }

      const outputs = {
        opReturn,
        currency: "BSV",
        amount: 218 *1e-8,
        to: "1MqPZFc31jUetZ5hxVtG4tijJSugAcSZCQ",
      };

      handlePostLoading()

      let txid,rawTx 

      try {
        let resp = await relayOne.send(outputs)
        txid = resp.txid;
        rawTx= resp.rawTx
      handlePostSuccess()
      } catch (error) {
        console.log(error)
        handlePostError()
      }
      
    

      
      if(!txid && !rawTx){
        return
      }
      (async () => {
        try {
          let { data: postTransactionResponse } = await axios.post('https://askbitcoin.ai/api/v1/transactions', {
            transaction: rawTx
          });

          console.log('askbitcoin_postTransactionResponse', postTransactionResponse);
        } catch (error) {
          console.error('postTransactionResponse', error);
        }
      })();

      (async () => {
        try {
          let { data: postTransactionResponse } = await axios.post('https://pow.co/api/v1/transactions', {
            transaction: rawTx
          });

          console.log('powco_post_transaction_response', postTransactionResponse);
        } catch (error) {
          console.error('powco_post_transaction_response', error);
        }
      })();


      (async () => {
        try {
          let { data: postTransactionResponse } = await axios.post('https://pow.co/api/v1/jobs', {
            transaction: rawTx
          });

          console.log('powco_post_transaction_response', postTransactionResponse);
        } catch (error) {
          console.error('powco_post_transaction_response', error);
        }
      })();

      if (reply_tx){

        (async () => {
          try {
            let { data: postTransactionResponse } = await axios.post('https://askbitcoin.ai/api/v1/answers', {
              transaction: rawTx
            });

            console.log('api.answers.post.response', postTransactionResponse);
          } catch (error) {
            console.error('api.answers.post.response', error);
          }
        })();
        
        (async () => {
          try {
            
            await axios.get(`https://askbitcoin.ai/api/v1/answers/${txid}`);
            

          } catch (error) {

            console.error('api.answers.show.error', error);
          }
        })();

        router.push(`/answers/${txid}`)

      } else {
        
        (async () => {
          try {
            let { data: postTransactionResponse } = await axios.post('https://askbitcoin.ai/api/v1/questions', {
              transaction: rawTx
            });

            
            console.log('api.questions.post.response', postTransactionResponse);

          } catch (error) {
            console.error('api.questions.post.response', error);
          }
        })();

        (async () => {
          try {

            await axios.get(`https://askbitcoin.ai/api/v1/questions/${txid}`);


          } catch (error) {

            console.error('api.questions.show.error', error);
          }
        })();

        router.push(`/questions/${txid}`)

      }
      setValue(blankSlateValue)
      
    };

    const handleChange = async (newValue) => {
      const twetchPostRegex = /http(s)?:\/\/(.*\.)?twetch\.com\/t\/([A-z0-9_/?=]+)/;
      let match = newValue[0].children[0].text.match(twetchPostRegex)
      
      if (match){
        /* let twetchTx = match[3]
        try {
          const resp = await axiosInstance.get(`/api/v1/twetch/${twetchTx}`)
          setTwetchPost(resp.data.twetch)  
          setValue(blankSlateValue)      
        } catch (error) {
          console.log("twetch.not.found")
          setTwetchPost()
        } */
      } else {
        setValue(newValue)
        //setTwetchPost()
      }
    }

    const handleChangeDifficulty = (e) =>  {
      e.preventDefault()
      setDifficulty(e.target.value)
    }

    const handleChangeTag = (e) => {
      e.preventDefault()
      setBoostTag(e.target.value)
    }

  return (
    <div
      className={
         `flex flex-col p-3 rounded-lg sm:rounded-xl text-gray-900 dark:text-white ${reply_tx ? "bg-gray-200 dark:bg-gray-500":"bg-gray-100 dark:bg-gray-600"} dark:${reply_tx ? "bg-gray-500":"bg-gray-600"}`
      }
    >
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => handleChange(newValue)}
      >
        <Editable
          placeholder={placeholder}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          style={{
            position: "relative",
            outline: "none",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
            minHeight: "22px",
          }}
        />
      </Slate>
      {twetchPost && <div className='mt-2 border rounded-lg border-gray-300 dark:border-gray-700'><PostCard post={twetchPost}/></div>}
      <div className={`flex  items-center mt-2 justify-between`}>
        <div className='flex w-full justify-end'>
        <button
          onClick={handlePost}
          disabled={!authenticated || value[0].children[0].text.length === 0}
          className={`text-white bg-gradient-to-tr from-blue-500 to-blue-600 leading-6 py-1 px-4 font-bold border-none rounded cursor-pointer flex items-center text-center justify-center disabled:opacity-50 transition duration-500 transform hover:-translate-y-1`}
        >
          <FormattedMessage id="Post"/>
        </button>
        </div>
      </div>
        
    </div>
  )
}

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
      /* case 'block-quote':
          return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
          return <ul {...attributes}>{children}</ul>
        case 'heading-one':
          return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
          return <h2 {...attributes}>{children}</h2>
        case 'list-item':
          return <li {...attributes}>{children}</li>
        case 'numbered-list':
          return <ol {...attributes}>{children}</ol> */
      default:
        return (
          <p {...attributes} className="RichInput_inputLabel__QYxaP">
            {children}
          </p>
        );
    }
  };
  
  const Leaf = ({ attributes, children, leaf }) => {
    /* if (leaf.bold) {
        children = <strong>{children}</strong>
      }
    
      if (leaf.code) {
        children = <code>{children}</code>
      }
    
      if (leaf.italic) {
        children = <em>{children}</em>
      }
    
      if (leaf.underline) {
        children = <u>{children}</u>
      } */
  
    return <span {...attributes}>{children}</span>;
  };

export default Composer;


const B_PREFIX = `19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut`;
const AIP_PREFIX = `15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva`;
export const MAP_PREFIX = `1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5`;