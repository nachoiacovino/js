export const mockExtensionWithFunctionsCompilerMetadata = {
  compiler: {
    version: "0.8.25+commit.b61c2a91",
  },
  language: "Solidity",
  output: {
    abi: [
      {
        anonymous: false,
        inputs: [],
        name: "CallbackFunctionOne",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [],
        name: "FallbackFunctionCalled",
        type: "event",
      },
      {
        inputs: [],
        name: "CALLER_ROLE",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "callbackFunctionOne",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getExtensionConfig",
        outputs: [
          {
            components: [
              {
                internalType: "bool",
                name: "registerInstallationCallback",
                type: "bool",
              },
              {
                internalType: "bytes4[]",
                name: "requiredInterfaces",
                type: "bytes4[]",
              },
              {
                internalType: "bytes4[]",
                name: "supportedInterfaces",
                type: "bytes4[]",
              },
              {
                components: [
                  {
                    internalType: "bytes4",
                    name: "selector",
                    type: "bytes4",
                  },
                ],
                internalType: "struct IExtensionConfig.CallbackFunction[]",
                name: "callbackFunctions",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "bytes4",
                    name: "selector",
                    type: "bytes4",
                  },
                  {
                    internalType: "uint256",
                    name: "permissionBits",
                    type: "uint256",
                  },
                ],
                internalType: "struct IExtensionConfig.FallbackFunction[]",
                name: "fallbackFunctions",
                type: "tuple[]",
              },
            ],
            internalType: "struct IExtensionConfig.ExtensionConfig",
            name: "config",
            type: "tuple",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "getNumber",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "notPermissioned_call",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "notPermissioned_delegatecall",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "notPermissioned_staticcall",
        outputs: [],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "onInstall",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "onUninstall",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "permissioned_call",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "permissioned_delegatecall",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "permissioned_staticcall",
        outputs: [],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_number",
            type: "uint256",
          },
        ],
        name: "setNumber",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    devdoc: {
      kind: "dev",
      methods: {
        "getExtensionConfig()": {
          details: "Returns the ExtensionConfig of the Extension contract.",
        },
      },
      version: 1,
    },
    userdoc: {
      kind: "user",
      methods: {},
      version: 1,
    },
  },
  settings: {
    compilationTarget: {
      "src/Demo.sol": "DemoExtensionWithFunctions",
    },
    evmVersion: "london",
    libraries: {},
    metadata: {
      bytecodeHash: "ipfs",
    },
    optimizer: {
      enabled: true,
      runs: 10000,
    },
    remappings: [
      ":@erc721a-upgradeable/=lib/ERC721A-Upgradeable/contracts/",
      ":@erc721a/=lib/erc721a/contracts/",
      ":@solady/=lib/solady/src/",
      ":ERC721A-Upgradeable/=lib/ERC721A-Upgradeable/contracts/",
      ":ds-test/=lib/forge-std/lib/ds-test/src/",
      ":erc721a/=lib/erc721a/contracts/",
      ":forge-std/=lib/forge-std/src/",
      ":solady/=lib/solady/src/",
    ],
  },
  sources: {
    "lib/solady/src/auth/Ownable.sol": {
      keccak256:
        "0xc208cdd9de02bbf4b5edad18b88e23a2be7ff56d2287d5649329dc7cda64b9a3",
      license: "MIT",
      urls: [
        "bzz-raw://e8fba079cc7230c617f7493a2e97873f88e59a53a5018fcb2e2b6ac42d8aa5a3",
        "dweb:/ipfs/QmTXg8GSt8hsK2cZhbPFrund1mrwVdkLQmEPoQaFy4fhjs",
      ],
    },
    "lib/solady/src/auth/OwnableRoles.sol": {
      keccak256:
        "0xd797b6f74f6421d77d74cda55d494470495264ab100cff82a71ff2297d4870e3",
      license: "MIT",
      urls: [
        "bzz-raw://b7504f97d8d3a908802f40fabbb4dcfcbf8e008b627be57f14ee84b67e0d9f3c",
        "dweb:/ipfs/QmXYrdhsYTGDqBdSvvyXQNVpZRAPYXdCcERG8DDPXZY67L",
      ],
    },
    "lib/solady/src/utils/EnumerableSetLib.sol": {
      keccak256:
        "0x6809f4f8e7c82c59e679694d73d5dfb2ca3a70202171baf24cffddc88475492f",
      license: "MIT",
      urls: [
        "bzz-raw://1ec4af64d282e86df4157c9936e53187a119560c9d6206a2977560e093baefcf",
        "dweb:/ipfs/QmQ3UGs8RDtA6mZCEeqE2S9tpdxDBBoK58XrULfRkMCbwP",
      ],
    },
    "src/Demo.sol": {
      keccak256:
        "0x738c03275a66f09f573b69f89ceeeb53d0668b52f1b5e16cc0bc70620d38ba52",
      license: "Apache 2.0",
      urls: [
        "bzz-raw://1be21e03e2aef01bfb812761b787f8b7ea4ce5dff5bf7d441b62873d614f685d",
        "dweb:/ipfs/QmaWQqtidwsfbZMaNJwocH3Pg4cxzEPVtqmTCs9QTNo96Z",
      ],
    },
    "src/ModularCore.sol": {
      keccak256:
        "0x8a9689ce76dd1620af3d8e4447d34690ce7b723b2afafd53d90e95408b287125",
      license: "Apache-2.0",
      urls: [
        "bzz-raw://2ad7bb3f46b307efd5820ea25cfa3447ff0833ab9e9625d529bc42778f431e73",
        "dweb:/ipfs/QmfJGq5rDaArSJpNH2SxQpZM5t7GaikgQsTGaU5KQhJWao",
      ],
    },
    "src/ModularExtension.sol": {
      keccak256:
        "0x120eb58c0831e92c2d2fe9bebe665e8b24e8beb9bae4879f557e0732931ad645",
      license: "Apache-2.0",
      urls: [
        "bzz-raw://2962dce5204f30a08ad0eed7072fb167c585ce77b4a6b1c89eb55e14020812d8",
        "dweb:/ipfs/QmRK6RUWWuvDCFC9KhAnvpGSZPR6FKDYjaTwSsjQpEkduq",
      ],
    },
    "src/Role.sol": {
      keccak256:
        "0xafc9a9efc8a061ba0cdfa1d8f67c6a0465e3fa5575d884b56b1f78ff0e9da6d1",
      license: "Apache-2.0",
      urls: [
        "bzz-raw://eca0dfa2bb454c50c71e8522cf22afca4e72187dec78a005b8ecbb813b9e1d1f",
        "dweb:/ipfs/QmR5JK7xHuhTk56LYXFHL3dD89gaLUNWAfstKSXhe2ZsuR",
      ],
    },
    "src/interface/IERC165.sol": {
      keccak256:
        "0xedb23845bbd16950c2dd587776ee5752e7fb54f314a41f7250c2b0ce79209d31",
      license: "Apache-2.0",
      urls: [
        "bzz-raw://bf4c874ad60ae5a5bdaeef490e0cbfba68eba0c5b8f7dde6c35cca0e2a17134a",
        "dweb:/ipfs/QmVxsnGzJoLb18NZBRSzmRomCzth9nkZB6DuFzCBQreUct",
      ],
    },
    "src/interface/IExtensionConfig.sol": {
      keccak256:
        "0x665aea5ebea206c634c3510260a083f13b0275a771740f278183d4b2a42a91f8",
      license: "Apache-2.0",
      urls: [
        "bzz-raw://8897a304b83d7e8a01f764fcc49287abdbdbf92b762332c919d56b22d72dc66f",
        "dweb:/ipfs/QmaEDW3w26NLVrLpfa5aNMwSMwnLCiiF9ukAAAcFNPrHrg",
      ],
    },
    "src/interface/IInstallationCallback.sol": {
      keccak256:
        "0xc26be53a5c593dea9d0694955b682af3b6ebb510042571bc793257b2d64fb907",
      license: "Apache-2.0",
      urls: [
        "bzz-raw://5772a6f9e69f55a0946c0d3f208b4a9fb3d7da3c552aa61ec55027d62b61a231",
        "dweb:/ipfs/QmPFR6jecZuzRMgP2abPaWznR4yY7NnZooRk3TozvrMVdw",
      ],
    },
    "src/interface/IModularCore.sol": {
      keccak256:
        "0xf3edc012602480d2be841eeea6d65fc26603b2ab5be9cf430dff40c755612ac8",
      license: "Apache-2.0",
      urls: [
        "bzz-raw://054fb78914d07b87626a626c698afdcec02d5b9314e2c7f7447196e9ba1fa672",
        "dweb:/ipfs/QmfQvFE6t8tGBpmJYii56uaduPpZnksGvswUe6RGLoYHrM",
      ],
    },
    "src/interface/IModularExtension.sol": {
      keccak256:
        "0x3558cfd513788fa869387d88fd5a6e43d0656779649181b61489f5f69e3c11dd",
      license: "Apache-2.0",
      urls: [
        "bzz-raw://2be10ae19d798164f4afd81dc183e1c3b0e912d9eba69feadf6279db96edf614",
        "dweb:/ipfs/QmZSBwJn68oxxskwGMajZPP4np93YSZfBBhtc4ftWxbK2v",
      ],
    },
  },
  version: 1,
};

