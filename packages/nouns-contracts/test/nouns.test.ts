import chai from 'chai';
import { ethers } from 'hardhat';
import { BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import { NounsDescriptorV2__factory as NounsDescriptorV2Factory, NounsToken } from '../typechain';
import { deployNounsToken, populateDescriptorV2} from './utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { generateMerkleTree, generateMerkleProof} from '../src/merkleAirdrop';

chai.use(solidity);
const { expect } = chai;

describe('NounsToken', () => {
  let nounsToken: NounsToken;
  let deployer: SignerWithAddress;
  let noundersDAO: SignerWithAddress;
  let snapshotId: number;
  let tree: StandardMerkleTree<any>;
  before(async () => {
    [deployer, noundersDAO] = await ethers.getSigners();
    tree = generateMerkleTree([[deployer.address], [noundersDAO.address]]);
    nounsToken = await deployNounsToken(deployer, noundersDAO.address, deployer.address,undefined,undefined,undefined,tree.root);

    const descriptor = await nounsToken.descriptor();

    await populateDescriptorV2(NounsDescriptorV2Factory.connect(descriptor, deployer));
  });

  beforeEach(async () => {
    snapshotId = await ethers.provider.send('evm_snapshot', []);
  });

  afterEach(async () => {
    await ethers.provider.send('evm_revert', [snapshotId]);
  });

  it('should allow the minter to mint a noun to itself and a reward noun to the noundersDAO', async () => {
    const receipt = await (await nounsToken.mint()).wait();

    const [, , , noundersNounCreated, , , , ownersNounCreated] = receipt.events || [];

    expect(await nounsToken.ownerOf(0)).to.eq(noundersDAO.address);
    expect(noundersNounCreated?.event).to.eq('NounCreated');
    expect(noundersNounCreated?.args?.tokenId).to.eq(0);
    expect(noundersNounCreated?.args?.seed.length).to.equal(5);

    expect(await nounsToken.ownerOf(1)).to.eq(deployer.address);
    expect(ownersNounCreated?.event).to.eq('NounCreated');
    expect(ownersNounCreated?.args?.tokenId).to.eq(1);
    expect(ownersNounCreated?.args?.seed.length).to.equal(5);

    noundersNounCreated?.args?.seed.forEach((item: EthersBN | number) => {
      const value = typeof item !== 'number' ? item?.toNumber() : item;
      expect(value).to.be.a('number');
    });

    ownersNounCreated?.args?.seed.forEach((item: EthersBN | number) => {
      const value = typeof item !== 'number' ? item?.toNumber() : item;
      expect(value).to.be.a('number');
    });
  });

  it('should set symbol', async () => {
    expect(await nounsToken.symbol()).to.eq('NOUN');
  });

  it('should set name', async () => {
    expect(await nounsToken.name()).to.eq('Nouns');
  });

  it('should allow minter to mint a noun to itself', async () => {
    await (await nounsToken.mint()).wait();

    const receipt = await (await nounsToken.mint()).wait();
    const nounCreated = receipt.events?.[3];

    expect(await nounsToken.ownerOf(2)).to.eq(deployer.address);
    expect(nounCreated?.event).to.eq('NounCreated');
    expect(nounCreated?.args?.tokenId).to.eq(2);
    expect(nounCreated?.args?.seed.length).to.equal(5);

    nounCreated?.args?.seed.forEach((item: EthersBN | number) => {
      const value = typeof item !== 'number' ? item?.toNumber() : item;
      expect(value).to.be.a('number');
    });
  });

  it('should emit two transfer logs on mint', async () => {
    const [, , creator, minter] = await ethers.getSigners();

    await (await nounsToken.mint()).wait();

    await (await nounsToken.setMinter(minter.address)).wait();
    await (await nounsToken.transferOwnership(creator.address)).wait();

    const tx = nounsToken.connect(minter).mint();

    await expect(tx)
      .to.emit(nounsToken, 'Transfer')
      .withArgs(constants.AddressZero, creator.address, 2);
    await expect(tx).to.emit(nounsToken, 'Transfer').withArgs(creator.address, minter.address, 2);
  });

  it('should allow minter to burn a noun', async () => {
    await (await nounsToken.mint()).wait();

    const tx = nounsToken.burn(0);
    await expect(tx).to.emit(nounsToken, 'NounBurned').withArgs(0);
  });

  it('should revert on non-minter mint', async () => {
    const account0AsNounErc721Account = nounsToken.connect(noundersDAO);
    await expect(account0AsNounErc721Account.mint()).to.be.reverted;
  });

  it('should allow minter to pause claimability', async () => {
    await expect(await nounsToken.airdropClaimable()).to.equal(true);
    await (await nounsToken.setAirdropClaimable(true)).wait();
    await expect(await nounsToken.airdropClaimable()).to.equal(true);
    await (await nounsToken.setAirdropClaimable(false)).wait();
    await expect(await nounsToken.airdropClaimable()).to.equal(false);
    await (await nounsToken.setAirdropClaimable(false)).wait();
    await expect(await nounsToken.airdropClaimable()).to.equal(false);
    await (await nounsToken.setAirdropClaimable(true)).wait();
    await expect(await nounsToken.airdropClaimable()).to.equal(true);
  });

  it('should revert on non-minter pausing claimability', async () => {
    await expect(await nounsToken.airdropClaimable()).to.equal(true);
    const account0AsNounErc721Account = nounsToken.connect(noundersDAO);
    await expect(account0AsNounErc721Account.setAirdropClaimable(true)).to.be.reverted;
    await expect(account0AsNounErc721Account.setAirdropClaimable(false)).to.be.reverted;
  });

  it('should allow redeemer to redeem', async () => {
      let proof = generateMerkleProof(tree, deployer.address);
      await (await nounsToken.setAirdropClaimable(false)).wait();
      await expect(nounsToken.redeem(deployer.address, proof)).to.be.revertedWith('Redeem airdrop paused')
      await (await nounsToken.setAirdropClaimable(true)).wait();
      await (await nounsToken.redeem(deployer.address, proof)).wait();
      await expect(nounsToken.redeem(deployer.address, proof)).to.be.revertedWith('Already redeemed')

      let dao_proof = generateMerkleProof(tree, noundersDAO.address);
      const account0AsNounErc721Account = nounsToken.connect(noundersDAO);
      await expect(nounsToken.redeem(deployer.address, dao_proof)).to.be.revertedWith('Invalid merkle proof or leaf')
      await expect(account0AsNounErc721Account.redeem(noundersDAO.address, proof)).to.be.revertedWith('Invalid merkle proof or leaf')
      await (await account0AsNounErc721Account.redeem(noundersDAO.address, dao_proof)).wait();
      await expect(account0AsNounErc721Account.redeem(noundersDAO.address, dao_proof)).to.be.revertedWith('Already redeemed')
  });

  describe('contractURI', async () => {
    it('should return correct contractURI', async () => {
      expect(await nounsToken.contractURI()).to.eq(
        'ipfs://QmZi1n79FqWt2tTLwCqiy6nLM6xLGRsEPQ5JmReJQKNNzX',
      );
    });
    it('should allow owner to set contractURI', async () => {
      await nounsToken.setContractURIHash('ABC123');
      expect(await nounsToken.contractURI()).to.eq('ipfs://ABC123');
    });
    it('should not allow non owner to set contractURI', async () => {
      const [, nonOwner] = await ethers.getSigners();
      await expect(nounsToken.connect(nonOwner).setContractURIHash('BAD')).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });
});
