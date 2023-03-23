import {ethers} from 'ethers';
// https://goerli.infura.io/v3/db461f56fb4b495a9afb52e92cbf46e6

export const provider =  new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/db461f56fb4b495a9afb52e92cbf46e6`)
export const contractAddress = '0x1eee0018285104D9e618f159E872FBebE821Dabd';
export const abi =
  [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_timestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_url",
				"type": "string"
			}
		],
		"name": "add_record",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "see_record",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "url",
						"type": "string"
					}
				],
				"internalType": "struct Healthcare.PatientRecord[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

