export function validTtlFile(timestamp: number, ttl: number): boolean {
    return (Date.now() - timestamp) < ttl;
}
