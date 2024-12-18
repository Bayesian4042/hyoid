const fs = require("fs");

function snakeToCamel(str) {
	return str.replace(/([-_][a-z])/g, (group) =>
		group.toUpperCase().replace("-", "").replace("_", ""),
	);
}

function addMapAttributes(content) {
	const lines = content.split("\n");
	const updatedLines = lines.map((line) => {
		// Skip if @@map or @map already exists
		if (line.includes("@map(") || line.includes("@@map(")) return line;

		// Match field definition
		const match = line.match(/^\s*(\w+)\s+(\w+)(.*)$/);
		if (match) {
			const [, fieldName, fieldType, rest] = match;
			const camelCase = snakeToCamel(fieldName);
			if (fieldName !== camelCase) {
				return `  ${camelCase}  ${fieldType} ${rest} @map("${fieldName}")`;
			}
		}

		// Handle model names
		// if (line.trim().startsWith('model')) {
		//   const modelName = line.split(' ')[1];
		//   const camelCaseModelName = snakeToCamel(modelName);
		//   if (modelName !== camelCaseModelName) {
		//     return `model ${camelCaseModelName} {\n  @@map("${modelName}")`;
		//   }
		// }

		return line;
	});

	// Add @@map for models if not present
	let inModel = false;
	let currentModel = "";
	const finalLines = updatedLines.map((line) => {
		if (line.startsWith("model ")) {
			inModel = true;
			currentModel = line.split(" ")[1].replace("{", "").trim();
		} else if (line.trim() === "}" && inModel) {
			inModel = false;
			if (
				!updatedLines.some((l) =>
					l.includes(`@@map("${snakeToCamel(currentModel)}")`),
				)
			) {
				return `  @@map("${currentModel}")\n}`;
			}
		}
		return line;
	});

	return finalLines.join("\n");
}

const schemaPath = "./prisma/schema.prisma";
const schemaContent = fs.readFileSync(schemaPath, "utf8");
const updatedContent = addMapAttributes(schemaContent);
fs.writeFileSync(schemaPath, updatedContent);

console.log("Schema updated with @map attributes");
