// const {expect} =require("chai");
// const { ethers } = require("hardhat");

// describe("Token Contract" , function(){
//     it("Deployment should assign the total supply of tokens to the owners",async function(){

//         const [owner] =await ethers.getSigners(); // contains all the information of owner
//         console.log("Signers object:", owner);

//         const Token = await ethers.getContractFactory("Token"); //creating instance contract
        
//         const hardhatToken = await Token.deploy(); // deploy contract

//         const ownerBalance=await hardhatToken.balanceof(owner.address);
//         console.log("Balance: ",ownerBalance);

//         expect(await hardhatToken.TotalSupply()).to.equal(ownerBalance);
//     });

//     it("Should check the tranfer functionality",async function(){

//         const [owner,adr1,adr2] =await ethers.getSigners(); // contains all the information of owner
        
//         const Token = await ethers.getContractFactory("Token"); //creating instance contract
        
//         const hardhatToken = await Token.deploy(); // deploy contract

//         await hardhatToken.transfer(adr1.address,10); // owner to adr1 10 tokens
//         expect(await hardhatToken.balanceof(adr1.address)).to.equal(10);

//         await hardhatToken.connect(adr1).transfer(adr2.address,5); //adr1 to adr2 4 tokens
//         expect(await hardhatToken.balanceof(adr2.address)).to.equal(5);
     
//     });
// });
const {expect} =require("chai");
describe("Token Contract", function(){
    let Token;
    let hardhatToken;
    let owner;
    let adr1;
    let adr2;
    let adrs;
    
    beforeEach(async function(){
        Token=  await ethers.getContractFactory("Token");
        hardhatToken = await Token.deploy();
        [owner,adr1,adr2,...adrs]=await ethers.getSigners();
    });
    describe("deployment",function(){
        it("Should have the right owner",async function(){
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });
        it("assign the total supply of tokens to the owners",async function(){
            const ownerBalance=await hardhatToken.balanceof(owner.address);
            expect(await hardhatToken.TotalSupply()).to.equal(ownerBalance);
        });
    });
    describe("Transfer Functionality", function(){
        it("Should tranfer from one account to another account",async function(){
            await hardhatToken.transfer(adr1.address,5);
            const adr1balance= await hardhatToken.balanceof(adr1.address);
            expect(adr1balance).to.equal(5);

            await hardhatToken.connect(adr1).transfer(adr2.address,5);
            const adr2balance= await hardhatToken.balanceof(adr2.address);
            expect(adr2balance).to.equal(5);
        });
        it("Should fail if sender has not enough balance",async function(){
            const initialBalance= await hardhatToken.balanceof(owner.address);
            await expect(hardhatToken.connect(adr1).transfer(owner.address,1)).to.be.revertedWith("Not enough tokens");
            expect(await hardhatToken.balanceof(owner.address)).to.equal(initialBalance);
        });
        it("Check the final amounts in the accounts ",async function(){
            const initialBalance= await hardhatToken.balanceof(owner.address);
            await hardhatToken.transfer(adr1.address,5);
            await hardhatToken.transfer(adr2.address,10);

            const finalBalance = await hardhatToken.balanceof(owner.address);
            expect(finalBalance).to.equal(initialBalance-15);

            const adr1balance= await hardhatToken.balanceof(adr1.address);
            expect(adr1balance).to.equal(5);

            const adr2balance= await hardhatToken.balanceof(adr2.address);
            expect(adr2balance).to.equal(10);

        });
    });
})