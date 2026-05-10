# automate the generation of API

The plan for **OpenAPI/Swagger** documentation, as per the `Route-Controller.md` guidelines,
is to automate the generation of API specifications directly from your existing `Zod` schemas.

## Implementation Strategy

1. **Utility Selection**:
   Since you are already using `zod-to-openapi` (based on `package.json`),
   we will leverage it to generate the OpenAPI definition.

2. **Definition Generation**:
   Create a dedicated script (or update an existing one)
   to traverse your `src/schemas/*.schema.ts` files,
   convert them to OpenAPI components,
   and map them to the corresponding routes.

3. **Swagger UI Integration**:
   Use `swagger-ui-express` to serve the generated JSON/YAML definition
   at a dedicated endpoint (e.g., `/api/docs`).

4. **Consistency**: Ensure every new route we added has corresponding schema-based metadata.

## Next Steps for Documentation

- **Step 1**: Create a `src/lib/swagger.ts` file to generate the OpenAPI document.

- **Step 2**: Create `src/routes/docs.route.ts` to serve the Swagger UI.

- **Step 3**: Register the `/api/docs` route in `app.ts`.

Since we have finished the logic implementation,
this is the final piece of the architectural contract.
Shall I start implementing the Swagger documentation?