export const mockExtensionWithFunctionsBytecode =
  "0x6080604052348015600f57600080fd5b50610a498061001f6000396000f3fe608060405234801561001057600080fd5b50600436106100de5760003560e01c80637c173ecc1161008c5780638dc5fd9e116100665780638dc5fd9e146100e3578063ae7c8cb7146100e3578063edf8bf0514610141578063f2c9ecd81461014957600080fd5b80637c173ecc1461012c57806389242efb146100e35780638a91b0e31461010057600080fd5b80633fb5c1cb116100bd5780633fb5c1cb146100ed5780636d61fe7014610100578063774237fc1461011157600080fd5b8062862ba3146100e35780630a340d43146100e357806313efddd6146100e5575b600080fd5b005b6100e3610151565b6100e36100fb3660046106e1565b600055565b6100e361010e366004610729565b50565b610119602081565b6040519081526020015b60405180910390f35b61013461017c565b60405161012391906108b4565b6100e36105a2565b600054610119565b6040517f6a94d761ae01a14a6739229452f57b368e87612171065a3d5019e116a9d396f290600090a1565b6101b06040518060a00160405280600015158152602001606081526020016060815260200160608152602001606081525090565b6101b86105cd565b60608201526040805160088082526101208201909252600091816020015b60408051808201909152600080825260208201528152602001906001900390816101d657905050905060405180604001604052807f13efddd6569653d47ffac5372eb47444c286a8ffef1e53038543a9c9fe261e907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152602001600081525081600081518110610267576102676109a4565b602002602001018190525060405180604001604052807f0a340d43c189d7683fd9ee595c325b463eae26aafcbd5bf4771c28877148f06d7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020016000815250816001815181106102da576102da6109a4565b602002602001018190525060405180604001604052807f89242efbc954119627fd4a16f1f2790891241f888b08be9ba0e8af83c98d3bf37bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200160008152508160028151811061034d5761034d6109a4565b602002602001018190525060405180604001604052807fae7c8cb7979eaf4a80027a43922a52050b99ff8ed3c879b57a11ceb2b27119037bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020016020815250816003815181106103c0576103c06109a4565b602002602001018190525060405180604001604052807e862ba3689d7a82a419b334a17a891037a52d70a8e64ee36441f919abd23bf17bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152602001602081525081600481518110610432576104326109a4565b602002602001018190525060405180604001604052807f8dc5fd9e74636db43b52422eb4d289625be2cf24b7f73fa7ebd9b1fae51c70f87bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020016020815250816005815181106104a5576104a56109a4565b602002602001018190525060405180604001604052807f3fb5c1cb9d57cc981b075ac270f9215e697bc33dacd5ce87319656ebf8fc7b927bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152602001602081525081600681518110610518576105186109a4565b602002602001018190525060405180604001604052807ff2c9ecd8ec9cc7cb8e7819015497279c0a95e47a657075f0f863f20e4918963c7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200160008152508160078151811061058b5761058b6109a4565b602090810291909101015260808201526001815290565b6040517f79201cdedb9b351e17bd1274b3465126723ac336d7a6b1546a2f0e97b8f0a73090600090a1565b60606105db600a60016109d3565b67ffffffffffffffff8111156105f3576105f36106fa565b60405190808252806020026020018201604052801561063357816020015b6040805160208101909152600081528152602001906001900390816106115790505b50905060005b600a811015610691578060e01b828281518110610658576106586109a4565b60209081029190910101517fffffffff000000000000000000000000000000000000000000000000000000009091169052600101610639565b5063edf8bf0560e01b81600a815181106106ad576106ad6109a4565b60209081029190910101517fffffffff00000000000000000000000000000000000000000000000000000000909116905290565b6000602082840312156106f357600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60006020828403121561073b57600080fd5b813567ffffffffffffffff8082111561075357600080fd5b818401915084601f83011261076757600080fd5b813581811115610779576107796106fa565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156107bf576107bf6106fa565b816040528281528760208487010111156107d857600080fd5b826020860160208301376000928101602001929092525095945050505050565b60008151808452602080850194506020840160005b8381101561084b5781517fffffffff00000000000000000000000000000000000000000000000000000000168752958201959082019060010161080d565b509495945050505050565b60008151808452602080850194506020840160005b8381101561084b57815180517fffffffff00000000000000000000000000000000000000000000000000000000168852830151838801526040909601959082019060010161086b565b6000602080835283511515818401528084015160a060408501526108db60c08501826107f8565b905060408501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08086840301606087015261091783836107f8565b6060880151878203830160808901528051808352908601945060009350908501905b8084101561097c578451517fffffffff00000000000000000000000000000000000000000000000000000000168252938501936001939093019290850190610939565b5060808801519450818782030160a08801526109988186610856565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b80820180821115610a0d577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b9291505056fea264697066735822122023d3cde81cfb73e28c4dc38cf87026d6184957a3335f97c448d505853e97997264736f6c63430008190033";

