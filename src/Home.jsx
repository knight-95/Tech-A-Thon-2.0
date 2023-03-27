import React, { useState, useEffect } from 'react';
import './App.css';
import { provider, contractAddress, abi } from './contract/Interaction';
import { Link } from 'react-router-dom';
import { Stack, Typography, TextField, Button, AppBar, Toolbar } from '@mui/material';
import { ethers } from 'ethers';
// import Pic from './assets/pic.png';
import IMG_URL from './Upload';
// import blockchain from './assets/blockchain.gif';
import feature2 from './assets/feature2.avif'
import feature3 from './assets/feature3.png'


import { Helmet } from 'react-helmet';
import Upload from './Upload';
import { EarthCanvas, StarsCanvas } from './components/canvas';
// import ScriptTag from 'react-script-tag';


export default function Home() {
  // console.log("home url "+ IMG_URL); 
  const [isWalletConnected, setWalletConnected] = useState(false);


  const [address, setAddress] = useState('');
  const [_url, set_Url] = useState('')
  const [allRec, setAllRec] = useState([]);

  const connectWallet = async () => {
    const Provider = new ethers.providers.Web3Provider(window.ethereum);
    const Signer = Provider.getSigner();
    try {
      await Provider.send("eth_requestAccounts", []);
      const add = await Signer.getAddress()
      setAddress(add)
      setWalletConnected(true);
    } catch (error) {
      console.log(error.error)
    }

  }

  const getRecords = async () => {
    const Provider = new ethers.providers.Web3Provider(window.ethereum);
    const Signer = Provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, Signer);
    const allRecords = await contract.see_record(address);
    for (var i = 0; i < allRecords.length; i++) {
      console.log(allRecords[i].url);
    }

    setAllRec(allRecords);
  }



  const addRecord = async () => {
    const Provider = new ethers.providers.Web3Provider(window.ethereum);
    const Signer = Provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, Signer);
    try {
      await contract.add_record(Date.now(), _url);
      alert('Please wait for the transaction to be confirmed');
      set_Url('')
    } catch (error) {
      alert(error.error)
    }
  }


  return (
    <div className='parent'>
      <div className='child1'>
        <Stack sx={{ alignItems: 'center' }}>
          <StarsCanvas />

          <Stack sx={{ mt: 1 }}>
            <Stack>
            </Stack>
            <Stack>
              <Typography sx={{ fontSize: 50, fontWeight: 'bold' }} id='home-head'>MedicHQ</Typography>
              <br />
              <br />
              <Typography sx={{ fontSize: 25, fontFamily:'cursive'}} >A decentralised healthcare system to preserve and exchange patient data <br /> between hospitals, laboratories, pharmacies and physicians</Typography>
              <br />
              {/* <br /> */}
              {address !== '' ?
                <TextField id='text1' value={address} sx={{ width: 450, mt: 2 }} label='Your Address' /> :
                <Button variant='contained' sx={{ width: 200, mt: 2 }} onClick={() => { connectWallet() }} >Connect Metamask</Button>
              }

            </Stack>

            <Stack sx={{ mt: 10 }}>
          <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>Features:</Typography>
          <br />
          <Stack sx={{ flexDirection: 'row' }}>
            <Stack sx={{ width: 200, textAlign: 'center', mr: 6 }}>
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/143cdc64702723.5ae00a2ba8cd0.gif" style={{ width: 200, height:200, borderRadius:100 }} />
              <Typography sx={{ m: 0.5 }}>Built on top of Blockcahin Technology</Typography>
            </Stack>
            <Stack sx={{ width: 200, textAlign: 'center', mr: 6 }}>
              <img src={feature2} style={{ width: 200 }} />
              <Typography sx={{ m: 0.5 }}>Share medical records in the health care system</Typography>
            </Stack>
            <Stack sx={{ width: 200, textAlign: 'center' }}>
              <img src={feature3} style={{ width: 200 }} />
              <Typography sx={{ m: 0.5 }}>To make sure patients receive fastest treatment</Typography>
            </Stack>
          </Stack>
        </Stack>

            <Stack sx={{ mt: 10 }}>
              {address != '' ?
                <Stack>
                  <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>Add Your Reports :</Typography>

                  <Upload />

                  <Stack sx={{ flexDirection: 'row' }}>
                    <TextField variant='filled' id='text2' label='URL of prescription/data' sx={{ width: 500, mr: 2 }} value={_url} onChange={(text) => { set_Url(text.target.value) }} />
                    <Button variant='contained' sx={{ width: 80 }} onClick={() => { addRecord() }}>Submit</Button>
                  </Stack>
                </Stack> :
                <Stack sx={{ color: 'black', backgroundColor: 'white', alignItems: 'center', borderRadius: 2 }} id='bar'>
                  <Typography sx={{ m: 1, fontSize: 20 }} >! Please connect to metamask to upload your report</Typography>
                </Stack>
              }
            </Stack>
            <Stack sx={{ mt: 10 }}>
              <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>Check your reports:</Typography>
              <br />
              {address != '' ?
                <Button variant='contained' sx={{ width: 300 }} onClick={() => { getRecords() }}>Get all your data</Button> :
                <Stack sx={{ color: 'black', backgroundColor: 'white', alignItems: 'center', borderRadius: 2 }} id='bar'>
                  <Typography sx={{ m: 1, fontSize: 20 }}>! Please connect to metamask to check your report</Typography>
                </Stack>
              }

              <Stack sx={{ alignItems: "center", flexDirection: 'row', mt: 5, display: 'flex', flexWrap: 'wrap', width: 1000 }}>
                {allRec.map((u, i) => {
                  var date = ethers.utils.formatUnits(u.timestamp, 0)
                  var formatDate = new Date(+date)
                  console.log(new Date(+date))
                  return (
                    <Stack key={i} sx={{ width: 200, textAlign: 'center', m: 1 }} >
                      <img src={u.url} />
                      <Stack sx={{ flexDirection: 'row' }}>
                        <Typography>Date:{formatDate.getDate()}.{formatDate.getMonth()}.{formatDate.getFullYear()}</Typography>
                        <a href={u.url} target="_blank" ><img src={'https://static.thenounproject.com/png/196595-200.png'} style={{ width: 20, marginLeft: 10 }} /></a>
                      </Stack>

                    </Stack>

                  )
                })}
              </Stack>


            </Stack>
          </Stack>
        </Stack>
      </div>
      <div className='child2' id='earth-home'>
        <EarthCanvas />
      </div>
    </div>
  )
}
