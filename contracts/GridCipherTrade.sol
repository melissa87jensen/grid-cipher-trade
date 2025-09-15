// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract GridCipherTrade is SepoliaConfig {
    using FHE for *;
    
    struct TradingPosition {
        euint32 positionId;
        euint32 amount;
        euint32 price;
        euint32 gridLevel;
        bool isActive;
        bool isLong;
        address trader;
        uint256 timestamp;
    }
    
    struct GridStrategy {
        euint32 strategyId;
        euint32 basePrice;
        euint32 gridSpacing;
        euint32 gridCount;
        euint32 totalInvested;
        euint32 totalProfit;
        bool isActive;
        address owner;
        uint256 createdAt;
    }
    
    struct TradeExecution {
        euint32 executionId;
        euint32 positionId;
        euint32 executedPrice;
        euint32 executedAmount;
        bool isBuy;
        address trader;
        uint256 timestamp;
    }
    
    mapping(uint256 => TradingPosition) public positions;
    mapping(uint256 => GridStrategy) public strategies;
    mapping(uint256 => TradeExecution) public executions;
    mapping(address => euint32) public traderBalance;
    mapping(address => euint32) public traderProfit;
    mapping(address => euint32) public traderVolume;
    
    uint256 public positionCounter;
    uint256 public strategyCounter;
    uint256 public executionCounter;
    
    address public owner;
    address public feeCollector;
    euint32 public tradingFeeRate; // Encrypted fee rate
    
    event PositionCreated(uint256 indexed positionId, address indexed trader, uint32 gridLevel);
    event PositionClosed(uint256 indexed positionId, address indexed trader, uint32 profit);
    event StrategyCreated(uint256 indexed strategyId, address indexed owner, uint32 basePrice);
    event TradeExecuted(uint256 indexed executionId, uint256 indexed positionId, address indexed trader);
    event BalanceUpdated(address indexed trader, uint32 newBalance);
    event ProfitUpdated(address indexed trader, uint32 totalProfit);
    
    constructor(address _feeCollector) {
        owner = msg.sender;
        feeCollector = _feeCollector;
        tradingFeeRate = FHE.asEuint32(25); // 0.25% fee rate (25 basis points)
    }
    
    function createGridStrategy(
        externalEuint32 _basePrice,
        externalEuint32 _gridSpacing,
        externalEuint32 _gridCount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(_gridCount.value > 0, "Grid count must be positive");
        
        uint256 strategyId = strategyCounter++;
        
        // Convert external encrypted values to internal
        euint32 basePrice = FHE.fromExternal(_basePrice, inputProof);
        euint32 gridSpacing = FHE.fromExternal(_gridSpacing, inputProof);
        euint32 gridCount = FHE.fromExternal(_gridCount, inputProof);
        
        strategies[strategyId] = GridStrategy({
            strategyId: FHE.asEuint32(0), // Will be set properly later
            basePrice: basePrice,
            gridSpacing: gridSpacing,
            gridCount: gridCount,
            totalInvested: FHE.asEuint32(0),
            totalProfit: FHE.asEuint32(0),
            isActive: true,
            owner: msg.sender,
            createdAt: block.timestamp
        });
        
        emit StrategyCreated(strategyId, msg.sender, 0); // Price will be decrypted off-chain
        return strategyId;
    }
    
    function createPosition(
        uint256 strategyId,
        externalEuint32 amount,
        externalEuint32 price,
        externalEuint32 gridLevel,
        bool isLong,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(strategies[strategyId].owner != address(0), "Strategy does not exist");
        require(strategies[strategyId].isActive, "Strategy is not active");
        
        uint256 positionId = positionCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalPrice = FHE.fromExternal(price, inputProof);
        euint32 internalGridLevel = FHE.fromExternal(gridLevel, inputProof);
        
        positions[positionId] = TradingPosition({
            positionId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            price: internalPrice,
            gridLevel: internalGridLevel,
            isActive: true,
            isLong: isLong,
            trader: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update strategy total invested
        strategies[strategyId].totalInvested = FHE.add(
            strategies[strategyId].totalInvested,
            FHE.mul(internalAmount, internalPrice)
        );
        
        emit PositionCreated(positionId, msg.sender, 0); // Grid level will be decrypted off-chain
        return positionId;
    }
    
    function executeTrade(
        uint256 positionId,
        externalEuint32 executedPrice,
        externalEuint32 executedAmount,
        bool isBuy,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(positions[positionId].trader != address(0), "Position does not exist");
        require(positions[positionId].isActive, "Position is not active");
        
        uint256 executionId = executionCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalExecutedPrice = FHE.fromExternal(executedPrice, inputProof);
        euint32 internalExecutedAmount = FHE.fromExternal(executedAmount, inputProof);
        
        executions[executionId] = TradeExecution({
            executionId: FHE.asEuint32(0), // Will be set properly later
            positionId: FHE.asEuint32(positionId),
            executedPrice: internalExecutedPrice,
            executedAmount: internalExecutedAmount,
            isBuy: isBuy,
            trader: msg.sender,
            timestamp: block.timestamp
        });
        
        // Calculate profit/loss (encrypted)
        euint32 tradeValue = FHE.mul(internalExecutedAmount, internalExecutedPrice);
        euint32 originalValue = FHE.mul(positions[positionId].amount, positions[positionId].price);
        
        euint32 profit;
        if (isBuy) {
            // For buy orders, profit is negative (cost)
            profit = FHE.sub(FHE.asEuint32(0), tradeValue);
        } else {
            // For sell orders, profit is positive (revenue)
            profit = FHE.sub(tradeValue, originalValue);
        }
        
        // Update trader profit (encrypted)
        traderProfit[msg.sender] = FHE.add(traderProfit[msg.sender], profit);
        
        // Update trader volume (encrypted)
        traderVolume[msg.sender] = FHE.add(traderVolume[msg.sender], tradeValue);
        
        emit TradeExecuted(executionId, positionId, msg.sender);
        emit ProfitUpdated(msg.sender, 0); // Profit will be decrypted off-chain
        return executionId;
    }
    
    function closePosition(uint256 positionId) public {
        require(positions[positionId].trader == msg.sender, "Only position owner can close");
        require(positions[positionId].isActive, "Position is not active");
        
        positions[positionId].isActive = false;
        
        emit PositionClosed(positionId, msg.sender, 0); // Profit will be decrypted off-chain
    }
    
    function updateBalance(address trader, euint32 newBalance) public {
        require(msg.sender == owner, "Only owner can update balance");
        require(trader != address(0), "Invalid trader address");
        
        traderBalance[trader] = newBalance;
        emit BalanceUpdated(trader, 0); // Balance will be decrypted off-chain
    }
    
    function getPositionInfo(uint256 positionId) public view returns (
        uint8 amount,
        uint8 price,
        uint8 gridLevel,
        bool isActive,
        bool isLong,
        address trader,
        uint256 timestamp
    ) {
        TradingPosition storage position = positions[positionId];
        return (
            0, // FHE.decrypt(position.amount) - will be decrypted off-chain
            0, // FHE.decrypt(position.price) - will be decrypted off-chain
            0, // FHE.decrypt(position.gridLevel) - will be decrypted off-chain
            position.isActive,
            position.isLong,
            position.trader,
            position.timestamp
        );
    }
    
    function getStrategyInfo(uint256 strategyId) public view returns (
        uint8 basePrice,
        uint8 gridSpacing,
        uint8 gridCount,
        uint8 totalInvested,
        uint8 totalProfit,
        bool isActive,
        address owner,
        uint256 createdAt
    ) {
        GridStrategy storage strategy = strategies[strategyId];
        return (
            0, // FHE.decrypt(strategy.basePrice) - will be decrypted off-chain
            0, // FHE.decrypt(strategy.gridSpacing) - will be decrypted off-chain
            0, // FHE.decrypt(strategy.gridCount) - will be decrypted off-chain
            0, // FHE.decrypt(strategy.totalInvested) - will be decrypted off-chain
            0, // FHE.decrypt(strategy.totalProfit) - will be decrypted off-chain
            strategy.isActive,
            strategy.owner,
            strategy.createdAt
        );
    }
    
    function getTraderStats(address trader) public view returns (
        uint8 balance,
        uint8 profit,
        uint8 volume
    ) {
        return (
            0, // FHE.decrypt(traderBalance[trader]) - will be decrypted off-chain
            0, // FHE.decrypt(traderProfit[trader]) - will be decrypted off-chain
            0  // FHE.decrypt(traderVolume[trader]) - will be decrypted off-chain
        );
    }
    
    function getExecutionInfo(uint256 executionId) public view returns (
        uint8 executedPrice,
        uint8 executedAmount,
        bool isBuy,
        address trader,
        uint256 timestamp
    ) {
        TradeExecution storage execution = executions[executionId];
        return (
            0, // FHE.decrypt(execution.executedPrice) - will be decrypted off-chain
            0, // FHE.decrypt(execution.executedAmount) - will be decrypted off-chain
            execution.isBuy,
            execution.trader,
            execution.timestamp
        );
    }
    
    // Emergency functions
    function pauseTrading() public {
        require(msg.sender == owner, "Only owner can pause trading");
        // Implementation for pausing trading
    }
    
    function setFeeCollector(address _feeCollector) public {
        require(msg.sender == owner, "Only owner can set fee collector");
        feeCollector = _feeCollector;
    }
    
    function withdrawFees() public {
        require(msg.sender == feeCollector, "Only fee collector can withdraw");
        // Implementation for fee withdrawal
    }
}
