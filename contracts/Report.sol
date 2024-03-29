// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Report{

    struct report{
        uint timestamp;
        string message;
        address from;
        bool solved;
    }
    report[] Reports;

    function viewReports() public view returns(report[] memory){
        return Reports;
    }

    address adminId;

    function LoginAsAdmin(address _id,uint _password) internal view {
        if(_id == 0x0Ec539aB6ddf140843106eE8DDa4e860C5350C8F && _password == 12345){
            adminId==msg.sender;
        }
    }
    modifier isAdmin(){
        require(msg.sender == adminId,"Only Admin is Allowed");
        _;
    }

    modifier isPeople(){
        require(msg.sender != address(0),"Invalid Address");
        _;
    }
    
    function ReportCrime(string memory _message) public isPeople {
        Reports.push(report(block.timestamp,_message,msg.sender,false));
    }
}
