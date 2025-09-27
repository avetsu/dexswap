<script>
import { getPrice } from '@/blockchain/functions';
import {
  approveTokens,
  decreaseLiquidity,
  getNFPMContract,
  getNFTData,
  getPoolContract,
  getTokenDecimals,
  increaseLiquidity,
  NFPM_ADDRESS,
  getToken,
} from '@/blockchain/pools';
import { trimDecimals } from '@/blockchain/functions';
import { ethers } from 'ethers';
import { TickMath, Position, Pool } from '@uniswap/v3-sdk';

export default {
  name: 'NFTPage',
  data() {
    return {
      tokenID: 0,
      NFTdata: null,
      NFT: {},
      nftImage: '',
      inputIncrease1: '',
      inputIncrease2: '',
      inputDecrease1: '',
      inputDecrease2: '',
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
      value: 0,
    };
  },
  async mounted() {
    this.tokenID = this.$route.query.nft || 0;
    console.log('tokenID from query:', this.tokenID);

    const rawNFT = await getNFTData(this.tokenID);
    this.NFTdata = rawNFT.data; // <-- store the data object
    console.log('NFT data:', this.NFTdata);

    if (rawNFT?.tokenUri) {
      // <-- fixed property name
      let uri = rawNFT.tokenUri;

      if (uri.startsWith('data:application/json;base64,')) {
        const base64Data = uri.replace('data:application/json;base64,', '');
        const jsonString = atob(base64Data);
        this.NFT = JSON.parse(jsonString);
      } else if (uri.startsWith('ipfs://')) {
        const gatewayURL = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
        const response = await fetch(gatewayURL);
        this.NFT = await response.json();
      } else {
        const response = await fetch(uri);
        this.NFT = await response.json();
      }

      if (this.NFT.image) {
        this.nftImage = this.NFT.image.startsWith('ipfs://')
          ? this.NFT.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
          : this.NFT.image;
      }
    }
  },
  methods: {
    handleSubmit() {
      this.field1 = this.input1;
      this.field2 = this.input2;
      this.field3 = `Combined: ${this.input1} ${this.input2}`;
      this.field4 = `Length1: ${this.input1.length}`;
      this.field5 = `Length2: ${this.input2.length}`;
    },

    async inputIncreaseA(e) {
      const pool = await getPoolContract(this.NFTdata[2], this.NFTdata[3], this.NFTdata[4]);
      const slot0 = await pool.slot0();
      const liquidityBN = await pool.liquidity();
      const dec1 = await getTokenDecimals(this.NFTdata[2]);
      const dec2 = await getTokenDecimals(this.NFTdata[3]);
      const sqrtPriceX96 = BigInt(slot0.sqrtPriceX96);
      let price = getPrice(sqrtPriceX96);
      console.log('sqrtPriceX96:', sqrtPriceX96);
      console.log('Current price token1/token0:', price);
      console.log(dec1, dec2);
      console.log('Current price:', this.inputIncrease1 * price * 10 ** (dec1 - dec2));
      this.inputIncrease2 = this.inputIncrease1 * price * 10 ** (dec1 - dec2);
    },
    async inputIncreaseB(e) {
      const pool = await getPoolContract(this.NFTdata[2], this.NFTdata[3], this.NFTdata[4]);
      const slot0 = await pool.slot0();
      const liquidityBN = await pool.liquidity();
      const dec1 = await getTokenDecimals(this.NFTdata[2]);
      const dec2 = await getTokenDecimals(this.NFTdata[3]);
      const sqrtPriceX96 = BigInt(slot0.sqrtPriceX96);
      let price = getPrice(sqrtPriceX96);
      console.log('sqrtPriceX96:', sqrtPriceX96);
      console.log('Current price token1/token0:', price);
      console.log(dec1, dec2);
      console.log('Current price:', this.inputIncrease2 / price / 10 ** (dec1 - dec2));
      this.inputIncrease1 = this.inputIncrease2 / price / 10 ** (dec1 - dec2);
    },
    async inputDecreaseA(e) {
      const pool = await getPoolContract(this.NFTdata[2], this.NFTdata[3], this.NFTdata[4]);
      const slot0 = await pool.slot0();
      const liquidityBN = await pool.liquidity();
      const dec1 = await getTokenDecimals(this.NFTdata[2]);
      const dec2 = await getTokenDecimals(this.NFTdata[3]);
      const sqrtPriceX96 = BigInt(slot0.sqrtPriceX96);
      let price = getPrice(sqrtPriceX96);
      console.log('sqrtPriceX96:', sqrtPriceX96);
      console.log('Current price token1/token0:', price);
      console.log(dec1, dec2);
      console.log('Current price:', this.inputDecrease1 * price * 10 ** (dec1 - dec2));
      this.inputDecrease2 = this.inputDecrease1 * price * 10 ** (dec1 - dec2);
    },
    async inputDecreaseB(e) {
      const pool = await getPoolContract(this.NFTdata[2], this.NFTdata[3], this.NFTdata[4]);
      const slot0 = await pool.slot0();
      const liquidityBN = await pool.liquidity();
      const dec1 = await getTokenDecimals(this.NFTdata[2]);
      const dec2 = await getTokenDecimals(this.NFTdata[3]);
      const sqrtPriceX96 = BigInt(slot0.sqrtPriceX96);
      let price = getPrice(sqrtPriceX96);
      console.log('sqrtPriceX96:', sqrtPriceX96);
      console.log('Current price token1/token0:', price);
      console.log(dec1, dec2);
      console.log('Current price:', this.inputDecrease2 / price / 10 ** (dec1 - dec2));
      this.inputDecrease1 = this.inputDecrease2 / price / 10 ** (dec1 - dec2);
    },
    async handleIncrease() {
      console.log('Increasing liquidity with:', this.inputIncrease1, this.inputIncrease2);
      const dec1 = await getTokenDecimals(this.NFTdata[2]);
      const dec2 = await getTokenDecimals(this.NFTdata[3]);
      await approveTokens(
        this.NFTdata[2],
        NFPM_ADDRESS,
        ethers.utils.parseUnits(trimDecimals(this.inputIncrease1, dec1).toString(), dec1),
      );
      await approveTokens(
        this.NFTdata[3],
        NFPM_ADDRESS,
        ethers.utils.parseUnits(trimDecimals(this.inputIncrease2, dec2).toString(), dec2),
      );
      await increaseLiquidity(
        this.tokenID,
        ethers.utils.parseUnits(trimDecimals(this.inputIncrease1, dec1).toString(), dec1),
        ethers.utils.parseUnits(trimDecimals(this.inputIncrease2, dec2).toString(), dec2),
        0n,
        0n,
        Math.floor(Date.now() / 1000) + 60 * 10,
        { gasLimit: 500000 },
      );
    },
    async handleDecrease() {
      console.log('Decreasing liquidity with:', this.inputDecrease1, this.inputDecrease2);
      const liquidity = await this.getLiquidityForAmounts(
        this.NFTdata[2],
        this.NFTdata[3],
        this.NFTdata[5],
        this.NFTdata[6],
        this.NFTdata[4],
        this.inputDecrease1,
        this.inputDecrease2,
      );
      console.log('Liquidity:', liquidity);
      //   await decreaseLiquidity(this.tokenID, 0n, 0n, 0n, Math.floor(Date.now() / 1000) + 60 * 10, {
      //     gasLimit: 500000,
      //   });
      // await decreaseLiquidity(
      //   210210,
      //   '37903703549', // string is safest
      //   0,
      //   0,
      //   Math.floor(Date.now() / 1000) + 60 * 10,
      //   { gasLimit: 500000 },
      // );e
    },
    async getLiquidityForAmounts() {
      const token0 = await getToken(this.NFTdata.token0);
      const token1 = await getToken(this.NFTdata.token1);

      console.log('Token0:', token0);
      console.log('Token1:', token1);

      const poolContract = await getPoolContract(this.NFTdata[2], this.NFTdata[3], this.NFTdata[4]);
      const tickSpacing = await poolContract.tickSpacing();
      const slot0 = await poolContract.slot0();
      console.log('Pool slot0:', slot0);

      const tickLower = Math.floor(this.NFTdata[6] / tickSpacing) * tickSpacing;
      const tickUpper = Math.floor(this.NFTdata[7] / tickSpacing) * tickSpacing;

      const pool = new Pool(
        token0,
        token1,
        this.NFTdata[4],
        slot0.sqrtPriceX96.toString(),
        slot0.tick,
      );

      const userPosition = new Position({
        pool: pool,
        liquidity: this.NFTdata.liquidity.toString(),
        tickLower: tickLower,
        tickUpper: tickUpper,
      });

      const amount0 = userPosition.amount0;
      const amount1 = userPosition.amount1;

      console.log('Token0 amount:', amount0.toSignificant(6));
      console.log('Token1 amount:', amount1.toSignificant(6));

      return {
        token0: amount0,
        token1: amount1,
      };
    },
    validate() {
      if (this.value < 0) this.value = 0;
      if (this.value > 100) this.value = 100;
    },
    async handleDecrease2() {
      const liquidity = this.NFTdata.liquidity.toString();
      const computedLiq = Math.floor(parseInt(liquidity) * (this.value / 100));
      console.log('Decreasing liquidity with:', computedLiq.toString());

      await decreaseLiquidity(
        this.tokenID,
        computedLiq.toString(),
        0,
        0,
        Math.floor(Date.now() / 1000) + 60 * 10,
        { gasLimit: 500000 },
      );
      e;
    },
  },
};
</script>

