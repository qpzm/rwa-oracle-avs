import { ethers } from "ethers";
import * as dotenv from "dotenv";
const fs = require('fs');
const path = require('path');
dotenv.config();

// Setup env variables
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.TASK_CREATOR_PRIVATE_KEY!, provider);
/// TODO: Hack
let chainId = 11155420;

const avsDeploymentData = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../contracts/deployments/hello-world/${chainId}.json`), 'utf8'));
const rwaPriceServiceManagerAddress = avsDeploymentData.addresses.rwaPriceServiceManager;
console.log("rwaPriceServiceManager ", rwaPriceServiceManagerAddress)
const rwaPriceServiceManagerABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../abis/RwaPriceServiceManager.json'), 'utf8'));
// Initialize contract objects from ABIs
const rwaPriceServiceManager = new ethers.Contract(rwaPriceServiceManagerAddress, rwaPriceServiceManagerABI, wallet);


// Function to generate random names
function generateRandomName(): string {
    const adjectives = ['Quick', 'Lazy', 'Sleepy', 'Noisy', 'Hungry'];
    const nouns = ['Fox', 'Dog', 'Cat', 'Mouse', 'Bear'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomName = `${adjective}${noun}${Math.floor(Math.random() * 1000)}`;
    return randomName;
  }

async function createNewTask(taskName: string) {
  try {
    // Send a transaction to the createNewTask function
    const tx = await rwaPriceServiceManager.createNewTask(taskName);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    console.log(`Transaction successful with hash: ${receipt.hash}`);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

// Function to create a new task with a random name every 15 seconds
function startCreatingTasks() {
  // Start right away
  const tokenName = "KRBOND";
  console.log(`Creating new task with name: ${tokenName}`);
  createNewTask(tokenName);

  setInterval(() => {
    console.log(`Creating new task with name: ${tokenName}`);
    createNewTask(tokenName);
  }, 20000);
}

// Start the process
startCreatingTasks();
