export const DividendTrackerAbi = [
  {
    type: "constructor",
    payable: false,
    inputs: [
      { type: "address", name: "_mainTokenAddress" },
      { type: "address", name: "_uniswapRouterAddress" },
      { type: "address", name: "_USDCAddress" },
      { type: "address", name: "_treasuryWalletAddress" },
      { type: "address", name: "_marketingWalletAddress" },
      { type: "address", name: "_liquidityWalletAddress" },
      { type: "address", name: "_bondDepoWalletAddress" },
      { type: "address", name: "_secondServiceWalletAddress" },
      { type: "address", name: "_thirdServiceWalletAddress" },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "Approval",
    inputs: [
      { type: "address", name: "owner", indexed: true },
      { type: "address", name: "spender", indexed: true },
      { type: "uint256", name: "value", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "Claim",
    inputs: [
      { type: "address", name: "account", indexed: true },
      { type: "uint256", name: "amount", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "Compound",
    inputs: [
      { type: "address", name: "account", indexed: true },
      { type: "uint256", name: "amount", indexed: false },
      { type: "uint256", name: "tokens", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "DividendWithdrawn",
    inputs: [
      { type: "address", name: "to", indexed: true },
      { type: "uint256", name: "weiAmount", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "DividendsDistributed",
    inputs: [
      { type: "address", name: "from", indexed: true },
      { type: "uint256", name: "weiAmount", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "ExcludeFromDividends",
    inputs: [
      { type: "address", name: "msgSender", indexed: false },
      { type: "address", name: "account", indexed: true },
      { type: "bool", name: "excluded", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "OwnershipTransferred",
    inputs: [
      { type: "address", name: "previousOwner", indexed: true },
      { type: "address", name: "newOwner", indexed: true },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "Receive",
    inputs: [
      { type: "address", name: "msgSender", indexed: false },
      {
        type: "address",
        name: "dividendTrackerAddress",
        indexed: false,
      },
      { type: "uint256", name: "value", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "SetBalance",
    inputs: [
      { type: "address", name: "msgSender", indexed: false },
      { type: "address", name: "account", indexed: false },
      { type: "uint256", name: "newBalance", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "Transfer",
    inputs: [
      { type: "address", name: "from", indexed: true },
      { type: "address", name: "to", indexed: true },
      { type: "uint256", name: "value", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "changeAssetManagerAddress",
    inputs: [
      { type: "address", name: "_addr", indexed: true },
      { type: "bool", name: "_isAssetManager", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "changeEcosystemAddress",
    inputs: [
      { type: "address", name: "_addr", indexed: true },
      { type: "bool", name: "_isEcosystem", indexed: false },
    ],
  },
  {
    type: "function",
    name: "_changeAssetManagerList",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "_addr" },
      { type: "bool", name: "_access" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "_changeEcosystemList",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "_addr" },
      { type: "bool", name: "_access" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "accumulativeDividendOf",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address", name: "account" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "allowance",
    constant: true,
    stateMutability: "pure",
    payable: false,
    inputs: [{ type: "address" }, { type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "approve",
    constant: true,
    stateMutability: "pure",
    payable: false,
    inputs: [{ type: "address" }, { type: "uint256" }],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "balanceOf",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address", name: "account" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "changeAssetManagerList",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "_addr" },
      { type: "bool", name: "_access" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "changeEcosystemList",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "_addr" },
      { type: "bool", name: "_access" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "claim",
    constant: false,
    payable: false,
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "compoundAccount",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "account" }],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "decimals",
    constant: true,
    stateMutability: "pure",
    payable: false,
    inputs: [],
    outputs: [{ type: "uint8" }],
  },
  {
    type: "function",
    name: "excludeFromDividends",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "account" },
      { type: "bool", name: "excluded" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "excludedFromDividends",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address" }],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "getAccountInfo",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address", name: "account" }],
    outputs: [
      { type: "address" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
    ],
  },
  {
    type: "function",
    name: "getLastClaimTime",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address", name: "account" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "getTime",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "getUnlockTime",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "isAssetManager",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address", name: "_addr" }],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "isEcosystem",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address", name: "_addr" }],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "isExcludedFromDividends",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address", name: "account" }],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "lock",
    constant: false,
    payable: false,
    inputs: [{ type: "uint256", name: "time" }],
    outputs: [],
  },
  {
    type: "function",
    name: "manualSendDividend",
    constant: false,
    payable: false,
    inputs: [
      { type: "uint256", name: "amount" },
      { type: "address", name: "holder" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "minTokenBalanceForDividends",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "name",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "string" }],
  },
  {
    type: "function",
    name: "owner",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    type: "function",
    name: "processAccountEco",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "account" }],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "renounceOwnership",
    constant: false,
    payable: false,
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "setAddressesAndEcosystem",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "_mainTokenAddress" },
      { type: "address", name: "_dividendTrackerAddress" },
      { type: "address", name: "_priceFetcherAddress" },
      { type: "address", name: "_treasuryContractAddress" },
      { type: "address", name: "_taxManagerAddress" },
      { type: "address", name: "_bondDepositoryAddress" },
      { type: "address", name: "_secondServiceContractAddress" },
      { type: "address", name: "_thirdServiceContractAddress" },
      { type: "address", name: "_metricsTrackerAddress" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "setBalance",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "account" },
      { type: "uint256", name: "newBalance" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "setEcosystemExclusions",
    constant: false,
    payable: false,
    inputs: [{ type: "bool", name: "_exclude" }],
    outputs: [],
  },
  {
    type: "function",
    name: "symbol",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "string" }],
  },
  {
    type: "function",
    name: "totalDividendsDistributed",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "totalDividendsWithdrawn",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "totalSupply",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "transfer",
    constant: true,
    stateMutability: "pure",
    payable: false,
    inputs: [{ type: "address" }, { type: "uint256" }],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "transferFrom",
    constant: true,
    stateMutability: "pure",
    payable: false,
    inputs: [{ type: "address" }, { type: "address" }, { type: "uint256" }],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "transferOwnership",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "newOwner" }],
    outputs: [],
  },
  {
    type: "function",
    name: "unlock",
    constant: false,
    payable: false,
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "updateBalance",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "account" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateBondDepoWalletAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newBondDepoWalletAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateBondDepositoryAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newBondDepositoryAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateDividendTrackerAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newDividendTrackerAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateLiquidityWalletAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newLiquidityWalletAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateMainContractAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newMainTokenAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateMarketingWalletAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newMarketingWalletAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updatePriceFetcherAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newPriceFetcherAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateSecondServiceContractAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newSecondServiceContractAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateSecondServiceWalletAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newSecondServiceWalletAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateTaxManagerAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newTaxManagerAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateThirdServiceWalletAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newThirdServiceWalletAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateTreasuryContractAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newTreasuryContractAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateTreasuryWalletAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newTreasuryWalletAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateUSDCAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newUSDCAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateUniswapFactoryAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newUniswapFactoryAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateUniswapPairAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newUniswapPairAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateUniswapRouterAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newUniswapRouterAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updateWETHAddress",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newWETHAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "updatemetricsTracker",
    constant: false,
    payable: false,
    inputs: [{ type: "address", name: "_newmetricsTrackerAddress" }],
    outputs: [],
  },
  {
    type: "function",
    name: "withdrawableDividendOf",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address", name: "account" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "withdrawnDividendOf",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address", name: "account" }],
    outputs: [{ type: "uint256" }],
  },
];
