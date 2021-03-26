import configurationFromString from "./configurationFromString";

describe("Grid editor configurationFromString", () => {
    it("parses valid data", () => {
        const json = JSON.stringify([{
            caption: "Some caption",
            width: 4,
        }, {
            width: 5,
        }, {
            caption: "Some other caption",
            width: 3,
        }]);

        const parsed = configurationFromString(json, 12);
        if (Array.isArray(parsed)) {
            expect(parsed.length).toBe(3);

            expect(parsed[0].caption).toBe("Some caption");
            expect(parsed[0].width).toBe(4);

            expect(parsed[1].caption).toBe("");
            expect(parsed[1].width).toBe(5);

            expect(parsed[2].caption).toBe("Some other caption");
            expect(parsed[2].width).toBe(3);
        } else {
            fail("Did not receive an array");
        }
    });

    describe("validation errors for", () => {
        it("invalid JSON", () => {
            expect(configurationFromString("xxxx", 12))
                .toBe("Error: JSON parsing error");
        });

        it("JSON that is not an array", () => {
            expect(configurationFromString("{}", 12))
                .toBe("Error: Provided JSON is not an array");
        });

        it("JSON array contains non objects", () => {
            expect(configurationFromString("[123]", 12))
                .toBe("Error: Encountered a non object entry in list of configurations");
        });

        it("incorrect caption type", () => {
            const json = JSON.stringify([{
                caption: true,
                width: 1,
            }]);

            expect(configurationFromString(json, 12))
                .toBe("Error: A name value is not a string");
        });

        it("incorrect width type", () => {
            const json = JSON.stringify([{
                caption: "Hello",
                width: "xxx",
            }]);

            expect(configurationFromString(json, 12))
                .toBe("Error: A width value is not a number");
        });

        it("required width exceeded", () => {
            const json = JSON.stringify([
                { width: 6 }, { width: 6 }, { width: 1 },
            ]);

            expect(configurationFromString(json, 12))
                .toBe("Error: Loaded columns have a total width of 13. Expected exactly: 12");
        });

        it("required width not reached", () => {
            const json = JSON.stringify([
                { width: 6 }, { width: 5 },
            ]);

            expect(configurationFromString(json, 12))
                .toBe("Error: Loaded columns have a total width of 11. Expected exactly: 12");
        });
    });
});
