const ALLOWED_ORIGIN = "https://wairimuevans.github.io";

export default {
    async fetch(request, env) {
        const origin = request.headers.get("Origin");

        const corsHeaders = {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Vary": "Origin"
        };

        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: corsHeaders
            });
        }

        if (request.method !== "GET") {
            return Response.json(
                { message: "Method not allowed" },
                { status: 405, headers: corsHeaders }
            );
        }

        if (origin && origin !== ALLOWED_ORIGIN) {
            return Response.json(
                { message: "Origin not allowed" },
                { status: 403, headers: corsHeaders }
            );
        }

        const url = new URL(request.url);
        const city = url.searchParams.get("city");

        if (!city || !city.trim()) {
            return Response.json(
                { message: "A city name is required." },
                { status: 400, headers: corsHeaders }
            );
        }

        const weatherUrl = new URL(
            "https://api.openweathermap.org/data/2.5/weather"
        );

        weatherUrl.searchParams.set("q", city);
        weatherUrl.searchParams.set("appid", env.OPENWEATHER_API_KEY);
        weatherUrl.searchParams.set("units", "metric");

        try {
            const response = await fetch(weatherUrl);

            const data = await response.json();

            return Response.json(data, {
                status: response.status,
                headers: corsHeaders
            });

        } catch {
            return Response.json(
                { message: "Weather service unavailable." },
                { status: 500, headers: corsHeaders }
            );
        }
    }
};
