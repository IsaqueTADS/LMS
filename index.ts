import { Core } from "./core/core.ts";

import { bodyJson } from "./core/middleware/body-json.ts";
import { logger } from "./core/middleware/logger.ts";
import { ProductsApi } from "./api/products/index.ts";
import { RouteError } from "./core/utils/route-error.ts";

const core = new Core();

core.router.use([logger]);

new ProductsApi(core).init();

core.router.get(
  "/",
  (req, res) => {
    res.status(200).json({ hello: "Hellow", world: "World" });
  },
  [],
);

core.init();
