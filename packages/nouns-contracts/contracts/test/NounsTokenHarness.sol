// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.15;

import { NounsToken } from '../NounsToken.sol';
import { INounsDescriptorMinimal } from '../interfaces/INounsDescriptorMinimal.sol';
import { INounsSeeder } from '../interfaces/INounsSeeder.sol';
import { IProxyRegistry } from '../external/opensea/IProxyRegistry.sol';

contract NounsTokenHarness is NounsToken {
    uint256 public currentNounId;

    constructor(
        address noundersDAO,
        address minter,
        INounsDescriptorMinimal descriptor,
        INounsSeeder seeder,
        IProxyRegistry proxyRegistry
    ) NounsToken(noundersDAO, minter, descriptor, seeder, proxyRegistry, bytes32(0)) {}

    function mintTo(address to) public {
        _mintTo(to, currentNounId++);
    }

    function mintMany(address to, uint256 amount) public {
        for (uint256 i = 0; i < amount; i++) {
            mintTo(to);
        }
    }

    function mintSeed(
        address to,
        uint48 background,
        uint48 body,
        uint48 accessory,
        uint48 head,
        uint48 glasses
    ) public {
        seeds[currentNounId] = INounsSeeder.Seed({
            background: background,
            body: body,
            accessory: accessory,
            head: head,
            glasses: glasses
        });

        _mint(owner(), to, currentNounId++);
    }
}