export const mockExtensionWithFunctionsDeployedBytecode =
  "0x608060405234801561001057600080fd5b50600436106100de5760003560e01c80637c173ecc1161008c5780638dc5fd9e116100665780638dc5fd9e146100e3578063ae7c8cb7146100e3578063edf8bf0514610141578063f2c9ecd81461014957600080fd5b80637c173ecc1461012c57806389242efb146100e35780638a91b0e31461010057600080fd5b80633fb5c1cb116100bd5780633fb5c1cb146100ed5780636d61fe7014610100578063774237fc1461011157600080fd5b8062862ba3146100e35780630a340d43146100e357806313efddd6146100e5575b600080fd5b005b6100e3610151565b6100e36100fb3660046106e1565b600055565b6100e361010e366004610729565b50565b610119602081565b6040519081526020015b60405180910390f35b61013461017c565b60405161012391906108b4565b6100e36105a2565b600054610119565b6040517f6a94d761ae01a14a6739229452f57b368e87612171065a3d5019e116a9d396f290600090a1565b6101b06040518060a00160405280600015158152602001606081526020016060815260200160608152602001606081525090565b6101b86105cd565b60608201526040805160088082526101208201909252600091816020015b60408051808201909152600080825260208201528152602001906001900390816101d657905050905060405180604001604052807f13efddd6569653d47ffac5372eb47444c286a8ffef1e53038543a9c9fe261e907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152602001600081525081600081518110610267576102676109a4565b602002602001018190525060405180604001604052807f0a340d43c189d7683fd9ee595c325b463eae26aafcbd5bf4771c28877148f06d7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020016000815250816001815181106102da576102da6109a4565b602002602001018190525060405180604001604052807f89242efbc954119627fd4a16f1f2790891241f888b08be9ba0e8af83c98d3bf37bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200160008152508160028151811061034d5761034d6109a4565b602002602001018190525060405180604001604052807fae7c8cb7979eaf4a80027a43922a52050b99ff8ed3c879b57a11ceb2b27119037bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020016020815250816003815181106103c0576103c06109a4565b602002602001018190525060405180604001604052807e862ba3689d7a82a419b334a17a891037a52d70a8e64ee36441f919abd23bf17bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152602001602081525081600481518110610432576104326109a4565b602002602001018190525060405180604001604052807f8dc5fd9e74636db43b52422eb4d289625be2cf24b7f73fa7ebd9b1fae51c70f87bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020016020815250816005815181106104a5576104a56109a4565b602002602001018190525060405180604001604052807f3fb5c1cb9d57cc981b075ac270f9215e697bc33dacd5ce87319656ebf8fc7b927bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152602001602081525081600681518110610518576105186109a4565b602002602001018190525060405180604001604052807ff2c9ecd8ec9cc7cb8e7819015497279c0a95e47a657075f0f863f20e4918963c7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200160008152508160078151811061058b5761058b6109a4565b602090810291909101015260808201526001815290565b6040517f79201cdedb9b351e17bd1274b3465126723ac336d7a6b1546a2f0e97b8f0a73090600090a1565b60606105db600a60016109d3565b67ffffffffffffffff8111156105f3576105f36106fa565b60405190808252806020026020018201604052801561063357816020015b6040805160208101909152600081528152602001906001900390816106115790505b50905060005b600a811015610691578060e01b828281518110610658576106586109a4565b60209081029190910101517fffffffff000000000000000000000000000000000000000000000000000000009091169052600101610639565b5063edf8bf0560e01b81600a815181106106ad576106ad6109a4565b60209081029190910101517fffffffff00000000000000000000000000000000000000000000000000000000909116905290565b6000602082840312156106f357600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60006020828403121561073b57600080fd5b813567ffffffffffffffff8082111561075357600080fd5b818401915084601f83011261076757600080fd5b813581811115610779576107796106fa565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156107bf576107bf6106fa565b816040528281528760208487010111156107d857600080fd5b826020860160208301376000928101602001929092525095945050505050565b60008151808452602080850194506020840160005b8381101561084b5781517fffffffff00000000000000000000000000000000000000000000000000000000168752958201959082019060010161080d565b509495945050505050565b60008151808452602080850194506020840160005b8381101561084b57815180517fffffffff00000000000000000000000000000000000000000000000000000000168852830151838801526040909601959082019060010161086b565b6000602080835283511515818401528084015160a060408501526108db60c08501826107f8565b905060408501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08086840301606087015261091783836107f8565b6060880151878203830160808901528051808352908601945060009350908501905b8084101561097c578451517fffffffff00000000000000000000000000000000000000000000000000000000168252938501936001939093019290850190610939565b5060808801519450818782030160a08801526109988186610856565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b80820180821115610a0d577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b9291505056fea26469706673582212201f9cc6d79c8ebe0ff386d4b19dbdb9a9aeac305826a6c0e2d5fd64e99a1c4b1564736f6c63430008190033";