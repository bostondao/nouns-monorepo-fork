import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";
import { Result } from 'ethers/lib/utils';
import { task, types } from 'hardhat/config';
import * as airdropJson from '../files/airdrop.json';


task('generate-merkle-drop', 'Generates the merkle airdrop root and json')
  .setAction(async () => {
    const values = airdropJson.airdrop
    const tree = StandardMerkleTree.of(values, ["address"]);

    console.log('Merkle Root:', tree.root);
    fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));

    let proofs: any = {};

    for (const [i, v] of tree.entries()) {
      proofs[v[0]] = tree.getProof(i);
    }

    fs.writeFileSync("proof.json", JSON.stringify(proofs));
})