<template>
  <div class="nft-page">
    <h2>NFT Info</h2>
    <p><strong>Name:</strong> {{ NFT.name }}</p>
    <!-- <p><strong>Description:</strong> {{ NFT.description }}</p> -->
    <img v-if="nftImage" :src="nftImage" :alt="NFT.name" style="max-width: 300px" />

    <div style="margin-top: 20px">
      <label for="input1">Input 1:</label>
      <input id="input1" v-model="inputIncrease1" type="text" @input="inputIncreaseA" />
    </div>
    <div>
      <label for="input2">Input 2:</label>
      <input id="input2" v-model="inputIncrease2" type="text" @input="inputIncreaseB" />
    </div>
    <button @click="handleIncrease">Increase Liquidity</button>

    <!-- <div style="margin-top: 20px">
      <label for="input1">Input 1:</label>
      <input id="input1" v-model="inputDecrease1" type="text" @input="inputDecreaseA" />
    </div>
    <div>
      <label for="input2">Input 2:</label>
      <input id="input2" v-model="inputDecrease2" type="text" @input="inputDecreaseB" />
    </div> -->
    <div>
      <label for="percentage">Enter a value (0-100):</label>
    </div>
    <input
      id="percentage"
      type="number"
      v-model.number="value"
      @input="validate"
      min="0"
      max="100"
    />
    <p>{{ value }}%</p>

    <button @click="handleDecrease2">Decrease Liquidity</button>

    <div class="data-fields" v-if="NFTdata">
      <p>TokenID: {{ tokenID }}</p>
      <p>Address0: {{ NFTdata[2] }}</p>
      <p>Address1: {{ NFTdata[3] }}</p>
      <p>Fee: {{ NFTdata[4] }}</p>
      <p>data: {{ NFTdata[token0] }}</p>
      <p>data: {{ NFTdata }}</p>
    </div>
  </div>
</template>

<style scoped>
.nft-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
.data-fields {
  margin-top: 20px;
}
button {
  background-color: #4f46e5;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 12px;
}
button:hover {
  background-color: #3730a3;
}
</style>
