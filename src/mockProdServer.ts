import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import index from "../mock";

export const mockModules = [...index];

export function setupProdMockServer() {
    createProdMockServer(mockModules);
}

