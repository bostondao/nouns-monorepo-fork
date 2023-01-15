import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import { Result } from 'ethers/lib/utils';
import { task, types } from 'hardhat/config';
import * as airdropJson from '../files/airdrop.json';


task('generate-merkle-drop', 'Generates the merkle airdrop root and json')
  .setAction(async () => {
    // (1)
    const values = airdropJson.airdrop
    // (2)
    const tree = StandardMerkleTree.of(values, ["address", "uint256"]);

    // (3)
    console.log('Merkle Root:', tree.root);

    // (4)
    fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));
  });

