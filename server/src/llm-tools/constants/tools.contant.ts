export const tools = [
    {
        "name": "get_current_time",
        "toolDefinition": {
            "type": "function",
            "function": {
                "name": "get_current_time",
                "description": "Get the current time in a given location",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "The city name, e.g. San Francisco",
                        },
                    },
                    "required": ["location"],
                },
            }
        },
        "functionDefinition": function (location: any) {
            return new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
        }
    }
]