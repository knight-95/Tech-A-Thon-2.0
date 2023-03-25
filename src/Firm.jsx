import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
  Stack,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { ethers } from "ethers";
import { provider, contractAddress, abi } from "./contract/Interaction";
import { EarthCanvas, StarsCanvas } from "./components/canvas";
// import Pic from './assets/pic.png';

const Firm = () => {
  const [isWalletConnected, setWalletConnected] = useState(false);

  const [allRec, setAllRec] = useState([]);
  const [address, setAddress] = useState("");
  const [patAdd, setPatAdd] = useState("");

  const connectWallet = async () => {
    try {
      const Provider = new ethers.providers.Web3Provider(window.ethereum);
      const Signer = Provider.getSigner();
      await Provider.send("eth_requestAccounts", []);
      const add = await Signer.getAddress();
      setAddress(add);
      setWalletConnected(true);
    } catch (error) {
      alert("Please Install Metamask");
    }
  };

  const getRecords = async () => {
    const Provider = new ethers.providers.Web3Provider(window.ethereum);
    const Signer = Provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, Signer);
    const allRecords = await contract.see_record(patAdd);
    for (var i = 0; i < allRecords.length; i++) {
      console.log(allRecords[i].url);
    }

    setAllRec(allRecords);
  };

  const handleClick = () => {
    if (patAdd != "") {
      getRecords();
    } else {
      alert("please enter correct address");
    }
  };

  return (
    <div className="contain">
      <StarsCanvas/>
      <div className="parent-firm">
        <div className="child1-firm">
          <Stack sx={{ alignItems: "center" }} className="parent-firm">
            <Stack sx={{ mt: 1, width: 1000 }}>
              <Stack>{/* <img src={Pic}/> */}</Stack>
              <Stack>
                <Typography sx={{ fontSize: 50, fontWeight: "bold" }}>
                  MedicHQ Firm
                </Typography>
                <br />

                {address !== "" ? (

                  <TextField
                    label="Firm Address"
                    value={address}
                    style={{ border: '1px solid white', borderRadius:'5px' }}
                    id='text'
                    sx={{ width: 450, mt: 2 }}
                  />
                ) : (
                  <Button
                    variant="contained"
                    sx={{ width: 200, mt: 2 }}
                    onClick={() => {
                      connectWallet();
                    }}
                  >
                    Connect Metamask
                  </Button>
                )}
              </Stack>
            </Stack>

            <Stack sx={{ mt: 10 }}>
              {address !== "" ? (
                <Stack sx={{ flexDirection: "row" }} >
                  <TextField className="placeh"
                    placeholder="Enter patients address"
                    id="text"
                    style={{ border: '1px solid white', color: 'white', borderRadius:'5px' }}
                    sx={{ width: 450 }}
                    value={patAdd}
                    onChange={(text) => {
                      setPatAdd(text.target.value);
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: 50, ml: 2 }}
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    Find
                  </Button>
                </Stack>
              ) : (
                "Please Connect Metamask first"
              )}

              <Stack
                sx={{
                  alignItems: "center",
                  flexDirection: "row",
                  mt: 5,
                  diaplay: "flex",
                  flexWrap: "wrap",
                  width: 1000,
                }}
              >
                {allRec.map((u, i) => {
                  var date = ethers.utils.formatUnits(u.timestamp, 0);
                  var formatDate = new Date(+date);
                  console.log(new Date(+date));
                  return (
                    <Stack key={i} sx={{ m: 1 }}>
                      <Card sx={{ width: 300 }}>
                        <CardActionArea href={u.url} target="_blank">
                          <CardMedia component={"img"} image={u.url} height={300} />
                          <CardContent sx={{ backgroundColor: "#939393" }}>
                            <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                              Date:{formatDate.getDate()}.{formatDate.getMonth()}.
                              {formatDate.getFullYear()}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Stack>
                  );
                })}
              </Stack>

              <Stack
                sx={{
                  mt: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#EBEAF0",
                  justifyContent: "center",
                  borderRadius: 10,
                  color: "black"
                }}
              >
                {/* <Stack>
                  <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                    Not a MedicHQ firm, but a Patient.
                    <br /> No Worries, we got'u!
                  </Typography>

                  <Link to="/">
                    <Button
                      variant="contained"
                      href="https://medichain.fahadiqbal12.repl.co/"
                      sx={{ width: 200 }}
                    >
                      Open MediChain{" "}
                    </Button>
                  </Link>
                </Stack> */}
                {/* <img
                  src={
                    "https://img.freepik.com/free-vector/hand-drawn-epidemiology-illustration_23-2149707548.jpg?w=2000"
                  }
                  style={{ width: 250 }}
                /> */}
              </Stack>
            </Stack>
          </Stack>

        </div>
        <div className="child2-firm">
          <Stack>
            <EarthCanvas />
          </Stack>
        </div>
      </div>
      {/* <StarsCanvas /> */}
    </div>
  );
};

export default Firm;
