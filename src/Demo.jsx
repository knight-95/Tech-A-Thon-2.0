import React, { useState, useEffect } from 'react';
import './App.css';
import { provider, contractAddress, abi } from './contract/Interaction';
import { Link } from 'react-router-dom';
import { Stack, Typography, TextField, Button, AppBar, Toolbar } from '@mui/material';
import { ethers } from 'ethers';
import { StarsCanvas } from './components/canvas';
// import Pic from './assets/pic.png';

export default function Home() {
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
    <Stack sx={{ alignItems: 'center' }}>

      <Stack sx={{ mt: 1 }}>
        <Stack>
          {/* <img src={Pic}/> */}
        </Stack>
        <Stack>
          <Typography sx={{ fontSize: 50, fontWeight: 'bold' }}>MedicHQ</Typography>
          <Typography sx={{ fontSize: 25 }} >A Roboust healthcare system to preserve and exchange patient data <br /> through hospitals, diagnostic laboratories, pharmacy firms, and physicians</Typography>
          {address !== '' ?
            <TextField id='text1' value={address} sx={{ width: 450, mt: 2 }} label='Your Address' /> :
            <Button variant='contained' sx={{ width: 200, mt: 2 }} onClick={() => { connectWallet() }} >Connect Metamask</Button>
          }

        </Stack>

        <Stack sx={{ mt: 10 }}>
          <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>Features:</Typography>
          <Stack sx={{ flexDirection: 'row' }}>
            <Stack sx={{ width: 200, textAlign: 'center', mr: 6 }}>
              <img src={'https://png.pngtree.com/png-vector/20230111/ourmid/pngtree-blockchain-vector-icon-png-image_6559271.png'} style={{ width: 200 }} />
              <Typography sx={{ m: 0.5 }}>Built on top of Blockcahin Technology</Typography>
            </Stack>
            <Stack sx={{ width: 200, textAlign: 'center', mr: 6 }}>
              <img src={'https://img.freepik.com/free-icon/clipboard_318-372777.jpg?w=360'} style={{ width: 200 }} />
              <Typography sx={{ m: 0.5 }}>Share medical records in the health care system</Typography>
            </Stack>
            <Stack sx={{ width: 200, textAlign: 'center' }}>
              <img src={'https://cdn-icons-png.flaticon.com/512/4228/4228704.png'} style={{ width: 200 }} />
              <Typography sx={{ m: 0.5 }}>To make sure patients receive fastest treatment</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack sx={{ mt: 10 }}>
          <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>How to use :</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>Its easier than you think.</Typography>
          <ol>
            <li><Typography>Take the picture of your prescription/data </Typography></li>
            <li><Typography>Submit the prescription/data url</Typography></li>
            <li><Typography>Wooah! You are done.</Typography></li>
            <li><Typography>Now you can just share your metamask address to Medical firms to let them access your data</Typography></li>
          </ol>
          {address != '' ?
            <Stack>
              <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>Add Your Report :</Typography>
              <Stack sx={{ flexDirection: 'row' }}>
                <TextField variant='filled' id='text2' label='URL of prescription/data' sx={{ width: 500, mr: 2 }} value={_url} onChange={(text) => { set_Url(text.target.value) }} />
                <Button variant='contained' sx={{ width: 80 }} onClick={() => { addRecord() }}>Submit</Button>
              </Stack>
            </Stack> :
            <Stack sx={{ backgroundColor: '#FF8181', alignItems: 'center', borderRadius: 2 }}>
              <Typography sx={{ m: 1, fontSize: 20 }}>! Please connect to metamask to upload your Report</Typography>
            </Stack>
          }
        </Stack>
        <Stack sx={{ mt: 10 }}>
          <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>Show Your Report :</Typography>
          {address != '' ?
            <Button variant='contained' sx={{ width: 300 }} onClick={() => { getRecords() }}>Get all your reports</Button> :
            <Stack sx={{ backgroundColor: '#FF8181', alignItems: 'center', borderRadius: 2 }}>
              <Typography sx={{ m: 1, fontSize: 20 }}>! Please connect to metamask to get your Report</Typography>
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
        <StarsCanvas />
      </Stack>
    </Stack>
  )
}
