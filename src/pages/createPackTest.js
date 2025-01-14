const ethers = require('ethers');
require("dotenv").config();

const config = require('../abi/config.json');
const CONTRACT_ADDRESS = config.CONTRACT_ADDRESS;
const contract = require("../abi/CardMintPack.json");

// Provider
const provider = new ethers.JsonRpcProvider(process.env.API_URL);
// Signer
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
// Contract
const packContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
const tokenUri = "https://green-manual-badger-37.mypinata.cloud/ipfs/bafkreihgqsrjemcnnekx54egf7nh5vpn5ipcqlcie6us5tfqinogm5jaqu"

async function main() {
  // const checkRequestFulfillment = async (contract, requestId) => {
  //   for (let i = 0; i < MAX_RETRIES; i++) {
  //     console.log(`Checking fulfillment attempt ${i + 1}...`);
  //     const { fulfilled } = await contract.getRequestStatus(requestId);
  //     if (fulfilled) {
  //       console.log("Randomness request fulfilled.");
  //       return true;
  //     }
  //     await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL_MS)); // Wait before next check
  //   }
  //   return false;
  // };
  const tokenId = await packContract.createToken(tokenUri, signer, 1);
  console.log(tokenId);
  // // Request randomness from Chainlink VRF
  // const tx = await packContract.requestRandomWords();
  // const receipt = await tx.wait();

  // const iface = new ethers.Interface(contract.abi);
  // const eventTopic = iface.getEvent("RandomnessRequested").topicHash;

  // // Find the log with the matching topic
  // const log = receipt.logs.find((log) =>
  //   log.topics.includes(eventTopic)
  // );

  // if (!log) {
  //   throw new Error("Randomness request event not found.");
  // }

  // // Decode the log
  // const decodedLog = iface.decodeEventLog("RandomnessRequested", log.data, log.topics);

  // const requestId = decodedLog.requestId.toString();

  // // Retry checking fulfillment
  // const isFulfilled = await checkRequestFulfillment(packContract, requestId);
  // if (!isFulfilled) {
  //   throw new Error("Randomness request not fulfilled.");
  // }

  // // Batch mint the cards
  // const mintTx = await packContract.batchMint(requestId);
  // await mintTx.wait();
  // console.log("Minted new cards successfully!");

  // // Return the account that minted the cards
  // const account = await signer.getAddress();
  // return account;

  ////////////////

  // const native = await packContract.getNativePayment();
  // console.log(native);
  // // const tx = await packContract.setNativePayment(true);
  // const tx = await packContract.requestRandomWords();
  // console.log(tx);

  // const withdraw = await packContract.withdraw();
  // console.log(withdraw);

  const tx = await packContract.batchMint([8,9,10,11,12],"0x41E213C12B77A2B265A19f20c786634Edb4F2Fdb", 2);
  console.log(tx);
  // const ss = await packContract.fetchMyNFTs();
  // console.log(ss);
}
main();