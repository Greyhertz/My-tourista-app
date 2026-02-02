import { Context, Next } from "hono";

interface RateLimitStore {
[key: string] : {
    count: number;
    resetTime:number;
}
}

const store: RateLimitStore = {};

export const rateLimiter = (options: {
    windowMs: number;
    maxRequests: number;
}) => {
    return  async (c: Context, next: Next) => {
        const ip = c.req.header('x-forwarded-for') || 'unknown';
        const key = `${ip}`;
        const now = Date.now();

        // clear old entries
        if (store[key] && store[key].resetTime <= now) {
            delete store[key];
        }

         // initialize or increment
        if (!store[key]) {
            store[key] = {
                count: 1,
                resetTime: now + options.windowMs
            }
        } else {
        store[key]. count++
    }

    //check Limit 
    if(store[key].count > options.maxRequests) {
        const resetIn = Math.ceil((store[key].resetTime - now) / 1000);
        return c.json({
            error: 'Too many requests',
            message: `Rate limit exceeded. Try again in ${resetIn} seconds.`, 
         }, 429)
    } 
// Ad headers
c.header('X-RateLimit-Limit', options.maxRequests.toString());
c.header('X-RateLimit-Remaining', (options.maxRequests - store[key].count).toString());
c.header('X-RateLimit-Reset', store[key].resetTime.toString());

await next();
} 
}