/**
 * Beacon Agent Discovery Skill
 * =============================
 * Integrates with the Beacon protocol (https://github.com/Scottcjn/beacon-skill)
 * to let AI agents discover and communicate with each other.
 *
 * Beacon is an open agent-to-agent (A2A) coordination protocol — it handles
 * agent identity, discovery, and messaging across 13+ platforms.
 *
 * This skill adds read-only discovery tools so agents using Ergo-MCP can
 * find other agents in the ecosystem (no crypto dependencies required).
 *
 * Configuration:
 *   Set BEACON_ATLAS_URL env var to point to any Beacon relay.
 *   Default: https://rustchain.org/beacon
 */

import axios from 'axios';

const BEACON_ATLAS_URL = process.env.BEACON_ATLAS_URL || "https://rustchain.org/beacon";

// ── Zod-compatible JSON Schemas ─────────────────────────────────────

export const BeaconDiscoverSchema = {
    type: "object",
    properties: {
        capability: {
            type: "string",
            description: "Filter agents by capability (e.g., 'coding', 'ergo', 'blockchain', 'analysis'). Leave empty for all."
        },
        provider: {
            type: "string",
            description: "Filter by AI provider (e.g., 'anthropic', 'openai', 'google', 'xai', 'elyan'). Leave empty for all."
        },
        limit: {
            type: "integer",
            description: "Maximum number of agents to return (default 20).",
            default: 20
        }
    }
};

export const BeaconRelayInfoSchema = {
    type: "object",
    properties: {},
    required: []
};

// ── Skill Implementations ───────────────────────────────────────────

/**
 * Discover agents registered on the Beacon Atlas network.
 * Optionally filter by capability or AI provider.
 */
export async function discoverBeaconAgents(args: any) {
    const { capability, provider, limit = 20 } = args || {};

    try {
        const response = await axios.get(`${BEACON_ATLAS_URL}/relay/agents`, {
            timeout: 10000,
            headers: { 'User-Agent': 'Ergo-MCP-Server' }
        });

        let agents = response.data?.agents || response.data || [];

        // Normalize to array
        if (!Array.isArray(agents)) {
            agents = Object.values(agents);
        }

        // Apply filters
        if (capability) {
            agents = agents.filter((a: any) =>
                a.capabilities?.some((c: string) =>
                    c.toLowerCase().includes(capability.toLowerCase())
                )
            );
        }
        if (provider) {
            agents = agents.filter((a: any) =>
                a.provider?.toLowerCase() === provider.toLowerCase()
            );
        }

        // Limit results
        agents = agents.slice(0, limit);

        return {
            status: "success",
            atlas_url: BEACON_ATLAS_URL,
            agent_count: agents.length,
            agents: agents.map((a: any) => ({
                agent_id: a.agent_id,
                name: a.name,
                provider: a.provider,
                model_id: a.model_id,
                capabilities: a.capabilities,
                status: a.status,
                last_heartbeat: a.last_heartbeat
            }))
        };
    } catch (error: any) {
        return {
            status: "error",
            message: `Could not reach Beacon Atlas: ${error.message}`,
            hint: "Set BEACON_ATLAS_URL env var to use a different relay, or install beacon-skill (pip install beacon-skill) for full A2A features."
        };
    }
}

/**
 * Get Beacon relay network statistics — total agents, active count,
 * provider breakdown, and uptime info.
 */
export async function getBeaconRelayInfo() {
    try {
        const response = await axios.get(`${BEACON_ATLAS_URL}/relay/stats`, {
            timeout: 10000,
            headers: { 'User-Agent': 'Ergo-MCP-Server' }
        });
        return {
            status: "success",
            atlas_url: BEACON_ATLAS_URL,
            ...response.data
        };
    } catch (error: any) {
        return {
            status: "error",
            message: `Could not reach Beacon relay: ${error.message}`,
            hint: "The relay endpoint may be temporarily unavailable. Set BEACON_ATLAS_URL to configure."
        };
    }
}
