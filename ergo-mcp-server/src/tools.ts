import axios from 'axios';

const EXPLORER_API = 'https://api.ergoplatform.com/api/v1';

export async function getAddressBalance(address: string) {
    try {
        const response = await axios.get(`${EXPLORER_API}/addresses/${address}/balance/total`);
        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to fetch balance for address ${address}: ${error.message}`);
    }
}

export async function getTransactionDetails(txId: string) {
    try {
        const response = await axios.get(`${EXPLORER_API}/transactions/${txId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to fetch transaction ${txId}: ${error.message}`);
    }
}

export async function getBlockHeader(identifier: string) {
    try {
        const isHash = /^[0-9a-fA-F]{64}$/.test(identifier);

        if (isHash) {
            const response = await axios.get(`${EXPLORER_API}/blocks/${identifier}`);
            if (!response.data.block || !response.data.block.header) {
                // Fallback if structure is different
                if (response.data.header) return response.data.header;
                throw new Error("Invalid block structure received from Explorer");
            }
            return response.data.block.header;
        } else {
            // Search by height
            const height = parseInt(identifier);
            if (isNaN(height)) {
                throw new Error("Invalid block identifier. Must be a hash or a height number.");
            }
            const response = await axios.get(`${EXPLORER_API}/blocks?minHeight=${height}&maxHeight=${height}`);
            if (response.data.items && response.data.items.length > 0) {
                const block = response.data.items.find((b: any) => b.height === height);
                if (block) {
                    return block;
                }
            }
            throw new Error(`Block not found at height ${identifier}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch block ${identifier}: ${error.message}`);
    }
}

export async function searchTokens(query: string) {
    try {
        const response = await axios.get(`${EXPLORER_API}/tokens/search?query=${query}`);
        return { items: response.data.items || [] };
    } catch (error: any) {
        throw new Error(`Failed to search tokens: ${error.message}`);
    }
}

export async function getErgoPrice() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ergo&vs_currencies=usd,eur');
        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to fetch Ergo price: ${error.message}`);
    }
}

// ── New Explorer Tools ──────────────────────────────────────────────

/**
 * Get transaction history for an Ergo address.
 * Essential for wallets, dashboards, and audit trails.
 */
export async function getAddressTransactions(address: string, offset: number = 0, limit: number = 10) {
    try {
        const response = await axios.get(
            `${EXPLORER_API}/addresses/${address}/transactions?offset=${offset}&limit=${limit}`
        );
        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to fetch transactions for ${address}: ${error.message}`);
    }
}

/**
 * Get unspent boxes (UTXOs) for an Ergo address.
 * Critical for building transactions — Ergo uses the UTXO model,
 * so knowing available boxes is the first step in any TX construction.
 */
export async function getUnspentBoxes(address: string, offset: number = 0, limit: number = 30) {
    try {
        const response = await axios.get(
            `${EXPLORER_API}/boxes/unspent/byAddress/${address}?offset=${offset}&limit=${limit}`
        );
        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to fetch unspent boxes for ${address}: ${error.message}`);
    }
}

/**
 * Get current Ergo network state — chain height, latest block info,
 * difficulty, and miner reward. Useful for dashboards and monitoring.
 */
export async function getNetworkState() {
    try {
        const blocksRes = await axios.get(
            `${EXPLORER_API}/blocks?limit=1&sortBy=height&sortDirection=desc`
        );
        const latestBlock = blocksRes.data.items?.[0];

        return {
            currentHeight: latestBlock?.height,
            latestBlockId: latestBlock?.id,
            difficulty: latestBlock?.difficulty,
            timestamp: latestBlock?.timestamp,
            minerReward: latestBlock?.minerReward,
            blockSize: latestBlock?.size,
            transactionCount: latestBlock?.txsCount,
        };
    } catch (error: any) {
        throw new Error(`Failed to fetch network state: ${error.message}`);
    }
}
