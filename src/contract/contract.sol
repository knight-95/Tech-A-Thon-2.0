// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Healthcare{
  
    struct PatientRecord{
        uint256 timestamp;
        string url;
    }

    mapping(address => PatientRecord[])  records;


    function add_record(uint256 _timestamp,string memory _url) external  {
            records[msg.sender].push(PatientRecord(_timestamp,_url));
    }

    function see_record(address _address) public view returns(PatientRecord[] memory) {
        return(records[_address]);
    }

}