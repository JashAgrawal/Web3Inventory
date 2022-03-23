pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
contract Invoice is ConfirmedOwner(msg.sender) {
  using SafeMath for uint256;
  using SafeMath for uint32;
  enum paymentStatuses{ PENDING, PAID }
    struct Invoice {
        uint invoiceId;
        string buyerPAN;
        string sellerPAN;
        uint32 invoiceAmount;
        uint256 invoiceDate;
        uint32 invoiceNo;
        paymentStatuses paymentStatus;
    }
    uint randNonce = 0;
    mapping(uint => Invoice) public invoiceIdtoInvoice;
    mapping(string => uint) public buyerPANCount;
    Invoice[] public Invoices;
    //create an invoice
    function _invoiceCreation(string memory _buyerPAN,string memory _sellerPAN,uint32 _invoiceAmount) external onlyOwner returns(uint) {
        uint newGenratedInvoiceId = _genratePseudoRandomInvoiceId(_buyerPAN,_sellerPAN,_invoiceAmount);
        uint32 newGenratedinvoiceNo = uint32(Invoices.length);
        Invoice memory newInvoice = Invoice(newGenratedInvoiceId,_buyerPAN,_sellerPAN,_invoiceAmount,block.timestamp,newGenratedinvoiceNo,paymentStatuses.PENDING);
        invoiceIdtoInvoice[newGenratedInvoiceId] = newInvoice;
        buyerPANCount[_buyerPAN]++;
        Invoices.push(newInvoice);
    }
    //get state of payment for invoiceId
    function getPaymentStatus(uint _invoiceId) external view returns(paymentStatuses){
        return invoiceIdtoInvoice[_invoiceId].paymentStatus;
    }
    //Update state of payment for invoiceId
    function UpdatePaymentStatus(uint _invoiceId,bool isPaymentCompleted) external onlyOwner returns(Invoice memory){
        if(isPaymentCompleted){
            Invoices[invoiceIdtoInvoice[_invoiceId].invoiceNo].paymentStatus = paymentStatuses.PAID;
            invoiceIdtoInvoice[_invoiceId].paymentStatus = paymentStatuses.PAID;
        } else{
            Invoices[invoiceIdtoInvoice[_invoiceId].invoiceNo].paymentStatus = paymentStatuses.PENDING;
            invoiceIdtoInvoice[_invoiceId].paymentStatus = paymentStatuses.PENDING;
        }
        return invoiceIdtoInvoice[_invoiceId];
    }
    //provides a list of previous invoices searched with buyer Pan
    function getInvoicesByPan(string memory _buyerPAN) external view returns(Invoice[] memory) {
        Invoice[] memory result = new Invoice[](buyerPANCount[_buyerPAN]);
        uint counter = 0;
        for (uint i = 0; i < Invoices.length; i++) {
            if (keccak256(abi.encodePacked(Invoices[i].buyerPAN)) == keccak256(abi.encodePacked(_buyerPAN))) {
                result[counter] =Invoices[i];
                counter++;
            }
        }
        return result;
    }
    //for genrating pseudoRandom nos (used in this project)
    function _genratePseudoRandomInvoiceId(string memory _buyerPAN,string memory _sellerPAN,uint32 _invoiceAmount) private returns(uint){
        randNonce++; 
        return uint(keccak256(abi.encodePacked( _buyerPAN,
                                                _sellerPAN,
                                                _invoiceAmount,
                                                msg.sender,
                                                randNonce
                                            ))) % 10 ** 8;
    }
}