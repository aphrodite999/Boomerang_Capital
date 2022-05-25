import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Sidebar from "./sub-components/Sidebar";
import { RiLoader5Line } from "react-icons/ri";
import { TestCapTaxManagerAbi } from "./../contract/testCapTaxManagerAbi";
import { PriceFetcherAbi } from "./../contract/priceFetcherAbi";
import {
  TestCapTaxManagerAddress,
  PriceFetcherAddress,
} from "./../contract/addresses";

function TaxesAndZones({ user, signer, network, onConnectWallet }) {
  // ------------------------------------------------------------------------- contract
  let testCapTaxManager, priceFetcher;
  if (signer) {
    testCapTaxManager = new ethers.Contract(
      TestCapTaxManagerAddress,
      TestCapTaxManagerAbi,
      signer
    );
    priceFetcher = new ethers.Contract(
      PriceFetcherAddress,
      PriceFetcherAbi,
      signer
    );
  }
  // ------------------------------------------------------------------------- loader
  const [loader, setLoader] = useState({ state: true, count: 0 });
  // useState -----------------------------------------------------------------------------------------------
  const [testCapTaxManagerDetails, setTestCapTaxManagerDetails] = useState({
    totalBuyFeeBPS: "",
    currentDividendFeeShareBPS: "",
    currentTreasuryFeeShareBPS: "",
    currentLiquidityFeeShareBPS: "",
    currentMarketingFeeShareBPS: "",
    totalSellFeeBPS: "",
    currentZone: "loading...",
  });
  const [priceFetcherDetails, setPriceFetcherDetails] = useState({
    WETHPriceInUSDC: "Loading...",
  });
  // Fetch PriceFetcherDetails ------------------------------------------------------------------------------
  const fetchPriceFetcherDetails = async () => {
    let WETHPriceInUSDC = await priceFetcher
      .getWETHPriceInUSDC18Dec()
      .then((responce) => {
        return parseInt(responce._hex, 16) / 1e18;
      });
    setPriceFetcherDetails({ WETHPriceInUSDC: WETHPriceInUSDC });
  };
  // Fetch TestCapTaxManager Contract Details ---------------------------------------------------------------
  const fetchTestCapTaxManagerDetails = async () => {
    try {
      const totalBuyFeeBPS = await testCapTaxManager.getCurrentTotalBuyFeeBPS();
      const currentDividendFeeShareBPS =
        await testCapTaxManager.getCurrentDividendFeeShareBPS();
      const currentTreasuryFeeShareBPS =
        await testCapTaxManager.getCurrentTreasuryFeeShareBPS();
      const currentLiquidityFeeShareBPS =
        await testCapTaxManager.getCurrentLiquidityFeeShareBPS();
      const currentMarketingFeeShareBPS =
        await testCapTaxManager.getCurrentMarketingFeeShareBPS();
      const totalSellFeeBPS =
        await testCapTaxManager.getCurrentTotalSellFeeBPS();
      const currentZone = await testCapTaxManager
        .getCurrentZone()
        .then((res) => {
          if (res === 1) return "Buy Zone 2";
          if (res === 2) return "Buy Zone 1";
          if (res === 3) return "Fair Zone";
          if (res === 4) return "Sell Zone 1";
          if (res === 5) return "Sell Zone 2";
        }); //-------------------------------------- error [function not exist]
      const currentZoneBottomPrice =
        await testCapTaxManager.getCurrentZoneBottomPrice();
      const currentZoneTopPrice =
        await testCapTaxManager.getCurrentZoneTopPrice();
      // setState -----------------------------------------------
      setTestCapTaxManagerDetails({
        totalBuyFeeBPS: parseInt(totalBuyFeeBPS._hex, 16),
        currentDividendFeeShareBPS: parseInt(
          currentDividendFeeShareBPS._hex,
          16
        ),
        currentTreasuryFeeShareBPS: parseInt(
          currentTreasuryFeeShareBPS._hex,
          16
        ),
        currentLiquidityFeeShareBPS: parseInt(
          currentLiquidityFeeShareBPS._hex,
          16
        ),
        currentMarketingFeeShareBPS: parseInt(
          currentMarketingFeeShareBPS._hex,
          16
        ),
        totalSellFeeBPS: parseInt(totalSellFeeBPS._hex, 16),
        currentZone: currentZone,
        currentZoneBottomPrice: parseInt(currentZoneBottomPrice._hex, 16),
        currentZoneTopPrice: parseInt(currentZoneTopPrice._hex, 16),
        // currentZone: "error",
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  const [testCTMTableDetails, setTestCTMTableDetails] = useState({
    buyZone1LowerBand: "",
    buyZone1HigherBand: "",
    buyZone1BuyTax: "",
    buyZone1BuyHolder: "",
    buyZone1BuyTreasury: "",
    buyZone1BuyLiquidity: "",
    buyZone1BuyMarketing: "",
    buyZone1SellTax: "",
    buyZone1SellHolder: "",
    buyZone1SellTreasury: "",
    buyZone1SellLiquidity: "",
    buyZone1SellMarketing: "",
    // ----------------------
    buyZone2HigherBand: "",
    buyZone2BuyTax: "",
    buyZone2BuyHolder: "",
    buyZone2BuyTreasury: "",
    buyZone2BuyLiquidity: "",
    buyZone2BuyMarketing: "",
    buyZone2SellTax: "",
    buyZone2SellHolder: "",
    buyZone2SellTreasury: "",
    buyZone2SellLiquidity: "",
    buyZone2SellMarketing: "",
    // ----------------------
    fairZoneHigherBand: "",
    fairZoneBuyTax: "",
    fairZoneBuyHolder: "",
    fairZoneBuyTreasury: "",
    fairZoneBuyLiquidity: "",
    fairZoneBuyMarketing: "",
    fairZoneSellTax: "",
    fairZoneSellHolder: "",
    fairZoneSellTreasury: "",
    fairZoneSellLiquidity: "",
    fairZoneSellMarketing: "",
    // ----------------------
    sellZone1LowerBand: "",
    sellZone1HigherBand: "",
    sellZone1BuyTax: "",
    sellZone1BuyHolder: "",
    sellZone1BuyTreasury: "",
    sellZone1BuyLiquidity: "",
    sellZone1BuyMarketing: "",
    sellZone1SellTax: "",
    sellZone1SellHolder: "",
    sellZone1SellTreasury: "",
    sellZone1SellLiquidity: "",
    sellZone1SellMarketing: "",
    // ----------------------
    sellZone2HigherBand: "",
    sellZone2BuyTax: "",
    sellZone2BuyHolder: "",
    sellZone2BuyTreasury: "",
    sellZone2BuyLiquidity: "",
    sellZone2BuyMarketing: "",
    sellZone2SellTax: "",
    sellZone2SellHolder: "",
    sellZone2SellTreasury: "",
    sellZone2SellLiquidity: "",
    sellZone2SellMarketing: "",
  });
  // Fetch TestCapTaxManager Contract Details ---------------------------------------------------------------
  const fetchTestCapTaxManagerTableDetails = async () => {
    try {
      // -----------------------------------------
      // Buy Zone 1 ------------------------------
      // -----------------------------------------
      const buyZone2HigherBand = await testCapTaxManager
        .getCurrentBuyZone2TopPrice()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16) / 1e18;
        });

      const buyZone1BuyTax = await testCapTaxManager
        .getBuyZone1TotalBuyFeeBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        });
      const buyZone1BuyHolder = await testCapTaxManager
        .getBuyZone1TreasuryFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        });
      const buyZone1BuyTreasury = await testCapTaxManager
        .getBuyZone1DividendFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        });
      const buyZone1BuyLiquidity = await testCapTaxManager
        .getBuyZone1LiquidityFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        });
      const buyZone1BuyMarketing = await testCapTaxManager
        .getBuyZone1MarketingFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        });
      const buyZone1SellTax = await testCapTaxManager
        .getBuyZone1TotalSellFeeBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        });
      const buyZone1SellHolder = await testCapTaxManager
        .getSellZone1TreasuryFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        });
      const buyZone1SellTreasury = await testCapTaxManager
        .getSellZone1DividendFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        });
      const buyZone1SellLiquidity = await testCapTaxManager
        .getSellZone1LiquidityFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        });
      const buyZone1SellMarketing = await testCapTaxManager
        .getSellZone1MarketingFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        });
      // Buy Zone 2 ------------------------------
      const buyZone1HigherBand = await testCapTaxManager
        .getCurrentBuyZone1TopPrice()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16) / 1e18;
        });
      const buyZone2BuyTax = await testCapTaxManager
        .getBuyZone2TotalBuyFeeBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        });
      const buyZone2BuyHolder = await testCapTaxManager
        .getBuyZone2TreasuryFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        });
      const buyZone2BuyTreasury = await testCapTaxManager
        .getBuyZone2DividendFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        });
      const buyZone2BuyLiquidity = await testCapTaxManager
        .getBuyZone2LiquidityFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        });
      const buyZone2BuyMarketing = await testCapTaxManager
        .getBuyZone2MarketingFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        });
      const buyZone2SellTax = await testCapTaxManager
        .getBuyZone2TotalSellFeeBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        });
      const buyZone2SellHolder = await testCapTaxManager
        .getSellZone2TreasuryFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        });
      const buyZone2SellTreasury = await testCapTaxManager
        .getSellZone2DividendFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        });
      const buyZone2SellLiquidity = await testCapTaxManager
        .getSellZone2LiquidityFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        });
      const buyZone2SellMarketing = await testCapTaxManager
        .getSellZone2MarketingFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        });
      // ----------------------------------------\
      // Fair Zone -------------------------------|
      // ----------------------------------------/
      const fairZoneHigherBand = await testCapTaxManager
        .getCurrentSellZone1BottomPrice()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16) / 1e18;
        }); // 1
      const fairZoneBuyTax = await testCapTaxManager
        .getFairZoneTotalBuyFeeBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        }); // Buy 1

      const fairZoneBuyHolder = await testCapTaxManager
        .getFairZoneTreasuryFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        }); // Buy 2
      const fairZoneBuyTreasury = await testCapTaxManager
        .getFairZoneDividendFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        }); // Buy 3
      const fairZoneBuyLiquidity = await testCapTaxManager
        .getFairZoneLiquidityFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        }); // Buy 4
      const fairZoneBuyMarketing = await testCapTaxManager
        .getFairZoneMarketingFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        }); // Buy 5

      const fairZoneSellTax = await testCapTaxManager
        .getFairZoneTotalSellFeeBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        }); // Sell 1
      const fairZoneSellHolder = await testCapTaxManager
        .getFairZoneTreasuryFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        }); // Sell 2
      const fairZoneSellTreasury = await testCapTaxManager
        .getFairZoneDividendFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        }); // Sell 3
      const fairZoneSellLiquidity = await testCapTaxManager
        .getFairZoneLiquidityFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        }); // Sell 4
      const fairZoneSellMarketing = await testCapTaxManager
        .getFairZoneMarketingFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));

          return parseInt(res._hex, 16);
        }); // Sell 5
      // ------------------------------------------
      // Sell Zone 1 ------------------------------
      // ------------------------------------------
      const sellZone1HigherBand = await testCapTaxManager
        .getCurrentSellZone2BottomPrice()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16) / 1e18;
        }); // 2
      const sellZone1BuyTax = await testCapTaxManager
        .getSellZone1TotalBuyFeeBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        }); // Buy 1

      const sellZone1BuyHolder = await testCapTaxManager
        .getSellZone1TreasuryFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        }); // Buy 2
      const sellZone1BuyTreasury = await testCapTaxManager
        .getSellZone1DividendFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        }); // Buy 3
      const sellZone1BuyLiquidity = await testCapTaxManager
        .getSellZone1LiquidityFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        }); // Buy 4
      const sellZone1BuyMarketing = await testCapTaxManager
        .getSellZone1MarketingFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        }); // Buy 5

      const sellZone1SellTax = await testCapTaxManager
        .getSellZone1TotalSellFeeBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        }); // Sell 1
      const sellZone1SellHolder = await testCapTaxManager
        .getSellZone1TreasuryFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        }); // Sell 2
      const sellZone1SellTreasury = await testCapTaxManager
        .getSellZone1DividendFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        }); // Sell 3
      const sellZone1SellLiquidity = await testCapTaxManager
        .getSellZone1LiquidityFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        }); // Sell 4
      const sellZone1SellMarketing = await testCapTaxManager
        .getSellZone1MarketingFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        }); // Sell 5
      // -------------------------------------------
      //  Sell Zone 2 ------------------------------
      // -------------------------------------------
      const sellZone2BuyTax = await testCapTaxManager
        .getSellZone2TotalBuyFeeBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        }); // Buy 1

      const sellZone2BuyHolder = await testCapTaxManager
        .getSellZone2TreasuryFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        }); // Buy 2
      const sellZone2BuyTreasury = await testCapTaxManager
        .getSellZone2DividendFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 2 }));
          return parseInt(res._hex, 16);
        }); // Buy 3
      const sellZone2BuyLiquidity = await testCapTaxManager
        .getSellZone2LiquidityFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 1 }));
          return parseInt(res._hex, 16);
        }); // Buy 4
      const sellZone2BuyMarketing = await testCapTaxManager
        .getSellZone2MarketingFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 1 }));

          return parseInt(res._hex, 16);
        }); // Buy 5

      const sellZone2SellTax = await testCapTaxManager
        .getSellZone2TotalSellFeeBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 1 }));

          return parseInt(res._hex, 16);
        }); // Sell 1
      const sellZone2SellHolder = await testCapTaxManager
        .getSellZone2TreasuryFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 1 }));

          return parseInt(res._hex, 16);
        }); // Sell 2
      const sellZone2SellTreasury = await testCapTaxManager
        .getSellZone2DividendFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 1 }));

          return parseInt(res._hex, 16);
        }); // Sell 3
      const sellZone2SellLiquidity = await testCapTaxManager
        .getSellZone2LiquidityFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 1 }));
          return parseInt(res._hex, 16);
        }); // Sell 4
      const sellZone2SellMarketing = await testCapTaxManager
        .getSellZone2MarketingFeeShareBPS()
        .then((res) => {
          setLoader((loader) => ({ state: true, count: loader.count + 1 }));
          return parseInt(res._hex, 16);
        }); // Sell 5
      setLoader({ state: false, count: 0 });
      // useState ------------------------
      setTestCTMTableDetails({
        buyZone1LowerBand: priceFormater(
          buyZone1HigherBand * priceFetcherDetails.WETHPriceInUSDC,
          "USDC"
        ),

        buyZone1HigherBand: priceFormater(
          buyZone2HigherBand * priceFetcherDetails.WETHPriceInUSDC,
          "USDC"
        ),
        buyZone1BuyTax: priceFormater(buyZone1BuyTax / 100, "%"),
        buyZone1BuyHolder: priceFormater(
          (buyZone1BuyHolder * buyZone1BuyTax) / 1000000,
          "%"
        ),
        buyZone1BuyTreasury: priceFormater(
          (buyZone1BuyTreasury * buyZone1BuyTax) / 1000000,
          "%"
        ),
        buyZone1BuyLiquidity: priceFormater(
          (buyZone1BuyLiquidity * buyZone1BuyTax) / 1000000,
          "%"
        ),
        buyZone1BuyMarketing: priceFormater(
          (buyZone1BuyMarketing * buyZone1BuyTax) / 1000000,
          "%"
        ),
        buyZone1SellTax: priceFormater(buyZone1SellTax / 100, "%"),
        buyZone1SellHolder: priceFormater(
          (buyZone1SellHolder * buyZone1SellTax) / 1000000,
          "%"
        ),
        buyZone1SellTreasury: priceFormater(
          (buyZone1SellTreasury * buyZone1SellTax) / 1000000,
          "%"
        ),
        buyZone1SellLiquidity: priceFormater(
          (buyZone1SellLiquidity * buyZone1SellTax) / 1000000,
          "%"
        ),
        buyZone1SellMarketing: priceFormater(
          (buyZone1SellMarketing * buyZone1SellTax) / 1000000,
          "%"
        ),
        // Zone 2 ------------------------------
        buyZone2HigherBand: priceFormater(
          buyZone1HigherBand * priceFetcherDetails.WETHPriceInUSDC,
          "USDC"
        ),
        buyZone2BuyTax: priceFormater(buyZone2BuyTax / 100, "%"),
        buyZone2BuyHolder: priceFormater(
          (buyZone2BuyHolder * buyZone2BuyTax) / 1000000,
          "%"
        ),
        buyZone2BuyTreasury: priceFormater(
          (buyZone2BuyTreasury * buyZone2BuyTax) / 1000000,
          "%"
        ),
        buyZone2BuyLiquidity: priceFormater(
          (buyZone2BuyLiquidity * buyZone2BuyTax) / 1000000,
          "%"
        ),
        buyZone2BuyMarketing: priceFormater(
          (buyZone2BuyMarketing * buyZone2BuyTax) / 1000000,
          "%"
        ),
        buyZone2SellTax: priceFormater(buyZone2SellTax / 100, "%"),
        buyZone2SellHolder: priceFormater(
          (buyZone2SellHolder * buyZone2SellTax) / 1000000,
          "%"
        ),
        buyZone2SellTreasury: priceFormater(
          (buyZone2SellTreasury * buyZone2SellTax) / 1000000,
          "%"
        ),
        buyZone2SellLiquidity: priceFormater(
          (buyZone2SellLiquidity * buyZone2SellTax) / 1000000,
          "%"
        ),
        buyZone2SellMarketing: priceFormater(
          (buyZone2SellMarketing * buyZone2SellTax) / 1000000,
          "%"
        ),
        // Fair Zone ------------------------
        fairZoneHigherBand: priceFormater(
          fairZoneHigherBand * priceFetcherDetails.WETHPriceInUSDC,
          "USDC"
        ),
        fairZoneBuyTax: priceFormater(fairZoneBuyTax / 100, "%"),
        fairZoneBuyHolder: priceFormater(
          (fairZoneBuyHolder * fairZoneBuyTax) / 1000000,
          "%"
        ),
        fairZoneBuyTreasury: priceFormater(
          (fairZoneBuyTreasury * fairZoneBuyTax) / 1000000,
          "%"
        ),
        fairZoneBuyLiquidity: priceFormater(
          (fairZoneBuyLiquidity * fairZoneBuyTax) / 1000000,
          "%"
        ),
        fairZoneBuyMarketing: priceFormater(
          (fairZoneBuyMarketing * fairZoneBuyTax) / 1000000,
          "%"
        ),
        fairZoneSellTax: priceFormater(fairZoneSellTax / 100, "%"),
        fairZoneSellHolder: priceFormater(
          (fairZoneSellHolder * fairZoneSellTax) / 1000000,
          "%"
        ),
        fairZoneSellTreasury: priceFormater(
          (fairZoneSellTreasury * fairZoneSellTax) / 1000000,
          "%"
        ),
        fairZoneSellLiquidity: priceFormater(
          (fairZoneSellLiquidity * fairZoneSellTax) / 1000000,
          "%"
        ),
        fairZoneSellMarketing: priceFormater(
          (fairZoneSellMarketing * fairZoneSellTax) / 1000000,
          "%"
        ),
        // Sell Zone 1 ----------------------------------
        sellZone1HigherBand: priceFormater(
          sellZone1HigherBand * priceFetcherDetails.WETHPriceInUSDC,
          "USDC"
        ),
        sellZone1BuyTax: priceFormater(sellZone1BuyTax / 100, "%"),
        sellZone1BuyHolder: priceFormater(
          (sellZone1BuyHolder * sellZone1BuyTax) / 1000000,
          "%"
        ),
        sellZone1BuyTreasury: priceFormater(
          (sellZone1BuyTreasury * sellZone1BuyTax) / 1000000,
          "%"
        ),
        sellZone1BuyLiquidity: priceFormater(
          (sellZone1BuyLiquidity * sellZone1BuyTax) / 1000000,
          "%"
        ),
        sellZone1BuyMarketing: priceFormater(
          (sellZone1BuyMarketing * sellZone1BuyTax) / 1000000,
          "%"
        ),
        sellZone1SellTax: priceFormater(sellZone1SellTax / 100, "%"),
        sellZone1SellHolder: priceFormater(
          (sellZone1SellHolder * sellZone1SellTax) / 1000000,
          "%"
        ),
        sellZone1SellTreasury: priceFormater(
          (sellZone1SellTreasury * sellZone1SellTax) / 1000000,
          "%"
        ),
        sellZone1SellLiquidity: priceFormater(
          (sellZone1SellLiquidity * sellZone1SellTax) / 1000000,
          "%"
        ),
        sellZone1SellMarketing: priceFormater(
          (sellZone1SellMarketing * sellZone1SellTax) / 1000000,
          "%"
        ),
        // Sell Zone 2 ----------------------------------
        sellZone2HigherBand: "∞",
        sellZone2BuyTax: priceFormater(sellZone2BuyTax / 100, "%"),
        sellZone2BuyHolder: priceFormater(
          (sellZone2BuyHolder * sellZone2BuyTax) / 1000000,
          "%"
        ),
        sellZone2BuyTreasury: priceFormater(
          (sellZone2BuyTreasury * sellZone2BuyTax) / 1000000,
          "%"
        ),
        sellZone2BuyLiquidity: priceFormater(
          (sellZone2BuyLiquidity * sellZone2BuyTax) / 1000000,
          "%"
        ),
        sellZone2BuyMarketing: priceFormater(
          (sellZone2BuyMarketing * sellZone2BuyTax) / 1000000,
          "%"
        ),
        sellZone2SellTax: priceFormater(sellZone2SellTax / 100, "%"),
        sellZone2SellHolder: priceFormater(
          (sellZone2SellHolder * sellZone2SellTax) / 1000000,
          "%"
        ),
        sellZone2SellTreasury: priceFormater(
          (sellZone2SellTreasury * sellZone2SellTax) / 1000000,
          "%"
        ),
        sellZone2SellLiquidity: priceFormater(
          (sellZone2SellLiquidity * sellZone2SellTax) / 1000000,
          "%"
        ),
        sellZone2SellMarketing: priceFormater(
          (sellZone2SellMarketing * sellZone2SellTax) / 1000000,
          "%"
        ),
      });
    } catch (error) {
      console.log("Error", error.message);
    }
    setLoader((loader) => ({ state: false, count: 0 }));
  };
  // useEffect ----------------------------------------------------------------------------------------------
  const [signerState, updateSignerState] = React.useState(false); // useEffect cause rander twice so I use this technique to handle it
  React.useEffect(() => {
    if (signer) {
      fetchPriceFetcherDetails();
      if (
        !signerState &&
        priceFetcherDetails.WETHPriceInUSDC !== "Loading..."
      ) {
        updateSignerState(true);
        fetchTestCapTaxManagerDetails();
        fetchTestCapTaxManagerTableDetails();
      }
    }
  }, [signer, priceFetcherDetails.WETHPriceInUSDC]);

  // Formator <<<-------------------------------------------------------------------
  const decimalFormator = (number) => {
    if (number === 0) {
      return 0;
    } else if (number >= 1000) {
      return number.toFixed(0);
    } else if (number >= 1 && number < 1000) {
      return number.toFixed(2);
    } else if (number >= 0.1 && number < 1) {
      return number.toFixed(3);
    } else if (number >= 0.01 && number < 0.1) {
      return number.toFixed(4);
    } else if (number >= 0.001 && number < 0.01) {
      return number.toFixed(5);
    } else if (number >= 0.0001 && number < 0.001) {
      return number.toFixed(6);
    } else if (number >= 0.00001 && number < 0.0001) {
      return number.toFixed(7);
    } else if (number >= 0.000001 && number < 0.00001) {
      return number.toFixed(8);
    } else return number;
  };

  const priceFormater = (number, unit) => {
    let _number = decimalFormator(number);
    return _number === "Loading..."
      ? "Loading..."
      : unit === ""
      ? _number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      : _number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
        " " +
        unit;
  };
  // Formator ---------------------------------------------------------------------->>>
  // Data ---------------------------------------------------------------------------------------------------
  const taxesAndZones = {
    totalBuyTax: testCapTaxManagerDetails.totalBuyFeeBPS
      ? (testCapTaxManagerDetails.totalBuyFeeBPS / 100).toString().concat("%")
      : " Loading...",
    totalSellTax: testCapTaxManagerDetails.totalBuyFeeBPS
      ? (testCapTaxManagerDetails.totalSellFeeBPS / 100).toString().concat("%")
      : " Loading...",
    currentZone: testCapTaxManagerDetails.currentZone,
    buyTaxes: [
      {
        title: "Holder reflections",
        value: testCapTaxManagerDetails.totalBuyFeeBPS
          ? (
              (testCapTaxManagerDetails.totalBuyFeeBPS *
                testCapTaxManagerDetails.currentDividendFeeShareBPS) /
              1000000
            )
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              .concat("%")
          : "Loading...",
        button: "",
      },
      {
        title: "Treasury Tax",
        value: testCapTaxManagerDetails.totalBuyFeeBPS
          ? (
              (testCapTaxManagerDetails.totalBuyFeeBPS *
                testCapTaxManagerDetails.currentTreasuryFeeShareBPS) /
              1000000
            )
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              .concat("%")
          : "Loading...",
        button: "",
      },
      {
        title: "Liquidity Tax",
        value: testCapTaxManagerDetails.totalBuyFeeBPS
          ? (
              (testCapTaxManagerDetails.totalBuyFeeBPS *
                testCapTaxManagerDetails.currentLiquidityFeeShareBPS) /
              1000000
            )
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              .concat("%")
          : "Loading...",
        button: "",
      },
      {
        title: "Marketing Tax",
        value: testCapTaxManagerDetails.totalBuyFeeBPS
          ? (
              (testCapTaxManagerDetails.totalBuyFeeBPS *
                testCapTaxManagerDetails.currentMarketingFeeShareBPS) /
              1000000
            )
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              .concat("%")
          : "Loading...",
        button: "",
      },
    ],
    sellTaxes: [
      {
        title: "Holder reflections",
        value: testCapTaxManagerDetails.totalBuyFeeBPS
          ? (
              (testCapTaxManagerDetails.totalSellFeeBPS *
                testCapTaxManagerDetails.currentDividendFeeShareBPS) /
              1000000
            )
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              .concat("%")
          : "Loading...",
        button: "",
      },
      {
        title: "Treasury Tax",
        value: testCapTaxManagerDetails.totalSellFeeBPS
          ? (
              (testCapTaxManagerDetails.totalSellFeeBPS *
                testCapTaxManagerDetails.currentTreasuryFeeShareBPS) /
              1000000
            )
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              .concat("%")
          : "Loading...",
        button: "",
      },
      {
        title: "Liquidity Tax",
        value: testCapTaxManagerDetails.totalSellFeeBPS
          ? (
              (testCapTaxManagerDetails.totalSellFeeBPS *
                testCapTaxManagerDetails.currentLiquidityFeeShareBPS) /
              1000000
            )
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              .concat("%")
          : "Loading...",
        button: "",
      },
      {
        title: "Marketing Tax",
        value: testCapTaxManagerDetails.totalSellFeeBPS
          ? (
              (testCapTaxManagerDetails.totalSellFeeBPS *
                testCapTaxManagerDetails.currentMarketingFeeShareBPS) /
              1000000
            )
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              .concat("%")
          : "Loading...",
        button: "",
      },
    ],
    currentZones: [
      {
        title: "Lower Bond",
        value: testCapTaxManagerDetails.currentZoneTopPrice
          ? (
              (testCapTaxManagerDetails.currentZoneBottomPrice / 1e18) *
              priceFetcherDetails.WETHPriceInUSDC
            )
              .toFixed(2)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              .concat(" USDC")
          : "Loading...",
        button: "",
      },
      {
        title: "Upper Bond",
        value: testCapTaxManagerDetails.currentZoneTopPrice
          ? (
              (testCapTaxManagerDetails.currentZoneTopPrice / 1e18) *
              priceFetcherDetails.WETHPriceInUSDC
            )
              .toFixed(2)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              .concat(" USDC")
          : "Loading...",
        button: "",
      },
    ],
  };
  const wallets = [
    {
      title: "Lower band",
      buyZoneTwo: "0 USDC",
      buyZoneOne: testCTMTableDetails.buyZone1LowerBand,
      fair: testCTMTableDetails.buyZone1HigherBand,
      sellZoneOne: testCTMTableDetails.fairZoneHigherBand,
      sellZoneTwo: testCTMTableDetails.sellZone1HigherBand,
    },
    {
      title: "Upper band",
      buyZoneTwo: testCTMTableDetails.buyZone2HigherBand,
      buyZoneOne: testCTMTableDetails.buyZone1HigherBand,
      fair: testCTMTableDetails.fairZoneHigherBand,
      sellZoneOne: testCTMTableDetails.sellZone1HigherBand,
      sellZoneTwo: "∞",
    },
    {
      title: "Buy Tax Total",
      buyZoneTwo: testCTMTableDetails.buyZone2BuyTax,
      buyZoneOne: testCTMTableDetails.buyZone1BuyTax,
      fair: testCTMTableDetails.fairZoneBuyTax,
      sellZoneOne: testCTMTableDetails.sellZone1BuyTax,
      sellZoneTwo: testCTMTableDetails.sellZone2BuyTax,
    },
    {
      title: "Buy Holder reflections",
      buyZoneTwo: testCTMTableDetails.buyZone2BuyTreasury,
      buyZoneOne: testCTMTableDetails.buyZone1BuyTreasury,
      fair: testCTMTableDetails.fairZoneBuyTreasury,
      sellZoneOne: testCTMTableDetails.sellZone1BuyTreasury,
      sellZoneTwo: testCTMTableDetails.sellZone2BuyTreasury,
    },
    {
      title: "Buy Treasury Tax",
      buyZoneTwo: testCTMTableDetails.buyZone2BuyHolder,
      buyZoneOne: testCTMTableDetails.buyZone1BuyHolder,
      fair: testCTMTableDetails.fairZoneBuyHolder,
      sellZoneOne: testCTMTableDetails.sellZone1BuyHolder,
      sellZoneTwo: testCTMTableDetails.sellZone2BuyHolder,
    },
    {
      title: "Buy Liquidity Tax",
      buyZoneTwo: testCTMTableDetails.buyZone2BuyLiquidity,
      buyZoneOne: testCTMTableDetails.buyZone1BuyLiquidity,
      fair: testCTMTableDetails.fairZoneBuyLiquidity,
      sellZoneOne: testCTMTableDetails.sellZone1BuyLiquidity,
      sellZoneTwo: testCTMTableDetails.sellZone2BuyLiquidity,
    },
    {
      title: "Buy Marketing Tax",
      buyZoneTwo: testCTMTableDetails.buyZone2BuyMarketing,
      buyZoneOne: testCTMTableDetails.buyZone1BuyMarketing,
      fair: testCTMTableDetails.fairZoneBuyMarketing,
      sellZoneOne: testCTMTableDetails.sellZone1BuyMarketing,
      sellZoneTwo: testCTMTableDetails.sellZone2BuyMarketing,
    },
    {
      title: "Sell Tax Total",
      buyZoneTwo: testCTMTableDetails.buyZone2SellTax,
      buyZoneOne: testCTMTableDetails.buyZone1SellTax,
      fair: testCTMTableDetails.fairZoneSellTax,
      sellZoneOne: testCTMTableDetails.sellZone1SellTax,
      sellZoneTwo: testCTMTableDetails.sellZone2SellTax,
    },
    {
      title: "Sell Holder reflections",
      buyZoneTwo: testCTMTableDetails.buyZone2SellTreasury,
      buyZoneOne: testCTMTableDetails.buyZone1SellTreasury,
      fair: testCTMTableDetails.fairZoneSellTreasury,
      sellZoneOne: testCTMTableDetails.sellZone1SellTreasury,
      sellZoneTwo: testCTMTableDetails.sellZone2SellTreasury,
    },
    {
      title: "Sell Treasury Tax",
      buyZoneTwo: testCTMTableDetails.buyZone2SellHolder,
      buyZoneOne: testCTMTableDetails.buyZone1SellHolder,
      fair: testCTMTableDetails.fairZoneSellHolder,
      sellZoneOne: testCTMTableDetails.sellZone1SellTax,
      sellZoneTwo: testCTMTableDetails.sellZone2SellTax,
    },
    {
      title: " Sell Liquidity Tax",
      buyZoneTwo: testCTMTableDetails.buyZone2SellLiquidity,
      buyZoneOne: testCTMTableDetails.buyZone1SellLiquidity,
      fair: testCTMTableDetails.fairZoneSellLiquidity,
      sellZoneOne: testCTMTableDetails.sellZone1SellLiquidity,
      sellZoneTwo: testCTMTableDetails.sellZone2SellLiquidity,
    },
    {
      title: "Sell Marketing Tax",
      buyZoneTwo: testCTMTableDetails.buyZone2SellMarketing,
      buyZoneOne: testCTMTableDetails.buyZone1SellMarketing,
      fair: testCTMTableDetails.fairZoneSellMarketing,
      sellZoneOne: testCTMTableDetails.sellZone1SellMarketing,
      sellZoneTwo: testCTMTableDetails.sellZone2SellMarketing,
    },
  ];

  return (
    <React.Fragment>
      <Sidebar
        user={user}
        onConnectWallet={onConnectWallet}
        network={network}
      />
      <div className="px-3 md:px-8">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 mb-4 mt-12">
            {/* main-card-1 */}
            <div className="flex justify-center">
              <div className="p-5 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                <div className="h-auto">
                  {/* main header div */}
                  <div className="-mt-12 mb-5 flex-1 text-gray-700">
                    <span className="text-xs block py-4 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between ">
                        <h2 className="text-2xl font-bold">
                          Current Buy Taxes
                        </h2>
                        <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                          <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                        </div>
                      </div>
                      {/* sub heading */}
                      <h6 className="text-xl font-bold text-gray-700 mb-2">
                        Total Buy Taxes: {taxesAndZones.totalBuyTax}
                      </h6>
                    </span>
                  </div>
                  {/* cards */}
                  {taxesAndZones.buyTaxes.map((status, index) => (
                    <div
                      key={index}
                      className="text-xs block py-2 px-4 mb-2 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-gray-700 hover:text-gray-900 rounded-lg shadow hover:shadow-md transition duration-300"
                    >
                      <div className="flex items-center justify-between text-base font-bold ">
                        <h6 className="py-2">
                          {status.title}
                          {": "}
                          <span className="font-normal">
                            {status.value ? status.value : "loading..."}
                          </span>
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* main-card-2 */}
            <div className="flex justify-center">
              <div className="p-5 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                <div className="h-auto">
                  {/* main header div */}
                  <div className="-mt-12 mb-5 flex-1 text-gray-700">
                    <span className="text-xs block py-4 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between ">
                        <h2 className="text-2xl font-bold">
                          Current Sell Taxes
                        </h2>
                        <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                          <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                        </div>
                      </div>
                      {/* sub heading */}
                      <h6 className="text-xl font-bold text-gray-700 mb-2">
                        Total Sell Tax: {taxesAndZones.totalSellTax}
                      </h6>
                    </span>
                  </div>
                  {/* cards */}
                  {taxesAndZones.sellTaxes.map((status, index) => (
                    <div
                      key={index}
                      className="text-xs block py-2 px-4 mb-2 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-gray-700 hover:text-gray-900 rounded-lg shadow hover:shadow-md transition duration-300"
                    >
                      <div className="flex items-center justify-between text-base font-bold ">
                        <h6 className="py-2">
                          {status.title}
                          {": "}
                          <span className="font-normal">{status.value}</span>
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* main-card-3 */}
            <div className="flex justify-center">
              <div className="p-5 m-2 w-full bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
                <div className="h-auto">
                  {/* main header div */}
                  <div className="-mt-12 mb-5 flex-1 text-gray-700">
                    <span className="text-xs block py-4 px-4 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-lg shadow hover:shadow-md transition duration-300">
                      <div className="flex items-center justify-between ">
                        <h2 className="text-2xl font-bold">Current Zone</h2>
                        <div className="p-1 border-4 rounded-full cursor-pointer hover:border-green-200 hover:scale-105 transition transform duration-200">
                          <span className="block h-6 w-6 bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from rounded-full"></span>
                        </div>
                      </div>
                      {/* sub heading */}
                      <h6 className="text-xl font-bold text-gray-700 mb-2">
                        {taxesAndZones.currentZone}
                      </h6>
                    </span>
                  </div>
                  {/* cards */}
                  {taxesAndZones.currentZones.map((status, index) => (
                    <div
                      key={index}
                      className="text-xs block py-2 px-4 mb-2 bg-gradient-to-r from-[#1da0f221] to-[#35D0F221] hover:from-[#35D0F221] hover:to-[#1da0f221] border border-[#35cff270] text-gray-700 hover:text-gray-900 rounded-lg shadow hover:shadow-md transition duration-300"
                    >
                      <div className="flex items-center justify-between text-base font-bold ">
                        <h6 className="py-2">
                          {status.title}
                          {": "}
                          <span className="font-normal">{status.value}</span>
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="container mx-auto px-3 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Taxes</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px- sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead className="bg-gradient-to-r from-gradient_from to-gradient_to hover:from-gradient_to hover:to-gradient_from text-gray-100">
                  <tr>
                    <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider">
                      {" "}
                    </th>
                    <th className="px-5 py-3 border-b-2 text-center text-xs font-semibold uppercase tracking-wider">
                      Buy Zone 2
                    </th>
                    <th className="px-5 py-3 border-b-2 text-center text-xs font-semibold uppercase tracking-wider">
                      Buy Zone 1
                    </th>
                    <th className="px-5 py-3 border-b-2 text-center text-xs font-semibold uppercase tracking-wider">
                      Fair Zone
                    </th>
                    <th className="px-5 py-3 border-b-2 text-center text-xs font-semibold uppercase tracking-wider">
                      Sell Zone 1
                    </th>
                    <th className="px-5 py-3 border-b-2 text-center text-xs font-semibold uppercase tracking-wider">
                      Sell Zone 2
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 bg-white">
                  {loader.state && (
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="flex justify-end items-center relative p-16 mx-auto">
                          <RiLoader5Line className="w-40 h-40 animate-spin absolute" />
                          <span className="px-[2.7rem] flex-col justify-center items-center">
                            <p className=" text-center">
                              {loader.count}
                              {""}/100
                            </p>{" "}
                            <p>Loading...</p>
                          </span>
                        </div>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  )}

                  {!loader.state &&
                    wallets.map((wallet, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-5 py-5 border-b border-[#35cff270] bg-[#35cff221] text-sm">
                            <p className="whitespace-no-wrap">{wallet.title}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap text-center">
                              {wallet.buyZoneTwo}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap text-center">
                              {wallet.buyZoneOne}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap text-center">
                              {wallet.fair}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap text-center">
                              {wallet.sellZoneOne}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-[#35cff270] text-sm">
                            <p className="whitespace-no-wrap text-center">
                              {wallet.sellZoneTwo}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TaxesAndZones;
