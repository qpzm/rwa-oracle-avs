# RWA Price Oracle AVS

## Description
This is a price oracle for [RWAsync swap](https://github.com/qpzm/rwa-async-swap) powered by Eignelayer.
It fetches Korean housing bond price from `https://apis.data.go.kr/1160100/service/GetBondSecuritiesInfoService/getBondPriceInfo`.

## Getting Started
```shell
npm install
npm run build

cd contracts
forge script script/DeployEigenLayerCore.s.sol --rpc-url "https://opt-sepolia.g.alchemy.com/v2/$ALCHEMY_KEY" --broadcast --private-key $PRIVATE_KEY
forge script script/RwaPriceDeployer.s.sol --rpc-url "https://opt-sepolia.g.alchemy.com/v2/$ALCHEMY_KEY" --broadcast --private-key $PRIVATE_KEY
```

```shell
# In one terminal, create update requests
npm run start:traffic

# In another terminal, an operator responds to the request and update the onchain price oracle
npm run start:operator
```
